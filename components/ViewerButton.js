export default function ViewerButton({ user, onViewershipChange, isViewer }) {
    const onSubmit = (e) => {
        e.preventDefault()
        onViewershipChange()
    }

    const viewButtonText = isViewer ? "You're a viewer" : "Become a viewer"

    return user ? (
        <form className="flex items-center space-x-4" onSubmit={onSubmit}>
            <button
                className="form-input"
            >{viewButtonText}</button>
        </form>
    ) : (
        <div
            className="flex flex-col items-center bg-zinc-100 px-3 py-6 rounded
    dark:bg-zinc-800"
        >
            <p>Please login to be a viewer</p>
        </div>
    )
}