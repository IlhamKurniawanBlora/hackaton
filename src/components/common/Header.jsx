// src/components/common/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// Import ikon dari @heroicons/react/24/outline jika sudah diinstal
// import { BeakerIcon } from '@heroicons/react/24/solid'; // Contoh ikon solid

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-inner container">
        {/* Logo/Nama Platform */}
        <Link to="/" className="header-logo" onClick={closeMenu}>
          {/* <BeakerIcon className="header-logo-icon" /> */} {/* Contoh ikon untuk logo */}
          AgriNuklir Platform
        </Link>

        {/* Tombol Hamburger untuk Mobile */}
        <div className="header-mobile-toggle show-mobile"> {/* show-mobile untuk tampil di mobile */}
          <button onClick={toggleMenu} className="hamburger-button">
            {isMenuOpen ? (
              <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="hamburger-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Navigasi Desktop */}
        <nav className="header-nav hidden-mobile"> {/* hidden-mobile untuk sembunyi di mobile */}
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Beranda</Link></li>
            <li><Link to="/modules" className="nav-link">Modul</Link></li>
            <li><Link to="/simulations" className="nav-link">Simulasi</Link></li>
            <li><Link to="/chatbot" className="nav-link">Chatbot</Link></li>
            <li><Link to="/forum" className="nav-link">Forum</Link></li>
            <li><Link to="/certificates" className="nav-link">Sertifikat</Link></li>
          </ul>
        </nav>
      </div>

      {/* Menu Navigasi Mobile (overlay/drawer) */}
      {isMenuOpen && (
        <div className="mobile-menu show-mobile animate-fade-in">
          <nav>
            <ul className="mobile-nav-list">
              <li><Link to="/" className="mobile-nav-link" onClick={closeMenu}>Beranda</Link></li>
              <li><Link to="/modules" className="mobile-nav-link" onClick={closeMenu}>Modul</Link></li>
              <li><Link to="/simulations" className="mobile-nav-link" onClick={closeMenu}>Simulasi</Link></li>
              <li><Link to="/chatbot" className="mobile-nav-link" onClick={closeMenu}>Chatbot</Link></li>
              <li><Link to="/forum" className="mobile-nav-link" onClick={closeMenu}>Forum</Link></li>
              <li><Link to="/certificates" className="mobile-nav-link" onClick={closeMenu}>Sertifikat</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;