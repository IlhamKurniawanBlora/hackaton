// src/components/common/Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '~/utils/auth';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { user, session } = await authService.getCurrentUser();
        setUser(user);
        setSession(session);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUser(session?.user || null);
        setSession(session);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setSession(null);
      } else if (event === 'TOKEN_REFRESHED') {
        setUser(session?.user || null);
        setSession(session);
      }
    });

    return () => unsubscribe();
  }, []);

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
      const result = await authService.signOut();
      if (result.success) {
        closeUserMenu();
        navigate('/');
      } else {
        console.error('Sign out error:', result.error);
      }
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

  // Helper functions
  const isAuthenticated = !!user && !!session;

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.full_name || 
           user.user_metadata?.name || 
           user.email?.split('@')[0] || 
           'User';
  };

  const getUserAvatarUrl = () => {
    if (!user) return null;
    return user.user_metadata?.avatar_url || 
           user.user_metadata?.picture || 
           null;
  };

  const getUserInitials = () => {
    const name = getUserDisplayName();
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Show loading state
  if (isLoading) {
    return (
      <header className="header fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-xl shadow-lg border border-gray-100 animate-pulse"></div>
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-32 bg-gray-200 rounded mt-1 animate-pulse"></div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block h-10 w-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="md:hidden w-10 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="header fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity" onClick={closeMenu}>
          <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100">
            <img
              src="/unu/icon.png"
              alt="UNU Jogja Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100">
            <img
              src="/icon.png"
              alt="AgriNuklir Logo"
              className="w-8 h-8 object-contain"
            />
          </div>
          <div className="text-gray-800">
            <div className="font-bold text-lg">AgriNuklir</div>
            <div className="text-xs text-gray-500">Platform Edukasi Nuklir</div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Beranda
          </Link>
          <Link to="/modules" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Modul
          </Link>
          <Link to="/simulations" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Simulasi
          </Link>
          <Link to="/forum" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
            Forum
          </Link>
        </nav>
        
        {/* Right Side - Auth & Mobile Menu */}
        <div className="flex items-center space-x-4">
          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              /* User Menu */
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-green-500 overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
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
                  <span className="text-gray-700 text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                  <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
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
                  className="px-6 py-2 text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMenu}
            className="md:hidden w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={closeMenu}
          ></div>
          
          {/* Mobile Menu Panel */}
          <div className="mobile-menu fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out">
            {/* Header Mobile Menu */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100">
                  <img
                    src="/unu/icon.png"
                    alt="UNU Jogja Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-100">
                  <img
                    src="/icon.png"
                    alt="AgriNuklir Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="text-gray-800">
                  <div className="font-bold text-base">AgriNuklir</div>
                  <div className="text-xs text-gray-500">Platform Edukasi Nuklir</div>
                </div>
              </div>

              <button 
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* User Info Section - Mobile */}
            {isAuthenticated && (
              <div className="p-6 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full border-2 border-green-500 overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
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
                    <p className="text-gray-800 font-medium">{getUserDisplayName()}</p>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Links */}
            <nav className="p-6 flex-1">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center space-x-3 p-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium" 
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
                    className="flex items-center space-x-3 p-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium" 
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
                    className="flex items-center space-x-3 p-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium" 
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
                    className="flex items-center space-x-3 p-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium" 
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
                    <li className="pt-4 border-t border-gray-200 mt-4">
                      <Link 
                        to="/profile" 
                        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium" 
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
                        className="w-full flex items-center space-x-3 p-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 font-medium" 
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
                    <li className="pt-4 border-t border-gray-200 mt-4">
                      <Link 
                        to="/login" 
                        className="flex items-center space-x-3 p-3 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-all duration-300 font-medium" 
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
                        className="flex items-center space-x-3 p-3 text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-300 font-medium" 
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
            <div className="p-6 border-t border-gray-200 text-center">
              <p className="text-gray-600 text-sm font-medium">
                AgriNuklir Platform
              </p>
              <p className="text-gray-500 text-xs">Platform Edukasi Nuklir Pertanian</p>
                                <div className="text-xs text-gray-500">Powered by : <a href="https://kairav-portfolio.vercel.app/">Universitas Nahdlatul Ulama Yogyakarta</a></div>

            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;