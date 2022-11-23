import Link from "next/link";

export default function FormCreate({ user, onSubmitNewVideo, inputNewVideo }) {
  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitNewVideo()
  }

  return (
    <form className="flex items-center space-x-4" onSubmit={onSubmit}>
      <img src={user.picture} alt={user.name} width={40} className="rounded" />
      <input
        className="form-input"
        type="text"
        ref={inputNewVideo}
        placeholder="Enter a YouTube link"
      />
      {user && (
        <Link href="/api/auth/logout">
          <button className="button" type="button" >
            Logout
          </button>
        </Link>
      )}
    </form>
  )
}