// src/components/common/Layout.jsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="layout-container"> {/* Hanya satu kelas kustom */}
      <Header />
      <main className="main-content"> {/* Kelas untuk konten utama */}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;