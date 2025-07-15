
import React, { useState, useEffect } from 'react';

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger animations after component mounts
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-24">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        {/* Left side dot pattern */}
        <div className="absolute left-8 top-1/2 transform -translate-y-1/2 opacity-20">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(32)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Right side dot pattern */}
        <div className="absolute right-8 top-1/4 opacity-20">
          <div className="grid grid-cols-6 gap-2">
            {[...Array(48)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.05}s`,
                  animationDuration: '2.5s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating elements for depth */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-r from-green-100 to-yellow-100 rounded-full opacity-30 animate-float"
              style={{
                width: `${40 + Math.random() * 60}px`,
                height: `${40 + Math.random() * 60}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Atomic symbol decorations */}
        <div className="absolute top-20 left-20 opacity-10">
          <div className="w-32 h-32 relative">
            <div className="absolute inset-0 border-2 border-green-400 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-2 border-2 border-yellow-400 rounded-full animate-spin-reverse"></div>
            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        <div className="absolute bottom-32 right-32 opacity-10">
          <div className="w-24 h-24 relative">
            <div className="absolute inset-0 border-2 border-yellow-400 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-1 border-2 border-green-400 rounded-full animate-spin-reverse"></div>
            <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            
            {/* Main Title with staggered animation */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-black leading-tight">
                <span 
                  className={`inline-block text-green-600 transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.2s' }}
                >
                  Meet
                </span>
                <br />
                <span 
                  className={`inline-block text-green-600 transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.4s' }}
                >
                  Agri
                </span>
                <span 
                  className={`inline-block text-yellow-500 transform transition-all duration-1000 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: '0.6s' }}
                >
                  Nuklir
                </span>
              </h1>
            </div>
            
            {/* Subtitle */}
            <div 
              className={`mb-8 transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '0.8s' }}
            >
              <p className="text-gray-700 text-xl md:text-2xl font-medium max-w-3xl mx-auto">
                Platform Pembelajaran Teknologi Nuklir untuk Pertanian Modern
              </p>
            </div>

            {/* Description */}
            <div 
              className={`mb-10 transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '1s' }}
            >
              <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                Jelajahi dunia teknologi nuklir yang revolusioner dalam bidang pertanian. 
                Pelajari bagaimana radiasi ionisasi, mutasi tanaman, dan teknik nuklir lainnya 
                dapat meningkatkan produktivitas dan kualitas hasil pertanian Indonesia.
              </p>
            </div>
<img 
  src="/icon.png"
  alt="Agri Nuklir Logo"
  className={`mx-auto transition-transform duration-500 ${isLoaded ? 'animate-gentle-pulse' : 'opacity-0'} w-24 md:w-28 lg:w-32 xl:w-36 h-auto max-w-full`}
  onLoad={() => setIsLoaded(true)}
  onError={(e) => {
    e.target.style.display = 'none'; // Hide image if it fails to load
  }}
/>

          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02); }
        }
        
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-gentle-bounce {
          animation: gentle-bounce 4s ease-in-out infinite;
        }
        
        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 8s linear infinite;
        }
        
        /* Scroll-based parallax effect */
        @media (prefers-reduced-motion: no-preference) {
          .parallax-slow {
            transform: translateY(${scrollY * 0.3}px);
          }
          
          .parallax-fast {
            transform: translateY(${scrollY * 0.6}px);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .animate-float {
            animation-duration: 10s;
          }
          
          .animate-gentle-bounce {
            animation-duration: 5s;
          }
        }
      `}</style>
    </section>
  );
}

export default HeroSection;