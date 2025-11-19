import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLaptop, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  
  const [scrolled, setScrolled] = useState(false);

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

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 3. Styling động cho Navbar (Giữ nguyên)
  const navClasses = `
    w-full 
    fixed top-0 z-50 
    px-6 py-3 
    flex justify-between items-center 
    transition-all duration-300
    ${scrolled 
      ? 'bg-white shadow-lg text-blue-600' // Khi cuộn: Nền trắng, chữ xanh
      : 'bg-transparent text-white' // Ban đầu: Nền trong suốt, chữ trắng
    }
  `;

  const loginButtonClasses = scrolled
    ? "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700" // Khi cuộn: Nền xanh, chữ trắng (không viền)
    : "bg-white text-blue-600 border border-white hover:bg-gray-200"; // Ban đầu: Nền trắng, chữ xanh (viền trắng)

  const registerButtonClasses = scrolled
    ? "bg-blue-600 text-white hover:bg-blue-700" // Khi cuộn: Nền xanh, chữ trắng
    : "bg-white text-blue-600 hover:bg-gray-200"; // Ban đầu: Nền trắng, chữ xanh
    

  return (
    <nav className={navClasses}> 
      
      {/* Logo và Menu giữ nguyên */}
      <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <FaLaptop /> Laptop Store
      </Link>

      <ul className="flex gap-6 font-medium">
        <li><Link to="/" className="hover:opacity-80">Home</Link></li>
        <li><Link to="/products" className="hover:opacity-80">Products</Link></li>
        <li><Link className="hover:opacity-80">About</Link></li>
        <li><Link className="hover:opacity-80">Contact</Link></li>
      </ul>

      <div className="flex items-center gap-4 text-xl">

        {/* Giỏ hàng (Đã đổi màu hover sang opacity để nhất quán với màu chữ động) */}
        <FaShoppingCart
          className="cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/cart")}
        />

        {user ? (
          /* Đã Login */
          <div className="flex items-center gap-3">

            <Link
              to="/profile"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity" 
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-base">{user.fullName || user.email}</span>
            </Link>

            <button
              onClick={handleLogout}
              className={scrolled 
                  ? "text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  : "text-sm bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition-colors"
              }
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 text-base">
            
            <Link
              to="/register"
              className={`px-3 py-1 rounded font-semibold transition-colors duration-300
                ${scrolled 
                    ? "bg-blue-600 text-white hover:bg-blue-700" // Khi cuộn: Nền xanh, chữ trắng
                    : "bg-white text-blue-600 hover:bg-gray-200" // Ban đầu: Nền trắng, chữ xanh
                }`}
            >
              Register
            </Link>

            <Link
              to="/login"
              className={`px-3 py-1 rounded transition-all duration-300 font-semibold 
                ${scrolled 
                    ? "bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50" // Khi cuộn: Viền xanh, nền trong suốt
                    : "bg-transparent text-white border border-white hover:bg-white/10" // Ban đầu: Viền trắng, nền trong suốt
                }`}
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