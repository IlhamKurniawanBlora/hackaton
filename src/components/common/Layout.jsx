// src/components/common/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="layout-container min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex flex-col">
      <Header />
      <main className="main-content flex-1 relative">
        {/* Background Pattern/Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full blur-2xl"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-green-400 to-teal-500 rounded-full blur-2xl"></div>
        </div>
        
        {/* Content Wrapper */}
        <div className="relative z-10 container mx-auto px-4 py-6">
          <div className="content-wrapper bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-emerald-100/50 min-h-[calc(100vh-200px)] p-6">
            {/* Content Border Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-t-xl"></div>
            <div className="absolute top-1 left-0 w-20 h-1 bg-gradient-to-r from-orange-400 to-orange-500 rounded-tr-xl"></div>
            
            {/* Main Content */}
            <div className="content-inner pt-4">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;