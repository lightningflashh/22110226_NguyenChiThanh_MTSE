import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { resetPasswordAPI } from '~/api/index'

const ResetPassword = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const email = searchParams.get('email')
  const navigate = useNavigate()
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      await resetPasswordAPI({ email, token, newPassword: data.password })
      toast.success('Đặt lại mật khẩu thành công!')
      navigate('/login')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Có lỗi xảy ra, vui lòng thử lại.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-xl shadow-indigo-500/10 overflow-hidden">
        <div className="p-8 md:p-10 space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white tracking-tight">Đặt lại mật khẩu</h2>
            <p className="mt-2 text-md text-gray-400">
              Nhập mật khẩu mới cho tài khoản của bạn.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">Mật khẩu mới</label>
              <input 
                id="password"
                type="password" 
                {...register('password', { 
                  required: 'Mật khẩu là bắt buộc',
                  minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' }
                })}
                className={`mt-2 w-full border-b-2 ${errors.password ? 'border-red-500' : 'border-gray-600'} bg-gray-700 text-white rounded-t-lg p-3 shadow-inner focus:outline-none focus:border-indigo-400 transition duration-150 ease-in-out placeholder-gray-500`}
                placeholder="********"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg shadow-md shadow-indigo-500/20 hover:bg-indigo-600 disabled:opacity-50 transition duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {isSubmitting ? 'Đang đặt lại...' : 'Đặt lại mật khẩu'}
            </button>
          </form>

          <div className="text-center text-sm pt-2">
            <p className="text-gray-400">
              <Link to="/login" className="font-medium text-indigo-400 hover:text-indigo-300 hover:underline transition duration-150">
                Quay lại Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
