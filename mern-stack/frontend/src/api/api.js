import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/v1'

const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
})

export const registerUser = (data) => instance.post('/auth/register', data)
export const verifyAccount = (data) => instance.post('/auth/verify', data)
export const loginUser = (data) => instance.post('/auth/login', data)

export const getAllUsers = () => instance.get('/users')
export const getProducts = (page = 1, limit = 10) => {
    return instance.get(`/products?page=${page}&limit=${limit}`);
}

export default instance
