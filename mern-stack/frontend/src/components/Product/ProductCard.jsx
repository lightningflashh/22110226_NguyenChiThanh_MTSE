import React from "react";
import { ShoppingBagIcon, StarIcon } from "@heroicons/react/24/solid";

const ProductCard = ({ product }) => {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full w-full">
      
      {/* IMAGE SECTION */}
      <div className="relative h-56 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
        {/* Badge */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
           {discountPercent > 0 ? (
             <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
               -{discountPercent}%
             </span>
           ) : (
             <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
               NEW
             </span>
           )}
        </div>

        <img 
          src={"assets/products/macbook-pro-14-m1-max-2021-10-core-cpu-xam-1-750x500.jpg" || product.image}
          alt={product.name}
          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110 drop-shadow-md mix-blend-multiply"
        />
        
        {/* Quick View Button */}
        <div className="absolute bottom-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-blue-600/90 backdrop-blur-sm text-white py-2 text-center text-sm font-medium cursor-pointer md:hidden lg:block">
            Xem chi tiết
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                LAPTOP
            </span>
            <div className="flex items-center text-yellow-400 gap-1">
                <StarIcon className="w-4 h-4" />
                <span className="text-gray-500 text-xs font-medium pt-0.5">4.8</span>
            </div>
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-2 line-clamp-2 h-12 leading-snug group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {product.description || "Cấu hình mạnh mẽ, thiết kế sang trọng..."}
        </p>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount && (
                <span className="text-xs text-gray-400 line-through decoration-red-400">
                    {product.originalPrice?.toLocaleString()} đ
                </span>
            )}
            <span className="text-lg font-extrabold text-blue-600">
              {product.price?.toLocaleString()} <span className="text-xs font-normal text-gray-500">đ</span>
            </span>
          </div>

          <button 
            className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:text-white hover:scale-110 hover:shadow-lg transition-all duration-300"
            title="Thêm vào giỏ"
          >
            <ShoppingBagIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;