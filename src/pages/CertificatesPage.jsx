// src/pages/CertificatesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // Impor useLocation
import { AcademicCapIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

function CertificatesPage() {
  const location = useLocation(); // Dapatkan objek lokasi
  const [certificates, setCertificates] = useState([]);

  // Efek untuk menambahkan sertifikat dari kuis jika ada
  useEffect(() => {
    if (location.state && location.state.fromQuiz && location.state.certificateData) {
      const newCert = {
        id: `cert-${Date.now()}`, // ID unik berdasarkan timestamp
        ...location.state.certificateData,
        imageUrl: '/assets/images/certificate-placeholder.jpg', // Placeholder sementara
      };
      // Cek apakah sertifikat sudah ada untuk menghindari duplikasi saat refresh
      const exists = certificates.some(c => c.moduleTitle === newCert.moduleTitle && c.name === newCert.name);
      if (!exists) {
        setCertificates((prevCerts) => [...prevCerts, newCert]);
      }
      // Bersihkan state lokasi agar tidak menambahkan lagi saat refresh manual
      // Ini perlu penanganan lebih baik di aplikasi nyata (misal: disimpan di localStorage/backend)
      window.history.replaceState({}, document.title); // Membersihkan state URL
    }
  }, [location.state, certificates]); // Tambahkan certificates sebagai dependency

  // Dummy certificates (akan ditambahkan dengan yang dari kuis)
  // Kalau mau pakai dummy permanen, pindahkan ini ke state awal atau buat di luar useEffect
  // const dummyCertificates = [
  //   {
  //     id: 'cert-1',
  //     moduleTitle: 'Pengantar Iradiasi Benih',
  //     completionDate: '15 Mei 2025',
  //     name: 'Budi Santoso',
  //     imageUrl: '/assets/images/certificate-placeholder.jpg',
  //   },
  // ];

  // Pastikan initial state certificates juga bisa menampung dummy jika tidak ada dari kuis
  // Atau bisa jadi useEffect ini yang inisiasi dari localStorage
  // Untuk demo sederhana, kita anggap `certificates` dimulai dari kosong dan diisi oleh kuis.
  // Jika mau ada dummy by default, bisa:
  // const [certificates, setCertificates] = useState(dummyCertificates);
  // Lalu di useEffect tambahkan logika deduplikasi yang lebih kuat.


  return (
    <div className="container py-8 min-h-content">
      <h1 className="page-title">Sertifikat Kompetensi</h1>

      {certificates.length === 0 ? (
        <div className="no-certificate-card text-center">
          <AcademicCapIcon className="no-certificate-icon" />
          <h2 className="no-certificate-title">Belum Ada Sertifikat yang Dicapai</h2>
          <p className="no-certificate-text">
            Anda belum menyelesaikan modul edukasi atau kuis yang tersedia. Selesaikan modul untuk mendapatkan sertifikat Anda!
          </p>
          <Link to="/modules" className="button button-primary">
            Mulai Belajar Sekarang
          </Link>
        </div>
      ) : (
        <div className="certificate-grid">
          {certificates.map((cert) => ( // Render dari state certificates
            <div key={cert.id} className="certificate-card">
              <div className="certificate-header">
                <AcademicCapIcon className="certificate-header-icon" />
                <h2 className="certificate-title">Sertifikat Penyelesaian</h2>
              </div>
              <div className="certificate-body">
                <p className="certificate-sub-text">Dengan bangga mempersembahkan sertifikat ini kepada:</p>
                <p className="certificate-name">{cert.name}</p>
                <p className="certificate-sub-text">Atas keberhasilan menyelesaikan modul:</p>
                <p className="certificate-module">{cert.moduleTitle}</p>
                <p className="certificate-date">Diselesaikan pada: {cert.completionDate}</p>
              </div>
              <div className="certificate-footer">
                <button className="button button-primary certificate-download-button">
                  <DocumentArrowDownIcon className="button-icon" /> Unduh Sertifikat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CertificatesPage;