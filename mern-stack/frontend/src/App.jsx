import { Routes, Route } from 'react-router-dom'
import MainLayout from '~/layouts/MainLayout'
import AuthLayout from '~/layouts/AuthLayout'

import HomePage from '~/pages/HomePage'
import Login from '~/pages/Auth/Login'
import Register from '~/pages/Auth/Register'
import ForgotPassword from '~/pages/Auth/ForgotPassword'
import ResetPassword from '~/pages/Auth/ResetPassword'
import Verify from '~/pages/Auth/Verify'

function App() {
  return (
    <Routes>
      {/* Layout chính */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* Thêm các trang cần Navbar */}
      </Route>

      {/* Layout Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify" element={<Verify />} />
      </Route>
    </Routes>
  )
}

export default App
