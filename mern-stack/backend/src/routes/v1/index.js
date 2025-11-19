import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { authRoute } from '~/routes/v1/authRoute'
import { userRoute } from '~/routes/v1/userRoute'
import { productRoute } from '~/routes/v1/productRoute'
import { apiLimiter } from '~/middlewares/rateLimitMiddleware'

const router = express.Router()

// Health check
router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({
        message: 'API v1 is running smoothly',
        timestamp: new Date().toISOString()
    })
})

// Auth routes
router.use('/auth', authRoute)
router.use('/users', apiLimiter, userRoute)
router.use('/products', apiLimiter, productRoute)

export const APIs_V1 = router
