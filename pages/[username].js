import { searchVideos } from "../lib/redis"
import { useAuth0 } from "@auth0/auth0-react"
import List from "../components/List"
import ViewerButton from "../components/ViewerButton"
import { useState, useEffect } from "react"

export default function UserPage({ username, data }) {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
    const [isViewer, setViewer] = useState(false)

    useEffect(() => {
        getToken(async (token) => {
            const requestOptions = {
                method: 'POST',
                headers: {
                    authorization: token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pid: username,
                    vid: user.nickname,
                })
            }

            fetch('api/isview', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.error) {
                        alert(data.error)
                    } else {
                        setViewer(data)
                    }
                })
        })
    }, [])

    const getToken = (func) => {
        return async (props) => {
            if (!isAuthenticated) {
                toast.error('Please login')
                return false
            }

            const token = await getAccessTokenSilently()

            if (!token) {
                toast.error('User not found')
                return false
            }

            return func(token, props)
        }
    }

    const onViewershipChange = getToken(async (token) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pid: username,
                vid: user.nickname,
            })
        }

        fetch('api/viewer', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    alert(data.error)
                } else {
                    setViewer(data)
                }
            })
    })

    const button = () => {
        if (isAuthenticated && user.nickname !== username) {
            return <ViewerButton onViewershipChange={onViewershipChange}
                isViewer={isViewer} />
        } else {
            return <></>
        }
    }

    return (
        <>
            {button()}
            <div>{username}</div>
            <List
                data={data}
            />
        </>
    )
}

export async function getServerSideProps(context) {
    const username = context.params.username
    const videos = await searchVideos(username)
    let data = JSON.parse(JSON.stringify(videos))

    return {
        props: { username, data }
    }
}