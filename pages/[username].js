import { useRouter } from "next/router";
import useSWR from "swr"
import List from "../components/List"


export default function UserPage() {
    const router = useRouter()
    const { username } = router.query

    const { data, isValidating, mutate } = useSWR('api/list', { body: username })

    return (
        <>
            <List
                data={data}
                dataLoading={isValidating}
            />
        </>
    )
}