import { StatusCodes } from 'http-status-codes'
import { userService } from '~/services/userService.js'
import ms from 'ms'
import ApiError from '~/utils/ApiError.js'

const createNew = async (req, res, next) => {
    try {
        const createdUser = await userService.createNew(req.body)
        return res.status(StatusCodes.CREATED).json(createdUser)
    } catch (error) { next(error) }
}

const verifyAccount = async (req, res, next) => {
    try {
        const result = await userService.verifyAccount(req.body)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await userService.login(req.body)

        // res.cookie('accessToken', user.accessToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     maxAge: ms('14 days')
        // })

        // res.cookie('refreshToken', user.refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     maxAge: ms('14 days')
        // })

        res.cookie('accessToken', user.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('2 minutes')
        })

        res.cookie('refreshToken', user.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('2 minutes')
        })

        return res.status(StatusCodes.OK).json(user)
    } catch (error) {
        next(error)
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req, res);

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        return res.status(StatusCodes.OK).json({ message: "Đã đăng xuất thành công" });
    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const clientRefreshToken = req.cookies?.refreshToken
        if (!clientRefreshToken) {
            throw new ApiError(StatusCodes.UNAUTHORIZED, "No refresh token provided")
        }

        const result = await userService.refreshToken(clientRefreshToken)

        res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: ms('14 days')
        })

        return res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const forgotPassword = async (req, res) => {
    try {
        await userService.forgotPassword(req.body.email)
        res.status(StatusCodes.OK).json({ message: 'Email reset password đã được gửi' })
    } catch (err) {
        next(err)
    }
}

const resetPassword = async (req, res) => {
    try {
        const updatedUser = await userService.resetPassword(req.body)
        res.status(StatusCodes.OK).json(updatedUser)
    } catch (err) {
        next(err)
    }
}

export const authController = {
    createNew,
    verifyAccount,
    login,
    logout,
    refreshToken,
    forgotPassword,
    resetPassword
}
