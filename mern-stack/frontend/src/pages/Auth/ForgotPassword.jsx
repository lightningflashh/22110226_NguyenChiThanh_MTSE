import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { forgotPasswordAPI } from '~/api/index'

const ForgotPassword = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await forgotPasswordAPI(data.email)
      toast.success('Yêu cầu đã được gửi! Vui lòng kiểm tra email của bạn.')
      reset()
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Có lỗi xảy ra, vui lòng thử lại.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-xl shadow-indigo-500/10 overflow-hidden">
        <div className="p-8 md:p-10 space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">Quên Mật khẩu</h2>
            <p className="mt-2 text-md text-gray-400">
              Nhập email để nhận liên kết đặt lại mật khẩu.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input 
                id="email"
                type="email" 
                {...register('email', { 
                  required: 'Email là bắt buộc',
                  pattern: { 
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                    message: 'Địa chỉ email không hợp lệ' 
                  }
                })} 
                className={`mt-2 w-full border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-indigo-400 transition duration-150 ease-in-out placeholder-gray-500`}
                placeholder="vd: user@example.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md shadow-indigo-500/20 hover:bg-indigo-600 disabled:opacity-50 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi Yêu cầu Đặt lại'}
            </button>
          </form>

          <div className="text-center text-sm space-y-2 pt-2">
            <p className="text-gray-400">
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition duration-150">
                Quay lại Đăng nhập
              </Link>
            </p>
            <p className="text-gray-400">
              <Link to="/register" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition duration-150">
                Tạo tài khoản mới
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
