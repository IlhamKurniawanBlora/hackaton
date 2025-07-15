import React from 'react';
import { Home, Search, ArrowLeft, Leaf, Atom, AlertTriangle, Zap } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 flex items-center justify-center p-6 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Animated 404 Section */}
        <div className="relative mb-12">
          {/* Background decoration */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 rounded-full bg-gradient-to-r from-green-400 to-green-400 blur-3xl animate-pulse"></div>
          </div>
          
          {/* Main 404 Display */}
          <div className="relative z-10">
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="relative">
                <Leaf className="w-24 h-24 text-green-500 animate-bounce" style={{ animationDelay: '0s' }} />
                <Atom className="w-12 h-12 text-green-500 absolute -top-2 -right-2 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              <div className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 bg-clip-text text-transparent animate-pulse">
                404
              </div>
              <div className="relative">
                <AlertTriangle className="w-24 h-24 text-amber-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                <Zap className="w-8 h-8 text-yellow-400 absolute -top-1 -right-1 animate-ping" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-green-100">
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Halaman Tidak Ditemukan
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Oops! Sepertinya halaman yang Anda cari telah menguap seperti isotop radioaktif. 
              Mungkin halaman ini sedang mengalami peluruhan atau berada di dimensi paralel.
            </p>
            <p className="text-lg text-gray-500">
              Jangan khawatir, tim AgriNuklir siap membantu Anda menemukan jalan kembali ke laboratorium virtual kami!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => window.location.href = '/'}
              className="group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
            >
              <Home className="w-5 h-5 group-hover:animate-bounce" />
              <span>Kembali ke Beranda</span>
            </button>
            
            <button
              onClick={() => window.location.href = '/research'}
              className="group bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
            >
              <Search className="w-5 h-5 group-hover:animate-pulse" />
              <span>Jelajahi Penelitian</span>
            </button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-6">Atau kunjungi halaman populer kami:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { to: "/about", label: "Tentang Kami", icon: "📖" },
                { to: "/technology", label: "Teknologi", icon: "⚛️" },
                { to: "/research", label: "Penelitian", icon: "🔬" },
                { to: "/contact", label: "Kontak", icon: "📞" }
              ].map((link, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = link.to}
                  className="group bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-50 p-4 rounded-xl border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-md"
                >
                  <div className="text-2xl mb-2 group-hover:animate-bounce">{link.icon}</div>
                  <div className="text-sm font-medium text-gray-700 group-hover:text-green-700">
                    {link.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fun Nuclear Facts */}
        <div className="mt-12 bg-gradient-to-r from-green-100 to-green-100 rounded-2xl p-8 border border-green-200">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            <Atom className="w-6 h-6 text-green-600" />
            <span>Fakta Menarik AgriNuklir</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl mb-2">🌱</div>
              <p className="text-gray-700">
                <strong>Mutasi Tanaman:</strong> Teknologi nuklir dapat menciptakan varietas tanaman baru yang lebih tahan terhadap hama dan penyakit.
              </p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl mb-2">🔬</div>
              <p className="text-gray-700">
                <strong>Sterilisasi Serangga:</strong> Teknik iradiasi membantu mengendalikan populasi hama secara ramah lingkungan.
              </p>
            </div>
            <div className="text-center p-4 bg-white/50 rounded-xl">
              <div className="text-2xl mb-2">📊</div>
              <p className="text-gray-700">
                <strong>Peningkatan Hasil:</strong> Teknologi nuklir dapat meningkatkan produktivitas pertanian hingga 30%.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Jika masalah berlanjut, silakan hubungi tim teknis kami di 
            <a href="mailto:support@agrinuklir.com" className="text-green-600 hover:text-green-700 font-medium ml-1">
              support@agrinuklir.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;