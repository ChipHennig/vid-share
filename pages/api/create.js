import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'
import { string } from 'yup'
import redis from '../../lib/redis'

export default withApiAuthRequired(async (req, res) => {
    try {
        const { user } = getSession(req, res)
        const { link } = req.body

        let regEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = link.match(regEx)[2]

        let errMessage = { message: "Not a valid YouTube link", excludeEmptyString: true }
        let schema = string().required()
            .min(
                11, errMessage
            )
            .max(
                11, errMessage
            )
        const isValid = await schema.isValid(match)

        if (!isValid) {
            throw new Error('Not a valid youtube link')
        }

        const { nickname, email, updated_at, ...userInfo } = user

        // const id = await createVideo({
        //     url: "https://www.youtube.com/embed/" + match,
        //     poster_id: nickname,
        //     postedAt: Date.now()
        // })
        const id = await redis.hset(
            "videos",
            {
                [nickname + ":" + Date.now()]:
                    "https://www.youtube.com/embed/" + match
            }
        )
        res.json({ id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})