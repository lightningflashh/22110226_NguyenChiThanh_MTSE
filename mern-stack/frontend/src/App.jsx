import { Routes, Route } from 'react-router-dom'
import Register from '~/pages/Register'
import Verify from '~/pages/Verify'
import Login from '~/pages/Login'
import UserListPage from '~/pages/UserListPage'
import ForgotPassword from '~/pages/ForgotPassword'
import HomePage from '~/pages/HomePage'
import Navbar from '~/components/Navbar/Navbar'

function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </div>
  )
}

export default App
