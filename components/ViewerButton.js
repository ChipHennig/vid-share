

export default function ViewerButton({ user, onViewershipChange, isViewer }) {
    const onSubmit = (e) => {
        e.preventDefault()
        onViewershipChange()
    }

    const viewButtonText = isViewer ? "You're a viewer" : "Become a viewer"

    return user ? (
        <form className="flex items-center space-x-4" onSubmit={onSubmit}>
            <img src={user.picture} alt={user.name} width={40} className="rounded" />
            <button
                className="form-input"
            >{viewButtonText}</button>
            {user && (
                <button className="button" type="button" href="/api/auth/logout">
                    Logout
                </button>
            )}
        </form>
    ) : (
        <div
            className="flex flex-col items-center bg-zinc-100 px-3 py-6 rounded
    dark:bg-zinc-800"
        >
            <p>Please login to be a viewer</p>
            <button
                className="button mt-4"
                type="button"
                href="/api/auth/login"
            >
                Login
            </button>
        </div>
    )
}