import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const HeroBanner = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-700 to-indigo-800 text-white mb-12 overflow-hidden shadow-2xl">
      {/* Background decor effects */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-500 rounded-full mix-blend-overlay blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10 flex flex-col items-center text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/30 border border-blue-400/50 text-sm font-semibold tracking-wider mb-4 backdrop-blur-sm">
          NEW ARRIVALS 2025
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg">
          Laptop Gaming <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200">
            Hiệu Năng Đỉnh Cao
          </span>
        </h1>
        <p className="text-base md:text-lg text-blue-100 max-w-xl mb-8 font-light">
          Chiến game mượt mà, đồ họa sắc nét. Ưu đãi lên đến 30% cho các dòng máy RTX 40 Series.
        </p>
        <button className="group px-8 py-3 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-50 hover:shadow-blue-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
          Mua ngay
          <ChevronRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default HeroBanner;