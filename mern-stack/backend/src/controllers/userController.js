import { userService } from '~/services/userService.js'
import { HttpStatusCode } from 'axios'

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(HttpStatusCode.Ok).json({ success: true, data: users })
    } catch (error) {
        console.error(error)
        res.status(HttpStatusCode.InternalServerError).json({ success: false, message: error.message })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id)
        res.status(HttpStatusCode.Ok).json({ success: true, data: user })
    } catch (error) {
        res.status(
            error.message === 'User not found' ? HttpStatusCode.NotFound : HttpStatusCode.InternalServerError
        ).json({ success: false, message: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body)
        res.status(HttpStatusCode.Ok).json({ success: true, data: user })
    } catch (error) {
        res.status(
            error.message === 'User not found' ? HttpStatusCode.NotFound : HttpStatusCode.InternalServerError
        ).json({ success: false, message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUser(req.params.id)
        res.status(HttpStatusCode.Ok).json({ success: true, data: user })
    } catch (error) {
        res.status(
            error.message === 'User not found' ? HttpStatusCode.NotFound : HttpStatusCode.InternalServerError
        ).json({ success: false, message: error.message })
    }
}

export const userController = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
