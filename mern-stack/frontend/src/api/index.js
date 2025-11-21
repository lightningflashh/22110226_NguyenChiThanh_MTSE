import axios from 'axios'
import { API_ROOT } from '~/utils/constants'


const API_BASE_URL = API_ROOT + '/v1'
const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

export const registerUser = async (data) => {
    const response = await instance.post('/auth/register', data)
    return response.data
}

export const verifyAccount = async (data) => {
    const response = await instance.post('/auth/verify', data)
    return response.data
}

export const loginUser = async (data) => {
    const response = await instance.post('/auth/login', data)
    return response.data
}

export const getAllUsers = async () => {
    const response = await instance.get('/users')
    return response.data
}

export const getProducts = async (page = 1, limit = 10) => {
    const response = await instance.get(`/products?page=${page}&limit=${limit}`)
    return response.data
}

export const refreshTokenAPI = async () => {
    const response = await instance.post('/auth/refresh-token')
    return response.data
}

export const logoutUserAPI = async () => {
    const response = await instance.delete('/auth/logout')
    return response.data
}

export const forgotPasswordAPI = async (email) => {
    const response = await instance.post('/auth/forgot-password', { email })
    return response.data
}

export const resetPasswordAPI = async ({ email, token, newPassword }) => {
    const response = await instance.post('/auth/reset-password', { email, token, newPassword })
    return response.data
}
