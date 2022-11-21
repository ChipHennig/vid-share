import { Client, Entity, Schema, Repository } from 'redis-om'

const client = new Client();

async function connect() {
    if (!client.isOpen()) {
        await client.open(process.env.REDIS_URL)
    }
}

class Video extends Entity { }
let schema = new Schema(
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

export async function createVideo(data) {
    await connect()

    const repository = client.fetchRepository(schema)
    const video = repository.createEntity(data)
    const id = await repository.save(video)
    return id
}

export async function createIndex() {
    await connect()

    const repository = new Repository(schema, client)
    await repository.createIndex()
}

export async function searchVideos(q) {
    await connect()

    const repository = new Repository(schema, client)

    const videos = await repository.search()
        .where('poster_id').equals(q)
        .return.all()
    return videos
}