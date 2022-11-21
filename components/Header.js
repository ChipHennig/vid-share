import Link from "next/link"
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
            <Link href="/">
                <img src="vid-share.png" alt="Home"></img>
            </Link>
            <input
                className="form-input"
                type="text"
                placeholder="Enter a username"
                onChange={(e) => { setRoute(e.target.value) }}
            />
        </form>
    )
}