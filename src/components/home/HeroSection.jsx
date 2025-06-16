// src/components/home/HeroSection.jsx
import React from 'react';

function HeroSection() {
  return (
    <section
      className="relative bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{ backgroundImage: "url('/assets/images/hero-bg.jpg')" }}
    >
      {/* Overlay untuk membuat teks lebih mudah dibaca */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="container mx-auto text-center z-10 p-4">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
          AgriNuklir: Inovasi Pertanian Masa Depan
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
          Jelajahi bagaimana teknologi nuklir merevolusi pertanian untuk ketahanan pangan yang berkelanjutan.
        </p>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transform transition duration-300 hover:scale-105 animate-fade-in-up-delay">
          Mulai Belajar Sekarang!
        </button>
      </div>
    </section>
  );
}

export default HeroSection;