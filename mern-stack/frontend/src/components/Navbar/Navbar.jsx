import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLaptop, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logoutUserAPI } from "~/redux/user/userSlice"; 
import { toast } from "react-toastify"; // Đảm bảo bạn đã import toast

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Khởi tạo useDispatch
    
    const [scrolled, setScrolled] = useState(false);
    
    // LẤY THÔNG TIN TỪ REDUX
    const currentUser = useSelector(selectCurrentUser);
    // Xác định người dùng đã đăng nhập hay chưa
    const isAuthenticated = !!currentUser; 

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []); 

    // XỬ LÝ ĐĂNG XUẤT (DÙNG REDUX THUNK)
    const handleLogout = async () => {
        // Dispatch action logout (Hàm này sẽ xóa cookie/token và reset state trong slice)
        const actionResult = await dispatch(logoutUserAPI());
        
        // Kiểm tra nếu logout thành công
        if (logoutUserAPI.fulfilled.match(actionResult)) {
            // Logout API đã tự toast, chỉ cần điều hướng
            navigate("/login");
        } else {
            // Xử lý lỗi nếu cần
            toast.error("Đăng xuất thất bại!");
        }
    };

    // 3. Styling động cho Navbar (Giữ nguyên)
    const navClasses = `
        w-full 
        fixed top-0 z-50 
        px-6 py-3 
        flex justify-between items-center 
        transition-all duration-300
        ${scrolled 
          ? 'bg-white shadow-lg text-blue-600'
          : 'bg-transparent text-white'
        }
    `;
    
    // Các class styling khác giữ nguyên...

    const loginButtonClasses = scrolled
      ? "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50"
      : "bg-transparent text-white border border-white hover:bg-white/10";

    const registerButtonClasses = scrolled
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-white text-blue-600 hover:bg-gray-200";

    const logoutButtonClasses = scrolled 
        ? "text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
        : "text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors";
    
    

    return (
        <nav className={navClasses}> 
            
            {/* Logo và Menu giữ nguyên */}
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                <FaLaptop /> Laptop Store
            </Link>

            <ul className="flex gap-6 font-medium">
                <li><Link to="/" className="hover:opacity-80">Home</Link></li>
                <li><Link to="/products" className="hover:opacity-80">Products</Link></li>
                <li><Link to="/about" className="hover:opacity-80">About</Link></li>
                <li><Link to="/contact" className="hover:opacity-80">Contact</Link></li>
            </ul>

            <div className="flex items-center gap-4 text-xl">

                {/* Giỏ hàng */}
                <FaShoppingCart
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate("/cart")}
                />

                {isAuthenticated ? (
                    /* Đã Login */
                    <div className="flex items-center gap-3">

                        <Link
                            to="/profile"
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity" 
                        >
                            <FaUserCircle className="text-2xl" />
                            <span className="text-base">{currentUser.fullName || currentUser.email}</span>
                        </Link>

                        <button
                            onClick={handleLogout}
                            className={logoutButtonClasses}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center gap-4 text-base">
                        
                        <Link
                            to="/register"
                            className={`px-3 py-1 rounded font-semibold transition-colors duration-300 ${registerButtonClasses}`}
                        >
                            Register
                        </Link>

                        <Link
                            to="/login"
                            className={`px-3 py-1 rounded transition-all duration-300 font-semibold ${loginButtonClasses}`}
                        >
                            Login
                        </Link>
                        
                    </div>
                )}
            </div>

        </nav>
    );
};

export default Navbar;