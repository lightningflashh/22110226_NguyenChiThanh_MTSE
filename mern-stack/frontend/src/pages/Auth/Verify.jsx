import React, { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { verifyAccount } from '~/api'
import { toast } from 'react-toastify'

const Verify = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const handleVerify = async () => {
    setLoading(true)
    try {
      await verifyAccount({ email, token })
      toast.success('Xác thực thành công! Chuyển tới trang đăng nhập...')
      
      // Chờ 1s rồi chuyển về login
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-gray-800 rounded-2xl shadow-xl shadow-blue-500/10 overflow-hidden">
        <div className="p-8 md:p-10 space-y-6 text-center">
          <h2 className="text-4xl font-bold text-white tracking-tight">Xác thực tài khoản</h2>
          <p className="mt-2 text-md text-gray-400">Email: {email}</p>
          <button
            onClick={handleVerify}
            disabled={loading}
            className="mt-4 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-md shadow-blue-500/20 hover:bg-blue-600 disabled:opacity-50 transition duration-200"
          >
            {loading ? 'Đang xác thực...' : 'Xác thực ngay'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Verify