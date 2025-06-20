import React, { useState, useEffect } from 'react';

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0">
        {/* Layer 1 - Far Background (slowest) */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        >
          {/* Nuclear particles animation */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-orange-400 rounded-full opacity-70 animate-pulse`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Layer 2 - Mid Background */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.4}px)`,
          }}
        >
          {/* Agricultural field silhouettes */}
          <svg className="absolute bottom-0 w-full h-64 text-green-700 opacity-30" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path d="M0,200 Q300,150 600,180 T1200,160 L1200,300 L0,300 Z" fill="currentColor"/>
          </svg>
          <svg className="absolute bottom-0 w-full h-48 text-emerald-600 opacity-40" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,120 Q400,80 800,100 T1200,90 L1200,200 L0,200 Z" fill="currentColor"/>
          </svg>
        </div>

        {/* Layer 3 - Foreground (fastest) */}
        <div 
          className="absolute inset-0"
          style={{
            transform: `translateY(${scrollY * 0.6}px)`,
          }}
        >
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-orange-400/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
          <div className="absolute top-32 right-20 w-12 h-12 bg-emerald-400/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-teal-400/20 rounded-full blur-md animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-14 h-14 bg-green-400/20 rounded-full blur-sm animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          {/* Logo/Icon */}
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-4 border-orange-300 shadow-2xl mb-4 overflow-hidden">
              <img
                src="../../../src/assets/icon.png"
                alt="AgriNuklir Logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-6 animate-fade-in-up">
            <span className="block text-orange-300 drop-shadow-2xl">Agri</span>
            <span className="block text-emerald-300 drop-shadow-2xl">Nuklir</span>
          </h1>

          {/* Subtitle */}
          <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-2 drop-shadow-lg">
              Platform Edukasi Nuklir Pertanian
            </p>
            <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto drop-shadow-md">
              Jelajahi revolusi teknologi nuklir dalam pertanian modern untuk masa depan pangan yang berkelanjutan
            </p>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-full text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-orange-500/25 border-2 border-orange-400">
              <span className="relative z-10 flex items-center space-x-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                <span>Mulai Belajar</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button className="group px-8 py-4 bg-transparent hover:bg-emerald-600/20 text-white font-semibold rounded-full text-lg border-2 border-emerald-400 hover:border-emerald-300 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              <span className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Pelajari Lebih Lanjut</span>
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center text-white/70">
              <span className="text-sm mb-2">Scroll untuk menjelajahi</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;