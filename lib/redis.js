import { Client, Entity, Schema, Repository } from 'redis-om'

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class Video extends Entity { }
let videoSchema = new Schema(
    Video,
    {
        url: { type: 'string' },
        poster_id: { type: 'string' },
        postedAt: { type: 'date' }
    },
    {
        dataStructure: 'JSON'
    }
)
class Poster extends Entity { }
let posterSchema = new Schema(
    Poster,
    {
        poster_id: { type: 'string' },
        viewers: { type: 'string[]' },
        viewing: { type: 'string[]' }
    },
    {
        dataStructure: 'JSON'
    }
)

connect()
const videoRepository = client.fetchRepository(videoSchema)
const posterRepository = client.fetchRepository(posterSchema)
function createIndexes() {
    const idx = videoRepository.createIndex()
    const idx2 = posterRepository.createIndex()
}
createIndexes()

export async function createVideo(data) {
    await connect()
    const video = videoRepository.createEntity(data)
    const id = await videoRepository.save(video)
    return id
}

export async function searchVideos(q) {
    await connect()

    const videos = await videoRepository.search()
        .where('poster_id').equals(q)
        .return.all()
    return videos
}

export async function addViewer(pid, vid) {
    await connect()

    const poster = await posterRepository.search()
        .where('poster_id').equals(pid)
        .return.first()
    if (poster) {
        poster.viewers = poster.viewers.push(vid)
        posterRepository.save(poster)
    } else {
        posterRepository.createAndSave({
            poster_id: pid,
            viewers: [vid],
            viewing: []
        })
    }
}

export async function addViewing(pid, vid) {
    await connect()

    const poster = await posterRepository.search()
        .where('poster_id').equals(pid)
        .return.first()
    if (poster) {
        poster.viewing = poster.viewing.push(vid)
        posterRepository.save(poster)
    } else {
        posterRepository.createAndSave({
            poster_id: pid,
            viewers: [],
            viewing: [vid]
        })
    }
}

export async function removeViewer(pid, vid) {
    await connect()

    const poster = await posterRepository.search()
        .where('poster_id').equals(pid)
        .return.first()
    if (poster) {
        poster.viewers = poster.viewers.filter(e => e !== vid)
        posterRepository.save(poster)
    }
}

export async function removeViewing(pid, vid) {
    await connect()

    const poster = await posterRepository.search()
        .where('poster_id').equals(pid)
        .return.first()
    if (poster) {
        poster.viewing = poster.viewing.filter(e => e !== vid)
        posterRepository.save(poster)
    }
}

export async function isViewing(pid, vid) {
    await connect()

    const watchCount = await posterRepository.search()
        .where('poster_id').equals(pid)
        .and('viewers').contains(vid)
        .return.count()

    return watchCount > 0
}