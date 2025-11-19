import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from '~/pages/Register'
import Verify from '~/pages/Verify'
import Login from '~/pages/Login'
import UserListPage from '~/pages/UserListPage'
import ForgotPassword from '~/pages/ForgotPassword'
import './index.css'
import HomePage from '~/pages/HomePage'

ReactDOM.createRoot(document.getElementById('root')).render(
 <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='' element={<HomePage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  </React.StrictMode>
)
