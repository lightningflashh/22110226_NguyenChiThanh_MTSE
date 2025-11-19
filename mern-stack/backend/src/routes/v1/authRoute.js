import express from 'express'
import { authController } from '~/controllers/authController.js'
import { authLimiter } from '~/middlewares/rateLimitMiddleware';


const router = express.Router()

router.post('/register', authController.createNew)
router.post('/login', authLimiter, authController.login)

export const authRoute = router