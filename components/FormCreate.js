export default function FormCreate({ onSubmitNewVideo, inputNewVideo }) {
  const onSubmit = (e) => {
    e.preventDefault()
    onSubmitNewVideo()
  }

  return (
    <form className="flex items-center space-x-4" onSubmit={onSubmit}>
      <input
        className="form-input"
        type="text"
        ref={inputNewVideo}
        placeholder="Enter a YouTube link"
      />
    </form>
  )
}