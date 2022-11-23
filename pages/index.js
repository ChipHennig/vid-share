import Link from "next/link";
import { useRef } from "react"
import { useUser, getSession } from "@auth0/nextjs-auth0";
import redis from "../lib/redis";
import FormCreate from "../components/FormCreate"
import List from "../components/List"


export default function Home({ data }) {
  const { user, error, isLoading } = useUser();
  const inputNewVideo = useRef(null)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

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

  return user ? (
    <>
      <FormCreate user={user}
        onSubmitNewVideo={onSubmitNewVideo}
        inputNewVideo={inputNewVideo}
      />
      <List
        data={data}
        isUser={true}
      />
    </>
  ) : (
    <div
      className="flex flex-col items-center bg-zinc-100 px-3 py-6 rounded
    dark:bg-zinc-800"
    >
      <p>Please login to submit a video</p>
      <Link href="/api/auth/login">
        <button
          className="button mt-4"
          type="button"
        >
          Login
        </button>
      </Link>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = getSession(context.req, context.res)
  let result = []
  if (session) {
    const viewingUsers = await redis.smembers("viewing:" + session.user.nickname)

    for (let j = 0; j < viewingUsers.length; j++) {
      const videos = await redis.hscan("videos", 0, { match: viewingUsers[j] + ":*" })
      for (let i = 1; i < videos[1].length; i += 2) {
        let link = videos[1][i]
        //   item['createdAt'] = data[i + 1]
        result.push(link)
      }
    }
  }

  const data = await JSON.parse(JSON.stringify(result))

  return {
    props: { data }
  }
}
