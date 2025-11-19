import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUser } from '~/api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Register() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
  const password = watch('password')

  const onSubmit = async (data) => {
    const { confirmPassword, ...registerData } = data;
    
    try {
      await registerUser(registerData)
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    }
  }

  return (
    // Nền tối toàn màn hình
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      
      {/* Container chính: Màu nền đậm, bo tròn, đổ bóng neon tinh tế */}
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-xl shadow-teal-500/10 overflow-hidden">
        <div className="p-8 md:p-10 space-y-8">
          
          {/* Header & Title - Đã loại bỏ icon */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Đăng ký
            </h2>
            <p className="mt-2 text-md text-gray-400">
              Tham gia cộng đồng của chúng tôi
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
                className={`mt-2 w-full border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-teal-400 transition duration-150 ease-in-out placeholder-gray-500`}
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
                  minLength: { value: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự' },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
                  }
                })} 
                className={`mt-2 w-full border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-teal-400 transition duration-150 ease-in-out placeholder-gray-500`}
                placeholder="Tối thiểu 8 ký tự"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                Xác nhận Mật khẩu
              </label>
              <input 
                id="confirmPassword"
                type="password" 
                {...register('confirmPassword', { 
                  required: 'Xác nhận mật khẩu là bắt buộc',
                  validate: (value) => 
                    value === password || 'Mật khẩu xác nhận không khớp'
                })} 
                className={`mt-2 w-full border-b-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-teal-400 transition duration-150 ease-in-out placeholder-gray-500`}
                placeholder="Nhập lại mật khẩu"
              />
              {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-teal-500 text-white font-semibold py-3 rounded-lg shadow-md shadow-teal-500/20 hover:bg-teal-600 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
            >
              Đăng ký
            </button>
          </form>

          {/* Footer Link */}
          <div className="text-center text-sm pt-2">
            <p className="text-gray-400">
              Đã có tài khoản?{' '}
              <Link to="/login" className="font-medium text-teal-400 hover:text-teal-300 hover:underline transition duration-150">
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}