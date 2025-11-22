import { createClient } from 'redis'
import { env } from './environment.js'

const client = createClient({
  url: env.REDIS_URL
})

client.on('error', err => console.log('Redis Client Error', err))

export async function connectRedis() {
  if (!client.isOpen) {
    await client.connect()
  }
}

export default client

