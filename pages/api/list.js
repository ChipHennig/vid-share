import redis from '../../lib/redis'

export default async (req, res) => {
    try {
        const username = req.body

        const data = await redis.hscan("videos", 0, ["match " + username + ":*"])
        let result = []
        for (let i = 1; i < data[1].length; i += 2) {
            let link = data[1][i]
            //   item['createdAt'] = data[i + 1]
            result.push(link)
        }

        res.json(result)
    } catch (error) {
        res.status(400).json({ error })
    }
}