import { url } from 'yup'
import redis, { databaseName } from 'lib/redis'
import authenticate from 'lib/authenticate'

export default authenticate(async (req, res) => {
    try {
        const { link } = req.body

        let schema = url().required()
        const isValid = await schema.isValid(link)

        if (!isValid) {
            throw new Error('Not a valid youtube link')
        }

        const { nickname, email, updated_at, ...user} = req.user

        const VIDEO = {
            link,
            createdAt: Date.now(),
            user,
        }

        await redis.hset(
            databaseName,
            "videos",
            email+":"+Date.now(),
            link
        )

        res.json({body: 'success'})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
})