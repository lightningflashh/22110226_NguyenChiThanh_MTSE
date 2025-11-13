import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '~/api'
import { toast } from 'react-toastify'

export default function Register() {
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      await registerUser(data)
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Đăng ký</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input type="email" {...register('email', { required: true })} className="mt-1 w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Mật khẩu</label>
            <input type="password" {...register('password', { required: true })} className="mt-1 w-full border rounded p-2" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  )
}
