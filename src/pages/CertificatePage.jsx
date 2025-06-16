// src/pages/CertificatesPage.jsx
import React, { useState, useEffect, useCallback } from 'react'; // Tambah useCallback
import { Link, useLocation } from 'react-router-dom';
import { AcademicCapIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

// Nama kunci untuk localStorage
const LOCAL_STORAGE_KEY = 'agrinuklir_certificates';

function CertificatesPage() {
  const location = useLocation();
  // Inisialisasi state certificates dari localStorage
  // Jika tidak ada di localStorage, kembalikan array kosong
  const [certificates, setCertificates] = useState(() => {
    try {
      const storedCerts = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedCerts ? JSON.parse(storedCerts) : [];
    } catch (error) {
      console.error("Failed to parse certificates from localStorage:", error);
      return []; // Kembalikan array kosong jika ada error parsing
    }
  });

  // Efek untuk menyimpan certificates ke localStorage setiap kali certificates berubah
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certificates));
    } catch (error) {
      console.error("Failed to save certificates to localStorage:", error);
    }
  }, [certificates]); // Dependency array: jalankan efek ini saat 'certificates' berubah

  // Efek untuk menambahkan sertifikat dari kuis jika ada di location.state
  useEffect(() => {
    if (location.state && location.state.fromQuiz && location.state.certificateData) {
      const newCertData = location.state.certificateData;
      const newCert = {
        // Gunakan kombinasi moduleTitle dan name untuk ID agar unik dan mudah dideteksi duplikat
        id: `${newCertData.moduleTitle}-${newCertData.name}-${Date.now()}`,
        ...newCertData,
        imageUrl: '/assets/images/certificate-placeholder.jpg', // Placeholder sementara
      };

      setCertificates((prevCerts) => {
        // Cek apakah sertifikat dengan moduleTitle dan name yang sama sudah ada
        const exists = prevCerts.some(
          (c) => c.moduleTitle === newCert.moduleTitle && c.name === newCert.name
        );

        if (!exists) {
          console.log("Menambahkan sertifikat baru:", newCert);
          return [...prevCerts, newCert];
        } else {
          console.log("Sertifikat sudah ada, tidak menambahkan duplikat.");
          return prevCerts; // Kembalikan array sebelumnya jika sudah ada
        }
      });

      // Hapus state dari `location` setelah diproses
      // Ini penting agar sertifikat tidak ditambahkan berulang kali saat refresh
      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]); // Hanya perlu 'location' sebagai dependency

  // Fungsi untuk mengunduh sertifikat (placeholder)
  const handleDownloadCertificate = useCallback((cert) => {
    alert(`Fitur unduh sertifikat untuk "${cert.moduleTitle}" akan segera hadir!`);
    // Di sini kamu akan mengimplementasikan logika unduh sertifikat sebenarnya,
    // misalnya dengan generate PDF atau gambar.
    // Contoh sederhana: membuat link dummy
    // const link = document.createElement('a');
    // link.href = cert.imageUrl; // Jika imageUrl adalah path ke gambar sertifikat yang siap unduh
    // link.download = `sertifikat-${cert.moduleTitle.replace(/\s/g, '-')}-${cert.name.replace(/\s/g, '-')}.jpg`;
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  }, []);

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
          {certificates.map((cert) => (
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
                <button
                  onClick={() => handleDownloadCertificate(cert)} // Panggil fungsi unduh
                  className="button button-primary certificate-download-button"
                >
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