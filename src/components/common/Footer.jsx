import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-t from-slate-900 via-emerald-900 to-green-800 border-t-2 border-orange-400">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
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
              <h3 className="text-xl font-bold">
                <span className="text-orange-300">Agri</span>
                <span className="text-emerald-300">Nuklir</span>
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Platform pembelajaran teknologi nuklir untuk pertanian berkelanjutan dan ketahanan pangan Indonesia. Dikembangkan oleh mahasiswa dari Universitas Nahdlatul Ulama Yogyakarta.
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-orange-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
              Menu Utama
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <a href="/" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform">Beranda</a>
              <a href="/modules" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform">Modul</a>
              <a href="/simulations" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform">Simulasi</a>
              <a href="/" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform">Chatbot</a>
              <a href="/forum" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform">Forum</a>
              <a href="/profile" className="text-gray-300 hover:text-orange-300 transition-colors duration-300 text-sm py-1 hover:translate-x-1 transform">Sertifikat</a>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg className="w-5 h-5 text-emerald-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
              Hubungi Kami
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <a href="mailto:ilhamkurniawanjateng@gmail.com" className="text-gray-300 hover:text-green-300 transition-colors text-sm">
                  info@agrinuklir.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                </div>
                <span className="text-gray-300 text-sm">+62 877 6129 6676</span>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div className="text-gray-300 text-sm">
                  <div>Daerah Istimewa Yogyakarta, Indonesia</div>
                  <div className="text-xs text-gray-400 mt-1">Universitas Nahdlatul Ulama Yogyakarta</div>
                </div>
              </div>
            </div>

            {/* Support Links */}
            <div className="mt-6 pt-4 border-t border-gray-600">
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="/about" className="text-gray-400 hover:text-emerald-300 transition-colors">Tentang</a>
                <a href="/" className="text-gray-400 hover:text-emerald-300 transition-colors">FAQ</a>
                <a href="/" className="text-gray-400 hover:text-emerald-300 transition-colors">Kontak</a>
                <a 
                  href="https://www.brin.go.id/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  BRIN
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()}{" "}
              <span className="text-orange-300">Agri</span>
              <span className="text-emerald-300">Nuklir</span> Platform. Semua hak dilindungi.
            </p>
            <div className="text-xs text-gray-500">
              Powered by:{" "}
              <a
                href="https://kairav-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:underline"
              >
                Universitas Nahdlatul Ulama Yogyakarta
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;