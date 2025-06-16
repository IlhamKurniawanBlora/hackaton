// src/pages/SimulationDetailPage.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, PlayIcon, DocumentCheckIcon, ExternalLinkIcon } from '@heroicons/react/24/outline'; // Tambah ExternalLinkIcon

// ASUMSI: Data simulasi ini sekarang akan diletakkan di file terpisah
// Misalnya, src/data/simulationsData.js
// Jika belum, kamu bisa tetap menaruhnya di sini, tapi pastikan ini adalah sumber data yang konsisten
const simulationsData = [
  {
    id: 'sim-iradiasi-benih-optimal',
    title: 'Simulasi Iradiasi Benih Optimal',
    description: 'Eksperimen dengan dosis radiasi berbeda untuk melihat efek pada pertumbuhan dan hasil benih tanaman X.',
    content: 'Dalam simulasi ini, Anda akan dapat memilih jenis benih, mengatur dosis radiasi (rendah, sedang, tinggi), dan mengamati perkecambahan serta pertumbuhan awal dalam jangka waktu virtual. Perhatikan bagaimana dosis yang berbeda dapat mempengaruhi vigor benih dan resistensi terhadap kondisi lingkungan tertentu. Tujuan simulasi ini adalah untuk membantu Anda memahami konsep optimasi dosis radiasi untuk hasil terbaik.',
    link: 'https://www.google.com', // GANTI DENGAN LINK SIMULASI ASLI DARI WEB LAIN
    // Contoh lain: 'https://pusteknukes.brin.go.id/simulasi/iradiasi-benih-optimal',
    duration: '30 Menit', // Tambahkan jika belum ada
    imageUrl: '/assets/images/simulation-1.jpg' // Tambahkan jika belum ada
  },
  {
    id: 'sim-pengawetan-makanan-stroberi',
    title: 'Simulasi Pengawetan Makanan (Stroberi)',
    description: 'Amati efek iradiasi pada masa simpan stroberi dibandingkan dengan metode konvensional.',
    content: 'Simulasi ini memvisualisasikan perbedaan masa simpan stroberi yang diiradiasi dan yang tidak diiradiasi. Anda akan melihat grafik pertumbuhan mikroba dan perubahan kualitas (misal: busuk, perubahan warna) seiring waktu. Ini akan memberikan gambaran jelas tentang efektivitas iradiasi sebagai metode pengawetan pangan.',
    link: 'https://www.bing.com', // GANTI DENGAN LINK SIMULASI ASLI DARI WEB LAIN
    duration: '45 Menit',
    imageUrl: '/assets/images/simulation-2.jpg'
  },
  {
    id: 'sim-analisis-penyerapan-hara',
    title: 'Analisis Penyerapan Hara Tanah dengan Isotop',
    description: 'Pahami bagaimana tanaman menyerap nutrisi dari tanah menggunakan pelacak isotop.',
    content: 'Simulasi interaktif ini akan menunjukkan pergerakan nutrisi berlabel isotop di dalam tanah dan bagaimana akar tanaman menyerapnya. Anda bisa mengubah jenis tanah, ketersediaan air, dan jenis pupuk untuk melihat dampaknya pada efisiensi penyerapan nutrisi, sebuah konsep penting dalam pertanian presisi.',
    link: 'https://www.yahoo.com', // GANTI DENGAN LINK SIMULASI ASLI DARI WEB LAIN
    duration: '60 Menit',
    imageUrl: '/assets/images/simulation-3.jpg'
  },
  {
    id: 'sim-manajemen-limbah-radioaktif',
    title: 'Manajemen Limbah Radioaktif Pertanian',
    description: 'Pelajari proses penanganan dan penyimpanan limbah radioaktif dari aplikasi pertanian.',
    content: 'Simulasi ini akan membimbing Anda melalui tahapan pengelolaan limbah radioaktif tingkat rendah yang dihasilkan dari aplikasi pertanian (misalnya, dari alat ukur isotop). Anda akan belajar tentang klasifikasi limbah, metode dekomposisi atau pengemasan, hingga penyimpanan akhir yang aman sesuai dengan protokol internasional.',
    link: 'https://www.duckduckgo.com', // GANTI DENGAN LINK SIMULASI ASLI DARI WEB LAIN
    duration: '50 Menit',
    imageUrl: '/assets/images/simulation-4.jpg'
  },
];

function SimulationDetailPage() {
  const { simulationId } = useParams();
  const navigate = useNavigate();
  const simulation = simulationsData.find(s => s.id === simulationId);

  if (!simulation) {
    return <div className="container py-8 text-center min-h-content">Simulasi tidak ditemukan.</div>;
  }

  const handleCompleteSimulation = () => {
    const userName = prompt("Masukkan nama lengkap Anda untuk sertifikat:");

    if (userName) {
      const certificateData = {
        moduleTitle: `Penyelesaian Simulasi: ${simulation.title}`,
        completionDate: new Date().toLocaleDateString('id-ID', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        name: userName,
      };

      navigate('/certificates', {
        state: {
          fromQuiz: false,
          fromSimulation: true,
          certificateData: certificateData,
        },
      });
    } else {
      alert("Nama diperlukan untuk menerbitkan sertifikat.");
    }
  };

  return (
    <div className="module-detail-page container py-8 min-h-content">
      <Link to="/simulations" className="back-link">
        <ArrowLeftIcon className="back-link-icon" /> Kembali ke Daftar Simulasi
      </Link>

      <h1 className="module-detail-title">{simulation.title}</h1>
      <p className="module-detail-description">{simulation.description}</p>

      <div className="module-section">
        <h2 className="module-section-title">Deskripsi Simulasi</h2>
        <p className="module-section-text">{simulation.content}</p>

        <div className="simulation-actions">
          {simulation.link && ( // Tampilkan tombol Mulai Simulasi jika ada link
            <a
              href={simulation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary start-simulation-button"
            >
              <PlayIcon className="button-icon" /> Mulai Simulasi (Buka di Tab Baru) <ExternalLinkIcon className="button-icon ml-1" /> {/* Tambah ikon */}
            </a>
          )}
          <button
            onClick={handleCompleteSimulation}
            className="button button-secondary complete-simulation-button"
          >
            <DocumentCheckIcon className="button-icon" /> Selesaikan Simulasi & Dapatkan Sertifikat
          </button>
        </div>
      </div>
    </div>
  );
}

export default SimulationDetailPage;