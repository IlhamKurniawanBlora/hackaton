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
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-green-900 via-green-600 to-green-900">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        {/* Geometric Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="border border-emerald-400/20 rounded-lg"
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          />
          <div 
            className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-orange-400/10 to-amber-400/10 rounded-full blur-3xl"
            style={{
              transform: `translateY(${scrollY * 0.15}px)`,
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container mx-auto text-center px-6 max-w-4xl">
          {/* Logo */}
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-2xl mb-6 transform rotate-12 hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <img
                src="/icon.png"
                alt="AgriNuklir Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Agri
              </span>
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Nuklir
              </span>
            </h1>
            
            {/* Subtitle */}
            <div className="space-y-3 mb-12">
              <p className="text-2xl md:text-3xl font-semibold text-white/90">
                Platform Edukasi Nuklir Pertanian
              </p>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Revolusi teknologi nuklir untuk masa depan pertanian yang berkelanjutan
              </p>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <button 
              onClick={() => window.location.href = '/modules'}
              className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-full text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/25 min-w-[200px]"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
                <span>Mulai Belajar</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </button>
            
            <button 
              onClick={() => window.location.href = '/about'}
              className="group px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-full text-lg border-2 border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm min-w-[200px]"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Pelajari Lebih Lanjut</span>
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        /* Smooth text gradient animation */
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .bg-gradient-to-r {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;