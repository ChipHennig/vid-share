import authenticate from "../../lib/authenticate"
import { addViewer, addViewing, isViewing, removeViewer, removeViewing } from "../../lib/redis"

export default authenticate(async (req, res) => {
    try {
        const { pid, vid } = req.body
        const isRemove = isViewing(pid, vid)
        if (!isRemove) {
            await addViewer(pid, vid)
            await addViewing(vid, pid)
        } else {
            await removeViewer(pid, vid)
            await removeViewing(vid, pid)
        }

        res.json(!isRemove)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})