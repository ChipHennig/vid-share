import { string } from 'yup'
import redis from '../../lib/redis'
import authenticate from '../../lib/authenticate'

export default authenticate(async (req, res) => {
    try {
        const { link } = req.body

        let schema = string().url().required()
        const isValid = await schema.isValid(link)

        if (!isValid) {
            throw new Error('Not a valid youtube link')
        }

        const { nickname, email, updated_at, ...user } = req.user


        await redis.hset(
            "videos",
            { [email + ":" + Date.now()]: link }
        )

        res.json({ body: 'success' })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})