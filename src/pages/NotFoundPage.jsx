// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-page min-h-content text-center">
      <h1 className="not-found-title animate-bounce">404</h1>
      <p className="not-found-subtitle">Halaman Tidak Ditemukan</p>
      <p className="not-found-text">
        Maaf, halaman yang Anda cari tidak ada. Mungkin telah dihapus atau Anda salah mengetik alamat.
      </p>
      <Link
        to="/"
        className="button button-primary"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;