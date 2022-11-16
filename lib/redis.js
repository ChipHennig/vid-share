import { Redis } from "@upstash/redis"

export const databaseName = "test-blog"

const redis = Redis.fromEnv()

export default redis