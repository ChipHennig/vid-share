import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link";

export default function FormCreate({ onSubmitNewVideo, inputNewVideo }) {
  const { user, error, isLoading } = useUser();

  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitNewVideo()
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return user ? (
    <form className="flex items-center space-x-4" onSubmit={onSubmit}>
      <img src={user.picture} alt={user.name} width={40} className="rounded" />
      <input
        className="form-input"
        type="text"
        ref={inputNewVideo}
        placeholder="Enter a video embed url"
      />
      {user && (
        <Link href="/api/auth/logout">
          <button className="button" type="button" >
            Logout
          </button>
        </Link>
      )}
    </form>
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