import mongoose from 'mongoose'
import { env } from '~/config/environment.js'

export const CONNECT_DB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI, {
            dbName: env.DATABASE_NAME,
            serverSelectionTimeoutMS: 10000
        })
        console.log(`Connected to MongoDB: ${env.DATABASE_NAME}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
    }
}

export const CLOSE_DB = async () => {
    await mongoose.connection.close()
    console.log('MongoDB connection closed')
}