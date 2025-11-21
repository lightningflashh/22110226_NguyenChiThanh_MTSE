import User from '~/models/userModel.js'
import { pickUser } from '~/utils/formatters.js'
import { v4 as uuidv4 } from 'uuid'
import { jwtProvider } from '~/providers/JwtProvider.js'
import { GoogleMailerProvider } from '~/providers/GoogleMailerProvider.js'
import { env } from '~/config/environment.js'
import ApiError from '~/utils/ApiError.js'
import { StatusCodes } from 'http-status-codes'

const getVerifyLink = (token, email) => {
    return `http://localhost:3000/verify?token=${token}&email=${email}`
}

const createNew = async (reqBody) => {
    const existingUser = await User.findOne({ email: reqBody.email })
    if (existingUser) throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists')

    const nameFromEmail = reqBody.email.split('@')[0]
    const verifyToken = uuidv4()

    const newUser = new User({
        email: reqBody.email,
        password: reqBody.password,
        username: nameFromEmail,
        displayName: nameFromEmail,
        verifyToken,
        role: 'user',
        isActive: false
    })

    const createdUser = await newUser.save()

    const verifyLink = getVerifyLink(verifyToken, createdUser.email)
    const htmlContent = `
    <h2>Xác thực tài khoản</h2>
    <p>Xin chào ${createdUser.displayName},</p>
    <p>Nhấn vào link dưới đây để kích hoạt tài khoản:</p>
    <a href="${verifyLink}">Xác thực tài khoản</a>
    <p>Link sẽ hết hạn trong 24h.</p>
  `
    await GoogleMailerProvider.sendEmail({
        to: createdUser.email,
        toName: createdUser.displayName,
        subject: 'Xác thực tài khoản',
        html: htmlContent
    })

    return pickUser(createdUser)
}

const verifyAccount = async (reqBody) => {
    const user = await User.findOne({ email: reqBody.email })
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    if (user.isActive) throw new ApiError(StatusCodes.BAD_REQUEST, 'Account already verified')
    if (reqBody.token !== user.verifyToken) throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid verification token')

    user.isActive = true
    user.verifyToken = null
    await user.save()

    return pickUser(user)
}

const login = async (reqBody) => {
    const user = await User.findOne({ email: reqBody.email })
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    if (!user.isActive) throw new ApiError(StatusCodes.BAD_REQUEST, 'Account not verified')

    const isMatch = await user.matchPassword(reqBody.password)
    if (!isMatch) throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid password')

    const accessToken = await jwtProvider.generateToken(
        { _id: user._id, email: user.email, role: user.role },
        env.ACCESS_TOKEN_SECRET_SIGNATURE,
        env.ACCESS_TOKEN_LIFE
    )
    const refreshToken = await jwtProvider.generateToken(
        { _id: user._id, email: user.email, role: user.role },
        env.REFRESH_TOKEN_SECRET_SIGNATURE,
        env.REFRESH_TOKEN_LIFE
    )

    return { ...pickUser(user), accessToken, refreshToken }
}

const refreshToken = async (clientRefreshToken) => {
    const decoded = await jwtProvider.verifyToken(clientRefreshToken, env.REFRESH_TOKEN_SECRET_SIGNATURE)
    const accessToken = await jwtProvider.generateToken(
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
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')
    return user
}

const updateUser = async (id, updateData) => {
    const user = await User.findById(id)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

    Object.assign(user, updateData)
    const updatedUser = await user.save()
    return pickUser(updatedUser)
}

const deleteUser = async (id) => {
    const user = await User.findById(id)
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found')

    user._destroy = true
    await user.save()
    return pickUser(user)
}

const getResetPasswordLink = (token, email) => {
    return `http://localhost:3000/reset-password?token=${token}&email=${email}`
}

export const forgotPassword = async (email) => {
    const user = await User.findOne({ email })
    if (!user) throw new ApiError('User not found')

    // Tạo reset token + thời hạn
    const token = uuidv4()
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3 * 60 * 1000 // 3 phút
    await user.save()

    // Tạo link
    const resetLink = getResetPasswordLink(token, user.email)

    // Nội dung email HTML
    const htmlContent = `
      <h2>Password Reset Request</h2>
      <p>You have requested to reset your password.</p>
      <p>Click the link below to continue:</p>
      <a href="${resetLink}" style="color: blue;">Reset Password</a>
      <p>This link will expire in <strong>3 minutes</strong>.</p>
    `

    // Gửi email bằng Gmail OAuth2
    await GoogleMailerProvider.sendEmail({
        to: user.email,
        toName: user.name || 'User',
        subject: 'Reset Your Password',
        html: htmlContent
    })

    return { message: 'Reset password email sent successfully' }
}
export const resetPassword = async ({ email, token, newPassword }) => {
    console.log("Reset token:", token)
    console.log("Reset email:", email)
    const user = await User.findOne({ email, resetPasswordToken: token })
    console.log("Found user:", user)
    if (!user) throw new ApiError('Invalid or expired token')

    if (user.resetPasswordExpires < Date.now()) {
        throw new ApiError(StatusCodes.GONE, 'Token expired')
    }

    user.password = newPassword
    user.resetPasswordToken = null
    user.resetPasswordExpires = null

    await user.save()

    return {
        message: 'Password updated successfully',
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        }
    }
}

export const userService = {
    createNew,
    verifyAccount,
    login,
    refreshToken,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword
}
