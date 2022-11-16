import { useAuth0 } from '@auth0/auth0-react'

export default function FormCreate({ onSubmitNewVideo, inputNewVideo }) {
  const { user, isLoading, isAuthenticated, loginWithRedirect, logout } =
    useAuth0()

  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitNewVideo()
  }

  if (isLoading) return null

  return isAuthenticated ? (
    <form className="flex items-center space-x-4" onSubmit={onSubmit}>
      <img src={user.picture} alt={user.name} width={40} className="rounded" />
      <input
        className="form-input"
        type="text"
        ref={inputNewVideo}
        placeholder="Enter a new feature request?"
      />
      {/*isAuthenticated && (
        <button className="button" type="button" onClick={() => logout()}>
          Logout
        </button>
      )*/}
    </form>
  ) : (
    <div
      className="flex flex-col items-center bg-zinc-100 px-3 py-6 rounded
    dark:bg-zinc-800"
    >
      <p>Please login to submit a video</p>
      <button
        className="button mt-4"
        type="button"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
    </div>
  )
}