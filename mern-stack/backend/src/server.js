import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import exitHook from 'async-exit-hook'

import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb.js'
import { env } from '~/config/environment.js'
import { APIs_V1 } from '~/routes/v1/index.js'
import { corsOptions } from '~/config/cors.js'

const START_SERVER = () => {
    const app = express()

    app.use(cookieParser())
    app.use(cors(corsOptions))
    app.use(express.json())

    app.use('/v1', APIs_V1)

    const port = env.BUILD_MODE === 'production' ? env.PORT : env.LOCAL_DEV_APP_PORT
    const host = env.LOCAL_DEV_APP_HOST

    app.listen(port, host, () => console.log(`Server running at ${host}:${port}`))

    exitHook(() => CLOSE_DB())
}

    ; (async () => {
        try {
            await CONNECT_DB()
            console.log('Database connected successfully')
            START_SERVER()
            console.log('Server started successfully')
        } catch (error) {
            console.error('Failed to connect to the database:', error)
            process.exit(1)
        }
    })()