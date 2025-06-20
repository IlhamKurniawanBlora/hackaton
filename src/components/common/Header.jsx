// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 shadow-lg border-b-2 border-orange-400">
      <div className="header-inner container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Nama Platform */}
        <Link to="/" className="header-logo flex items-center space-x-3 hover:opacity-90 transition-opacity" onClick={closeMenu}>
          <div className="logo-container relative">
            <img 
              src="../../../src/assets/icon.png" 
              alt="AgriNuklir Icon" 
              className="header-logo-icon w-10 h-10 rounded-full border-2 border-orange-300 shadow-md"
              onError={(e) => {
                // Fallback jika gambar tidak ditemukan
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback icon menggunakan SVG */}
            <div className="fallback-icon w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-orange-300 shadow-md hidden">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
          </div>
          <div className="logo-text">
            <h1 className="text-xl font-bold text-white">
              <span className="text-orange-300">Agri</span>
              <span className="text-emerald-300">Nuklir</span>
            </h1>
            <p className="text-xs text-emerald-200 hidden sm:block">Platform Edukasi Nuklir Pertanian</p>
          </div>
        </Link>

        {/* Tombol Hamburger untuk Mobile */}
        <div className="header-mobile-toggle lg:hidden">
          <button 
            onClick={toggleMenu} 
            className="hamburger-button p-2 rounded-md hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            {isMenuOpen ? (
              <svg className="hamburger-icon w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="hamburger-icon w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigasi Desktop */}
        <nav className="header-nav hidden lg:block">
          <ul className="nav-list flex space-x-1">
            <li>
              <Link to="/" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                </svg>
                <span>Beranda</span>
              </Link>
            </li>
            <li>
              <Link to="/modules" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Modul</span>
              </Link>
            </li>
            <li>
              <Link to="/simulations" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                </svg>
                <span>Simulasi</span>
              </Link>
            </li>
            <li>
              <Link to="/chatbot" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
                <span>Chatbot</span>
              </Link>
            </li>
            <li>
              <Link to="/forum" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <span>Forum</span>
              </Link>
            </li>
            <li>
              <Link to="/certificates" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Sertifikat</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Menu Navigasi Mobile (overlay/drawer) */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeMenu}
          ></div>
          
          {/* Mobile Menu */}
          <div className="mobile-menu fixed top-0 right-0 w-80 h-full bg-gradient-to-b from-emerald-800 to-green-900 shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out">
            {/* Header Mobile Menu */}
            <div className="p-4 border-b border-green-600 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img 
                  src="../../../src/assets/icon.png" 
                  alt="AgriNuklir Icon" 
                  className="w-8 h-8 rounded-full border border-orange-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border border-orange-300 hidden">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <span className="text-white font-semibold">Menu</span>
              </div>
              <button 
                onClick={closeMenu}
                className="p-1 rounded-md hover:bg-green-600 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            {/* Navigation Links */}
            <nav className="p-4">
              <ul className="mobile-nav-list space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                    </svg>
                    <span>Beranda</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/modules" 
                    className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Modul</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/simulations" 
                    className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                    </svg>
                    <span>Simulasi</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/chatbot" 
                    className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                    </svg>
                    <span>Chatbot</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/forum" 
                    className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                    </svg>
                    <span>Forum</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/certificates" 
                    className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                    onClick={closeMenu}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                    <span>Sertifikat</span>
                  </Link>
                </li>
              </ul>
            </nav>
            
            {/* Footer Mobile Menu */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-emerald-200 text-sm">
                <span className="text-orange-300">Agri</span>
                <span className="text-emerald-300">Nuklir</span> Platform
              </p>
              <p className="text-emerald-300 text-xs">Edukasi Nuklir Pertanian</p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;