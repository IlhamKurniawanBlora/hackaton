// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer bg-gradient-to-t from-slate-900 via-emerald-900 to-green-800 border-t-2 border-orange-400">
      <div className="footer-inner container mx-auto px-4 py-12">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Bagian 1: Informasi Platform */}
          <div className="footer-col footer-info lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="../../../src/assets/icon.png" 
                alt="AgriNuklir Icon" 
                className="w-8 h-8 rounded-full border-2 border-orange-300"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center border-2 border-orange-300 hidden">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </div>
              <h3 className="footer-logo-title text-xl font-bold">
                <span className="text-orange-300">Agri</span>
                <span className="text-emerald-300">Nuklir</span>
              </h3>
            </div>
            <p className="footer-description text-gray-300 text-sm leading-relaxed mb-6">
              Inovasi pertanian masa depan dengan pemanfaatan teknologi nuklir untuk ketahanan pangan yang berkelanjutan.
            </p>
            <div className="social-icons flex space-x-3">
              <a href="#" className="social-icon p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="social-icon p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
                </svg>
              </a>
              <a href="#" className="social-icon p-2 bg-green-700 hover:bg-orange-500 rounded-full transition-colors duration-300">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Bagian 2: Tautan Cepat */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              Tautan Cepat
            </h3>
            <ul className="footer-list space-y-2">
              <li><Link to="/" className="footer-link text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm">Beranda</Link></li>
              <li><Link to="/modules" className="footer-link text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm">Modul Edukasi</Link></li>
              <li><Link to="/simulations" className="footer-link text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm">Simulasi Interaktif</Link></li>
              <li><Link to="/chatbot" className="footer-link text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm">Chatbot AI</Link></li>
              <li><Link to="/forum" className="footer-link text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm">Forum Komunitas</Link></li>
              <li><Link to="/certificates" className="footer-link text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm">Sertifikat</Link></li>
            </ul>
          </div>

          {/* Bagian 3: Sumber Daya & Bantuan */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
              </svg>
              Sumber Daya
            </h3>
            <ul className="footer-list space-y-2">
              <li><Link to="/about" className="footer-link text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm">Tentang Kami</Link></li>
              <li><Link to="/faq" className="footer-link text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="footer-link text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm">Kebijakan Privasi</Link></li>
              <li><Link to="/contact" className="footer-link text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm">Hubungi Kami</Link></li>
              <li>
                <a 
                  href="https://www.brin.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-link text-gray-300 hover:text-emerald-300 transition-colors duration-300 text-sm flex items-center"
                >
                  BRIN 
                  <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Bagian 4: Informasi Kontak */}
          <div className="footer-col">
            <h3 className="footer-heading text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Kontak
            </h3>
            <div className="space-y-3">
              <p className="footer-contact-item flex items-start space-x-2 text-sm">
                <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                <span className="text-gray-300">
                  <a href="mailto:info@agrinuklir.com" className="hover:text-blue-300 transition-colors">info@agrinuklir.com</a>
                </span>
              </p>
              <p className="footer-contact-item flex items-start space-x-2 text-sm">
                <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                <span className="text-gray-300">+62 123 4567 890</span>
              </p>
              <p className="footer-contact-item flex items-start space-x-2 text-sm">
                <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                <span className="text-gray-300">Jl. Inovasi Pertanian No. 123<br />Jakarta, Indonesia</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bagian Hak Cipta */}
        <div className="footer-copyright border-t border-gray-600 pt-6 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} <span className="text-orange-300">Agri</span><span className="text-emerald-300">Nuklir</span> Platform. Hak Cipta Dilindungi Undang-Undang.
            </p>
            <p className="footer-made-with text-gray-400 text-sm flex items-center">
              Dibuat dengan 
              <svg className="w-4 h-4 text-red-500 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
              untuk kemajuan pertanian Indonesia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;