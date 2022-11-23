import { useRef } from "react"
import { useUser } from "@auth0/nextjs-auth0";
import FormCreate from "../components/FormCreate"


export default function Home() {
  const { user, error, isLoading } = useUser();
  const inputNewVideo = useRef(null)

  const onSubmitNewVideo = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        // authorization: token,
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
  }

  return (
    <>
      <FormCreate onSubmitNewVideo={onSubmitNewVideo}
        inputNewVideo={inputNewVideo}
      />
    </>
  )
}
