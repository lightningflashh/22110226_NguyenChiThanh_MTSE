import React, { useEffect, useRef } from 'react';
import ProductCard from '../components/Product/ProductCard';
import Section from '../components/Section/Section';
import HeroBanner from '../components/Banner/HeroBanner';
import { ComputerDesktopIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';

// Import từ Redux
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchInitialProductsAPI, 
  fetchMoreProductsAPI, 
  selectProducts, 
  selectPageInfo,
  setProductsToInitialState
} from '~/redux/products/productSlice'; // Đảm bảo đúng đường dẫn slice

const HomePage = () => {
const dispatch = useDispatch();
const products = useSelector(selectProducts);
const { page, totalPages, isLoading, isLoadingMore } = useSelector(selectPageInfo);

const productSectionRef = useRef(null);
const hasFetchedRef = useRef(false); // Khai báo useRef để kiểm soát việc fetch API
const limit = 3; 

// 1. Load lần đầu (Dùng useEffect)
useEffect(() => {
  // Kiểm tra cờ hasFetchedRef.current để đảm bảo fetch chỉ chạy 1 lần
  if (!hasFetchedRef.current) {
    dispatch(fetchInitialProductsAPI());
    hasFetchedRef.current = true; // Đánh dấu đã fetch
  }
}, [dispatch]);

// 2. Load thêm (cộng dồn)
const handleLoadMore = () => {
 if (page >= totalPages || isLoadingMore) return;

 const nextPage = page + 1;
 // Gọi action thunk, truyền nextPage vào payload
 dispatch(fetchMoreProductsAPI(nextPage));
};

// 3. Thu gọn (Sử dụng Reducer thường)
const handleCollapse = () => {
 dispatch(setProductsToInitialState()); 
  
 if (productSectionRef.current) {
 productSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
 }
};

const ProductSkeleton = () => (
 <div className="bg-white rounded-2xl p-4 animate-pulse border border-gray-100 h-full flex flex-col">
 <div className="w-full aspect-square bg-gray-200 rounded-xl mb-4"></div>
 <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
 <div className="h-4 bg-gray-200 rounded w-1/2 mb-auto"></div>
 <div className="h-8 bg-gray-200 rounded w-full mt-4"></div>
 </div>
);

const gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

return (
 <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-800">
 
 <HeroBanner />

 <div className="container mx-auto px-4 md:px-8 space-y-16">
  
  <div ref={productSectionRef}>
  <Section title={
   <div className="flex items-center gap-3 text-2xl font-bold text-gray-800">
   <span className="p-2 bg-blue-100 text-blue-600 rounded-lg shadow-sm">
    <ComputerDesktopIcon className="w-6 h-6" />
   </span>
   Tất Cả Laptop
   </div>
  }>
   <div className={gridClassName}>
    {products.map((p) => (
    <div key={p._id} className="h-full">
     <ProductCard product={p} />
    </div>
    ))}

    {/* Skeleton khi load lần đầu */}
    {isLoading && [...Array(limit)].map((_, i) => <ProductSkeleton key={i} />)}
    
    {/* Skeleton khi load thêm */}
    {isLoadingMore && products.length >= limit && [...Array(limit)].map((_, i) => <ProductSkeleton key={`more-${i}`} />)}
   </div>

   <div className="flex justify-center mt-12 gap-4">
    
    {/* Nút XEM THÊM */}
    {!isLoading && !isLoadingMore && page < totalPages && (
    <button
     onClick={handleLoadMore}
     disabled={isLoadingMore}
     className="flex items-center gap-2 px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
    >
     <ArrowDownCircleIcon className="w-6 h-6" />
     {isLoadingMore ? 'Đang tải...' : 'Xem thêm sản phẩm'}
    </button>
    )}

    {/* Nút THU GỌN */}
    {!isLoading && products.length > limit && (
    <button
     onClick={handleCollapse}
     disabled={isLoadingMore}
     className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
     <ArrowUpCircleIcon className="w-6 h-6" />
     Thu gọn
    </button>
    )}
   </div>
  </Section>
  </div>

 </div>
 </div>
);
};

export default HomePage;