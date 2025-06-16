// src/pages/SimulationPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ClockIcon } from '@heroicons/react/24/outline'; // Pastikan ClockIcon diimpor

// Impor data simulasi yang sama dengan SimulationDetailPage
// Pastikan path-nya sesuai jika kamu menempatkannya di file terpisah (misal: ../data/simulations/simulationsData)
const simulationsData = [ // Ini harus SAMA PERSIS dengan array di SimulationDetailPage
  {
    id: 'sim-iradiasi-benih-optimal',
    title: 'Simulasi Iradiasi Benih Optimal',
    description: 'Eksperimen dengan dosis radiasi berbeda untuk melihat efek pada pertumbuhan dan hasil benih tanaman X.',
    duration: '30 Menit', // Tambahkan duration jika belum ada di data aslimu
    imageUrl: '/assets/images/simulation-1.jpg' // Tambahkan imageUrl
  },
  {
    id: 'sim-pengawetan-makanan-stroberi',
    title: 'Simulasi Pengawetan Makanan (Stroberi)',
    description: 'Amati efek iradiasi pada masa simpan stroberi dibandingkan dengan metode konvensional.',
    duration: '45 Menit',
    imageUrl: '/assets/images/simulation-2.jpg'
  },
  {
    id: 'sim-analisis-penyerapan-hara',
    title: 'Analisis Penyerapan Hara Tanah dengan Isotop',
    description: 'Pahami bagaimana tanaman menyerap nutrisi dari tanah menggunakan pelacak isotop.',
    duration: '60 Menit',
    imageUrl: '/assets/images/simulation-3.jpg'
  },
  {
    id: 'sim-manajemen-limbah-radioaktif',
    title: 'Manajemen Limbah Radioaktif Pertanian',
    description: 'Pelajari proses penanganan dan penyimpanan limbah radioaktif dari aplikasi pertanian.',
    duration: '50 Menit',
    imageUrl: '/assets/images/simulation-4.jpg'
  },
];


function SimulationPage() {
  return (
    <div className="container py-8 min-h-content">
      <h1 className="page-title">Simulasi Interaktif AgriNuklir</h1>

      <div className="module-grid-layout"> {/* Gunakan layout yang sama dengan modul */}
        {simulationsData.map((simulation) => ( // Gunakan simulationsData
          <Link to={`/simulations/${simulation.id}`} key={simulation.id}>
            <div className="module-card"> {/* Gunakan module-card untuk konsistensi */}
              {simulation.imageUrl && ( // Tampilkan gambar jika ada
                <img
                  src={simulation.imageUrl}
                  alt={simulation.title}
                  className="module-card-image"
                />
              )}
              <div className="module-card-content">
                <h2 className="module-card-title">{simulation.title}</h2>
                <p className="module-card-description">{simulation.description}</p>
                {/* Tambahkan level atau kategori jika ada di data simulasi */}
              </div>
              <div className="module-card-footer">
                <span className="module-duration">
                  <ClockIcon className="module-duration-icon" />
                  Waktu Simulasi: {simulation.duration}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimulationPage;