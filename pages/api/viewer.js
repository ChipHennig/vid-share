import authenticate from "../../lib/authenticate"
import { addViewer, addViewing } from "../../lib/redis"

export default authenticate(async (req, res) => {
    try {
        const { pid, vid, isAdd } = req.body

        if (isAdd) {
            await addViewer(pid, vid)
            await addViewing(vid, pid)
        } else {
            await removeViewer(pid, vid)
            await removeViewing(vid, pid)
        }

        res.json({ pid, vid })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})