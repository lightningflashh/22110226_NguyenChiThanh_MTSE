import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddleware } from '~/middlewares/authMiddleware'


const router = express.Router()

router.get('', authMiddleware.isAuthorized, userController.getAllUsers)
router.get('/:id', authMiddleware.isAuthorized, userController.getUserById)
router.put('/:id', authMiddleware.isAuthorized, userController.updateUser)
router.delete('/:id', authMiddleware.isAuthorized, userController.deleteUser)

export const userRoute = router