import { useRef } from "react"
import { useAuth0 } from "@auth0/auth0-react"
import FormCreate from "../components/FormCreate"


export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()
  const inputNewVideo = useRef(null)


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
          alert(data.error)
        } else {
          inputNewVideo.current.value = ''
        }
      })
  })

  return (
    <>
      <FormCreate onSubmitNewVideo={onSubmitNewVideo}
        inputNewVideo={inputNewVideo}
      />
    </>
  )
}
