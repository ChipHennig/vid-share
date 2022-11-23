import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { Header, Container, Group, createStyles } from "@mantine/core"

const useStyles = createStyles((theme) => ({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    }
}))

export default function AppHeader() {
    const { user, error, isLoading } = useUser();
    const router = useRouter()
    const [route, setRoute] = useState()
    const { classes, cx } = useStyles()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push('/' + route)
    }

    const loginButton = () => {
        if (user) {
            return (<>
                <img src={user.picture} alt={user.name} width={40} className="rounded" />
                <div>{user.nickname}</div>
                <Link href="/api/auth/logout">
                    <button className="button" type="button">
                        Logout
                    </button>
                </Link>

            </>)
        } else {
            return <Link href="/api/auth/login">
                <button
                    className="button mt-4"
                    type="button"
                >
                    Login
                </button>
            </Link>
        }
    }

    return (
        <Header>
            <Container className={classes.header}>
                <Link href="/">
                    <img src="vid-share.png" alt="Home"></img>
                </Link>
                <form className="flex items-center space-x-4"
                    onSubmit={handleSubmit}>

                    <input
                        className="form-input"
                        type="text"
                        placeholder="Enter a username"
                        onChange={(e) => { setRoute(e.target.value) }}
                    />
                </form>
                <Group>
                    {loginButton()}
                </Group>
            </Container>
        </Header>

    )
}