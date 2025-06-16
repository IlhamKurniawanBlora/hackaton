// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FeatureGrid from '../components/home/FeatureGrid';

function HomePage() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url('/assets/images/hero-agri-nuklir.jpg')` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-center animate-fade-in-up">
          <h1 className="hero-title">
            AgriNuklir: Inovasi Pertanian Masa Depan untuk Ketahanan Pangan
          </h1>
          <p className="hero-subtitle" style={{ animationDelay: '0.2s' }}>
            Jelajahi potensi teknologi nuklir dalam meningkatkan produktivitas dan kualitas pertanian Indonesia.
          </p>
          <Link
            to="/modules"
            className="button button-primary hero-button"
            style={{ animationDelay: '0.4s' }}
          >
            Mulai Belajar Sekarang
          </Link>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="section-padded section-bg-light">
        <h2 className="section-title">Fitur Unggulan Kami</h2>
        <FeatureGrid />
      </section>

      {/* About Section (singkat) */}
      <section className="section-padded section-bg-white">
        <div className="container text-center">
          <h2 className="section-subtitle">Mengenal AgriNuklir Lebih Dekat</h2>
          <p className="text-content">
            AgriNuklir Platform adalah inisiatif edukasi yang berdedikasi untuk menyebarkan pemahaman tentang peran krusial teknologi nuklir dalam memajukan sektor pertanian. Dari peningkatan varietas tanaman hingga pengawetan pangan, kami hadir untuk membuka wawasan Anda.
          </p>
          <Link
            to="/about"
            className="text-link-primary"
          >
            Pelajari Lebih Lanjut
            <svg className="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* Call to Action (CTA) Section */}
      <section className="section-padded section-cta">
        <div className="container text-center">
          <h2 className="cta-title">Siap Memulai Petualangan Belajarmu?</h2>
          <p className="cta-subtitle">
            Daftar sekarang dan akses modul edukasi, simulasi interaktif, dan forum diskusi kami!
          </p>
          <Link
            to="/modules"
            className="button button-secondary cta-button"
          >
            Mulai Sekarang!
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;