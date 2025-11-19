import React, { useState, useEffect, useRef } from 'react';
import { getProducts } from '../api/api';
import ProductCard from '../components/Product/ProductCard';
import Section from '../components/Section/Section';
import HeroBanner from '../components/Banner/HeroBanner';
import { ComputerDesktopIcon, ArrowDownCircleIcon, ArrowUpCircleIcon } from '@heroicons/react/24/solid';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const productSectionRef = useRef(null);

  const limit = 3; 

  // 1. Load lần đầu
  useEffect(() => {
    const fetchInitialProducts = async () => {
      setIsLoading(true);
      try {
        const response = await getProducts(1, limit);
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setPage(1); 
      } catch (error) {
        console.error("Lỗi tải hàng:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  // 2. Load thêm (cộng dồn)
  const handleLoadMore = async () => {
    if (page >= totalPages) return;

    setIsLoadingMore(true);
    try {
      const nextPage = page + 1;
      const response = await getProducts(nextPage, limit);
      
      setProducts(prev => [...prev, ...response.data.products]);
      setPage(nextPage);
    } catch (error) {
      console.error("Lỗi tải thêm:", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // 3. Thu gọn
  const handleCollapse = () => {
    // Giữ lại 3 sản phẩm đầu tiên
    const initialProducts = products.slice(0, limit);
    setProducts(initialProducts);
    setPage(1);

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
                {isLoadingMore && [...Array(limit)].map((_, i) => <ProductSkeleton key={`more-${i}`} />)}
              </div>

              {/* --- KHU VỰC NÚT BẤM --- */}
              <div className="flex justify-center mt-12 gap-4">
                
                {/* Nút XEM THÊM */}
                {!isLoading && !isLoadingMore && page < totalPages && (
                  <button
                    onClick={handleLoadMore}
                    className="flex items-center gap-2 px-6 py-3 bg-white border border-blue-600 text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-sm hover:shadow-md"
                  >
                    <ArrowDownCircleIcon className="w-6 h-6" />
                    Xem thêm sản phẩm
                  </button>
                )}

                {/* Nút THU GỌN */}
                {products.length > limit && !isLoadingMore && (
                  <button
                    onClick={handleCollapse}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-bold hover:bg-gray-200 transition-all"
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