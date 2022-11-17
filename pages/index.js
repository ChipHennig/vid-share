import { useRef } from "react"
import useSWR from "swr"
import { useAuth0 } from "@auth0/auth0-react"
import FormCreate from "../components/FormCreate"
import List from "../components/List"


export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const inputNewVideo = useRef(null)

  const { data, isValidating, mutate } = useSWR('api/list', { body: "chip.hennig@gmail.com" })

  const getToken = (func) => {
    return async (props) => {
      if (!isAuthenticated) {
        toast.error('Please login')
        return false
      }

      const token = await getAccessTokenSilently()

      if (!token) {
        toast.error('User not found')
        return false
      }

      return func(token, props)
    }
  }

  const onSubmitNewVideo = getToken(async (token) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        link: inputNewVideo.current.value
      })
    }

    fetch('api/create', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          inputNewVideo.current.value = ''
          mutate()
        }
      })
  })

  return (
    <>
      <FormCreate onSubmitNewVideo={onSubmitNewVideo}
        inputNewVideo={inputNewVideo}
      />
      <List
        data={data}
        dataLoading={isValidating}
      />
    </>
  )
}
