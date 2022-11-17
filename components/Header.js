import { useRouter } from "next/router"
import { useState } from "react"

export default function Header() {
    const router = useRouter()
    const [route, setRoute] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/' + route)
    }

    return (
        <form className="flex items-center space-x-4"
            onSubmit={handleSubmit}>
            <input
                className="form-input"
                type="text"
                placeholder="Enter a username"
                onChange={(e) => { setRoute(e.target.value) }}
            />
        </form>
    )
}