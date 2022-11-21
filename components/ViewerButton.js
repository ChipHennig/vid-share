import { useAuth0 } from '@auth0/auth0-react'

export default function ViewerButton({ onViewershipChange, isViewer }) {
    const { user, isLoading, isAuthenticated, loginWithRedirect, logout } =
        useAuth0()

    const onSubmit = (e) => {
        e.preventDefault()
        onViewershipChange()
    }

    if (isLoading) return null

    const viewButtonText = isViewer ? "You're a viewer" : "Become a viewer"

    return isAuthenticated ? (
        <form className="flex items-center space-x-4" onSubmit={onSubmit}>
            <img src={user.picture} alt={user.name} width={40} className="rounded" />
            <button
                className="form-input"
            >{viewButtonText}</button>
            {isAuthenticated && (
                <button className="button" type="button" onClick={() => logout()}>
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
                onClick={() => loginWithRedirect()}
            >
                Login
            </button>
        </div>
    )
}