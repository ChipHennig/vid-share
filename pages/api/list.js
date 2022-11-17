import redis from '../../lib/redis'

export default async (req, res) => {
    try {
        const username = req.body

        const data = await redis.hscan("videos", 0, ["match " + username + ":*"])
        let result = []
        for (let i = 1; i < data.length; i += 2) {
            let link = data[i][1]
            //   item['createdAt'] = data[i + 1]
            result.push(link)
        }

        res.json(result)
    } catch (error) {
        res.status(400).json({ error })
    }
}