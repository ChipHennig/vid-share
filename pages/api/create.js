import { string } from 'yup'
import { createVideo } from '../../lib/redis'
import authenticate from '../../lib/authenticate'

export default authenticate(async (req, res) => {
    try {
        const { link } = req.body
        let parsedLink = link.replace("watch?v=", "embed/")

        let schema = string().url().required().matches(
            /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
            { message: "Not a valid YouTube link", excludeEmptyString: true }
        )
        const isValid = await schema.isValid(parsedLink)

        if (!isValid) {
            throw new Error('Not a valid youtube link')
        }

        const { nickname, email, updated_at, ...user } = req.user

        const id = await createVideo({
            url: parsedLink,
            poster_id: nickname,
            postedAt: Date.now()
        })
        res.json({ id })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})