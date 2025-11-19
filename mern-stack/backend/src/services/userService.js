import User from '~/models/userModel.js'
import { pickUser } from '~/utils/formatters.js'
import { v4 as uuidv4 } from 'uuid'
import { JwtProvider } from '~/providers/JwtProvider.js'
import { env } from '~/config/environment.js'
import { HttpStatusCode } from 'axios'

const createNew = async (reqBody) => {
    const existingUser = await User.findOne({ email: reqBody.email })
    if (existingUser) throw new Error('Email already exists')

    const nameFromEmail = reqBody.email.split('@')[0]

    const newUser = new User({
        email: reqBody.email,
        password: reqBody.password, // sẽ được hash bởi schema
        username: nameFromEmail,
        displayName: nameFromEmail,
        verifyToken: uuidv4(),
        role: 'user',
        isActive: false
    })

    const createdUser = await newUser.save()
    return pickUser(createdUser)
}

const verifyAccount = async (reqBody) => {
    const user = await User.findOne({ email: reqBody.email })
    if (!user) throw new Error('User not found')
    if (user.isActive) throw new Error('Account already verified')
    if (reqBody.token !== user.verifyToken) throw new Error('Invalid verification token')

    user.isActive = true
    user.verifyToken = null
    await user.save()

    return pickUser(user)
}

const login = async (reqBody) => {
    const user = await User.findOne({ email: reqBody.email })
    if (!user) throw new Error('User not found')
    // if (!user.isActive) throw new Error('Account not verified')

    const isMatch = await user.matchPassword(reqBody.password)
    if (!isMatch) throw new Error('Invalid password')

    const accessToken = await JwtProvider.generateToken(
        { _id: user._id, email: user.email, role: user.role },
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        env.ACCESS_TOKEN_LIFE
    )
    const refreshToken = await JwtProvider.generateToken(
        { _id: user._id, email: user.email, role: user.role },
        env.REFRESH_TOKEN_SECRET_SIGNATURE,
        env.REFRESH_TOKEN_LIFE
    )

    return { ...pickUser(user), accessToken, refreshToken }
}

const refreshToken = async (clientRefreshToken) => {
    const decoded = await JwtProvider.verifyToken(clientRefreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE)
    const accessToken = await JwtProvider.generateToken(
        { _id: decoded._id, email: decoded.email, role: decoded.role },
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        env.ACCESS_TOKEN_LIFE
    )
    return { accessToken }
}

const getAllUsers = async () => {
    const users = await User.find({ _destroy: false }).select('-password -verifyToken')
    return users
}

const getUserById = async (id) => {
    const user = await User.findById(id).select('-password -verifyToken')
    if (!user) throw new Error('User not found')
    return user
}

const updateUser = async (id, updateData) => {
    const user = await User.findById(id)
    if (!user) throw new Error('User not found')

    Object.assign(user, updateData)
    const updatedUser = await user.save()
    return pickUser(updatedUser)
}

const deleteUser = async (id) => {
    const user = await User.findById(id)
    if (!user) throw new Error('User not found')

    user._destroy = true
    await user.save()
    return pickUser(user)
}

export const userService = {
    createNew,
    verifyAccount,
    login,
    refreshToken,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}
