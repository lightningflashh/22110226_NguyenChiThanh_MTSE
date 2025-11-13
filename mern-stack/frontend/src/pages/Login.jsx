import React from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '~/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data)
      const { accessToken } = res.data
      localStorage.setItem('accessToken', accessToken)
      toast.success('Đăng nhập thành công!')
      reset()
      navigate('/users')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" {...register('email', { required: true })} className="mt-1 w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input type="password" {...register('password', { required: true })} className="mt-1 w-full border rounded p-2" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  )
}
