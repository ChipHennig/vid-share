import authenticate from "../../lib/authenticate"
import { isViewer } from "../../lib/redis"

export default authenticate(async (req, res) => {
    try {
        const { pid, vid } = req.body

        const isView = isViewer(pid, vid)

        res.json(isView)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})