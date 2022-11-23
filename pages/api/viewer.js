import { withApiAuthRequired } from "@auth0/nextjs-auth0"
import redis from "../../lib/redis"

export default withApiAuthRequired(async (req, res) => {
    try {
        const { pid, vid } = req.body

        const isViewer = await redis.sismember("viewers:" + pid, vid)

        if (isViewer) {
            await redis.srem("viewers:" + pid, vid)
            await redis.srem("viewing:" + vid, pid)
        } else {
            await redis.sadd("viewers:" + pid, vid)
            await redis.sadd("viewing:" + vid, pid)
        }
        // const isRemove = isViewing(pid, vid)
        // redis.
        // if (!isRemove) {
        //     await addViewer(pid, vid)
        //     await addViewing(vid, pid)
        // } else {
        //     await removeViewer(pid, vid)
        //     await removeViewing(vid, pid)
        // }

        res.json(!isViewer)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})