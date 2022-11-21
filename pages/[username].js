import List from "../components/List"
import { searchVideos } from "../lib/redis"

export default function UserPage({ data }) {

    return (
        <>
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
        props: { data }
    }
}