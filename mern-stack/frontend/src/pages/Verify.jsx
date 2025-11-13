import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { verifyAccount } from '~/api'
import { toast } from 'react-toastify'

export default function Verify() {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const handleVerify = async () => {
    setLoading(true)
    try {
      await verifyAccount({ email, token })
      toast.success('Xác thực thành công! Bạn có thể đăng nhập ngay.')
    } catch (err) {
      toast.error(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow text-center">
        <h2 className="text-2xl font-bold">Xác thực tài khoản</h2>
        <p className="text-gray-600">Email: {email}</p>
        <button
          onClick={handleVerify}
          disabled={loading}
          className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Đang xác thực...' : 'Xác thực ngay'}
        </button>
      </div>
    </div>
  )
}
