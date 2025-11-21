import express from 'express'
import { authController } from '~/controllers/authController.js'
import { authLimiter } from '~/middlewares/rateLimitMiddleware';


const router = express.Router()

router.post('/register', authController.createNew)
router.post('/login', authLimiter, authController.login)
router.delete('/logout', authController.logout)
router.post('/verify', authController.verifyAccount)
router.post('/refresh-token', authController.refreshToken)
router.post('/forgot-password', authController.forgotPassword)
router.post('/reset-password', authController.resetPassword)

export const authRoute = router