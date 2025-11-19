import React, { useState, useEffect } from 'react';
// 💡 Import hàm getProducts từ file API Client của bạn
import { getProducts } from '../api'; // Thay đổi đường dẫn import nếu cần

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; 

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getProducts(currentPage, limit); 
                setProducts(response.data.products);
                setPagination(response.data.pagination);
            } catch (error) {
                console.error("Lỗi khi tải sản phẩm:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, [currentPage, limit]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Cuộn mượt mà hơn
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            
            {/* TIÊU ĐỀ TRANG */}
            <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">
                Khám Phá Laptop Gaming Mạnh Mẽ
            </h1>
            
            {/* THÔNG BÁO TẢI / KHÔNG CÓ SẢN PHẨM */}
            {isLoading && (
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
                    <p className="ml-4 text-gray-700 text-lg">Đang tải sản phẩm...</p>
                </div>
            )}
            {!isLoading && products.length === 0 && (
                <p className="text-center text-gray-600 text-lg py-10">
                    Không tìm thấy sản phẩm nào phù hợp.
                </p>
            )}

            {/* 📦 HIỂN THỊ DANH SÁCH SẢN PHẨM */}
            {!isLoading && products.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <div 
                            key={product._id} 
                            className="bg-white rounded-lg shadow-xl overflow-hidden 
                                       hover:shadow-2xl transition-shadow duration-300 
                                       flex flex-col border border-gray-200"
                        >
                            {/* HÌNH ẢNH SẢN PHẨM */}
                            <div className="relative h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                                <img 
                                    src={product.image || 'https://via.placeholder.com/200x150?text=No+Image'} 
                                    alt={product.name} 
                                    className="object-contain h-full w-full p-4"
                                />
                                {product.countInStock === 0 && (
                                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                        Hết hàng
                                    </span>
                                )}
                            </div>

                            {/* THÔNG TIN SẢN PHẨM */}
                            <div className="p-5 flex-grow flex flex-col justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                    {product.description || 'Mô tả đang được cập nhật.'}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <p className="text-xl font-bold text-blue-600">
                                        {product.price.toLocaleString()} VNĐ
                                    </p>
                                    <div className="flex items-center text-yellow-500 text-sm">
                                        <svg className="w-4 h-4 mr-1 fill-current" viewBox="0 0 20 20">
                                            <path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71l6.572-.955L10 1l2.941 5.755 6.572.955-4.743 4.635 1.123 6.545z"/>
                                        </svg>
                                        <span>{product.rating?.toFixed(1) || 'N/A'}</span>
                                    </div>
                                </div>
                                <button 
                                    className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md 
                                               hover:bg-blue-700 transition-colors duration-300 
                                               font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={product.countInStock === 0}
                                >
                                    {product.countInStock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 🔢 CONTROLS PHÂN TRANG */}
            {!isLoading && pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 space-x-4">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        disabled={!pagination.hasPrevPage || isLoading}
                        className="px-5 py-2 border border-blue-400 text-blue-600 rounded-md 
                                   hover:bg-blue-50 transition-colors duration-200 
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        &larr; Trang Trước
                    </button>
                    
                    <span className="text-lg font-medium text-gray-800">
                        Trang <strong className="text-blue-600">{pagination.currentPage}</strong> / <strong className="text-blue-600">{pagination.totalPages}</strong>
                    </span>

                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!pagination.hasNextPage || isLoading}
                        className="px-5 py-2 border border-blue-400 text-blue-600 rounded-md 
                                   hover:bg-blue-50 transition-colors duration-200 
                                   disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Trang Sau &rarr;
                    </button>
                </div>
            )}
        </div>
    );
};

export default HomePage;