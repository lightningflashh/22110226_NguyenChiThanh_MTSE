import React from 'react'
import { useForm } from 'react-hook-form'
import { loginUser } from '~/api/api'
import { toast } from 'react-toastify'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
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
    // Nền tối toàn màn hình
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      
      {/* Container chính: Màu nền đậm, bo tròn, đổ bóng neon tinh tế */}
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-xl shadow-blue-500/10 overflow-hidden">
        <div className="p-8 md:p-10 space-y-8">
          
          {/* Header & Title - Đã loại bỏ icon */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Đăng nhập
            </h2>
            <p className="mt-2 text-md text-gray-400">
              Chào mừng trở lại!
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input 
                id="email"
                type="email" 
                {...register('email', { 
                  required: 'Email là bắt buộc',
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Địa chỉ email không hợp lệ' }
                })} 
                // Input style: Nền xám, viền xám mỏng, focus viền xanh neon
                className={`mt-2 w-full border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-blue-400 transition duration-150 ease-in-out placeholder-gray-500`}
                placeholder="vd: user@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Mật khẩu
              </label>
              <input 
                id="password"
                type="password" 
                {...register('password', { 
                  required: 'Mật khẩu là bắt buộc',
                  minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                })} 
                // Input style: Nền xám, viền xám mỏng, focus viền xanh neon
                className={`mt-2 w-full border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-blue-400 transition duration-150 ease-in-out placeholder-gray-500`}
                placeholder="********"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              // Button style: Nền xanh neon, chữ trắng, đổ bóng nhẹ
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md shadow-blue-500/20 hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Đăng nhập
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-sm pt-2">
            <p className="text-gray-400">
              Chưa có tài khoản?{' '}
              <Link to="/register" className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition duration-150">
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}