import redis, { databaseName } from 'lib/redis'

export default async (req, res) => {
    try {
        const { email } = req.body

        const data = await redis.hscan(databaseName, "videos", 0, "match " + email + ":*")

        let result = []
        for (let i = 0; i < data.length - 1; i += 2) {
            let link = data[i]
            //   item['createdAt'] = data[i + 1]
            result.push(link)
        }

        res.json(result)
    } catch (error) {
        res.status(400).json({ error })
    }
}