// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../../src/components/home/HeroSection';
import AboutSection from '../../src/components/home/AboutSection';
import FeatureGrid from '../../src/components/home/FeatureGrid';
import AgriNuclearChatbot from '../../src/components/chatbot/AgriNuclearChatbot';

function HomePage() {
  return (
    <main className="homepage min-h-screen relative">
      {/* Orange shadow from bottom to top */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(0deg, rgba(251,146,60,0.25) 0%, rgba(251,146,60,0) 100%)",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* About Section */}
      <section className="about-section py-16 bg-gradient-to-br from-emerald-50 to-green-50">
        <div className="container mx-auto px-4">
          <AboutSection />
        </div>
      </section>
      
      {/* Features Section */}
      <section 
        className="features-section bg-white/90 backdrop-blur-md shadow-xl border-y border-emerald-100/50"
        aria-labelledby="features-heading"
      >
          <FeatureGrid />
      </section>

      {/* Call to Action Section */}
      <section className="cta-section py-16 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Siap untuk Memulai?
            </h2>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Bergabunglah dengan ribuan pengguna yang sudah merasakan manfaatnya
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Mulai Sekarang
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-emerald-600 transform hover:scale-105 transition-all duration-200"
              >
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Chatbot */}
      <AgriNuclearChatbot />
    </main>
  );
}

export default HomePage;