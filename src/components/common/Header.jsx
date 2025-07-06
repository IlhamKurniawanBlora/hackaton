// src/components/common/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '~/contexts/auth';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, profile, signOut, isAuthenticated, getUserDisplayName, getUserAvatarUrl } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      closeUserMenu();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProfileClick = () => {
    navigate('/profile');
    closeUserMenu();
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        closeUserMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="header bg-gradient-to-r from-emerald-800 via-green-700 to-teal-800 shadow-lg border-b-2 border-orange-400">
      <div className="header-inner container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Nama Platform */}
        <Link to="/" className="header-logo flex items-center space-x-3 hover:opacity-90 transition-opacity" onClick={closeMenu}>
          <div className="logo-container relative">
            <img 
              src="icon.png" 
              alt="AgriNuklir Icon" 
              className="header-logo-icon w-10 h-10 rounded-full border-2 border-orange-300 shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
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

        {/* Right Side - Auth & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Auth Section - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              /* User Menu */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-orange-300 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    {getUserAvatarUrl() ? (
                      <img 
                        src={getUserAvatarUrl()} 
                        alt="User Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-sm font-semibold">
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                  <span className="text-white text-sm font-medium hidden xl:block">
                    {getUserDisplayName()}
                  </span>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                      </svg>
                      <span>Profil</span>
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                      </svg>
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login/Register Buttons */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 text-sm font-medium"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-all duration-300 text-sm font-medium shadow-md"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
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
        </div>

        {/* Navigasi Desktop */}
        <nav className="header-nav hidden lg:block absolute left-1/2 transform -translate-x-1/2">
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
              <Link to="/forum" className="nav-link px-4 py-2 text-white hover:text-orange-300 hover:bg-green-600 rounded-md transition-all duration-300 flex items-center space-x-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <span>Forum</span>
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
                  src="icon.png" 
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

            {/* User Info Section - Mobile */}
            {isAuthenticated && (
              <div className="p-4 border-b border-green-600 bg-green-800/50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-orange-300 overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    {getUserAvatarUrl() ? (
                      <img 
                        src={getUserAvatarUrl()} 
                        alt="User Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-lg font-semibold">
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{getUserDisplayName()}</p>
                    <p className="text-emerald-200 text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Links */}
            <nav className="p-4 flex-1">
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
                
                {/* User Actions - Mobile */}
                {isAuthenticated ? (
                  <>
                    <li className="pt-4 border-t border-green-600 mt-4">
                      <Link 
                        to="/profile" 
                        className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                        onClick={closeMenu}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                        </svg>
                        <span>Profil</span>
                      </Link>
                    </li>
                    <li>
                      <button 
                        onClick={() => {
                          handleSignOut();
                          closeMenu();
                        }}
                        className="mobile-nav-link w-full flex items-center space-x-3 p-3 text-red-300 hover:text-red-200 hover:bg-red-900/30 rounded-lg transition-all duration-300" 
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/>
                        </svg>
                        <span>Keluar</span>
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-4 border-t border-green-600 mt-4">
                      <Link 
                        to="/login" 
                        className="mobile-nav-link flex items-center space-x-3 p-3 text-white hover:text-orange-300 hover:bg-green-700 rounded-lg transition-all duration-300" 
                        onClick={closeMenu}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-2 0V4H4v12h12v-2a1 1 0 012 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1V3z" clipRule="evenodd"/>
                          <path fillRule="evenodd" d="M13.293 7.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                        <span>Masuk</span>
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/register" 
                        className="mobile-nav-link flex items-center space-x-3 p-3 text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-all duration-300" 
                        onClick={closeMenu}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                        </svg>
                        <span>Daftar</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            
            {/* Footer Mobile Menu */}
            <div className="p-4 border-t border-green-600 text-center">
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