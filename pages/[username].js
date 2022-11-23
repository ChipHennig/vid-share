import redis from "../lib/redis"
import { useState, useEffect } from "react"
import { useUser, getSession } from "@auth0/nextjs-auth0"
import List from "../components/List"
import ViewerButton from "../components/ViewerButton"
import { Container } from "@mantine/core"


export default function UserPage({ isUser, username, isViewer, data }) {
    const { user, error, isLoading } = useUser();
    const [viewerState, setViewer] = useState(isViewer)

    useEffect(() => {
        setViewer(isViewer)
    }, [isViewer])

    if (isLoading) return null
    if (error) return <div>{error.message}</div>

    const onViewershipChange = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                // authorization: token,
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
    }

    const button = () => {
        if (user && user.nickname !== username) {
            return <ViewerButton
                user={user}
                onViewershipChange={onViewershipChange}
                isViewer={viewerState} />
        } else {
            return <></>
        }
    }

    return (
        <Container>
            {button()}
            <div>{username}</div>
            <List
                isUser={isUser}
                data={data}
            />
        </Container>
    )
}

export async function getServerSideProps(context) {
    const username = context.params.username
    const videos = await redis.hscan("videos", 0, { match: username + ":*" })
    let result = []
    for (let i = 1; i < videos[1].length; i += 2) {
        let link = videos[1][i]
        //   item['createdAt'] = data[i + 1]
        result.push(link)
    }
    let isUser = true
    if (result.length === 0) {
        isUser = false
    }
    let data = JSON.parse(JSON.stringify(result))

    const session = getSession(context.req, context.res)
    let isViewer = false
    if (session) {
        isViewer = await redis.sismember("viewers:" + username, session.user.nickname)
        isViewer = Boolean(isViewer)
    }


    return {
        props: { isUser, username, isViewer, data }
    }
}