import { string } from 'yup'
import { createVideo } from '../../lib/redis'
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

        const id = await createVideo({
            url: link,
            poster_id: nickname,
            postedAt: Date.now()
        })
        res.json({ id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})