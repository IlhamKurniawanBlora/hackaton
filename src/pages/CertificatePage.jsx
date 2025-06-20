// src/pages/CertificatesPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AcademicCapIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const LOCAL_STORAGE_KEY = 'agrinuklir_certificates';

function CertificatesPage() {
  const location = useLocation();

  const [certificates, setCertificates] = useState(() => {
    try {
      const storedCerts = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedCerts ? JSON.parse(storedCerts) : [];
    } catch (error) {
      console.error("Failed to parse certificates from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certificates));
    } catch (error) {
      console.error("Failed to save certificates to localStorage:", error);
    }
  }, [certificates]);

  useEffect(() => {
    if (location.state && location.state.fromQuiz && location.state.certificateData) {
      const newCertData = location.state.certificateData;
      const newCert = {
        id: `${newCertData.moduleTitle}-${newCertData.name}-${Date.now()}`,
        ...newCertData,
        imageUrl: '/assets/images/certificate-placeholder.jpg',
      };

      setCertificates((prevCerts) => {
        const exists = prevCerts.some(
          (c) => c.moduleTitle === newCert.moduleTitle && c.name === newCert.name
        );
        if (!exists) {
          return [...prevCerts, newCert];
        }
        return prevCerts;
      });

      window.history.replaceState({}, document.title, location.pathname);
    }
  }, [location]);

  const handleDownloadCertificate = useCallback((cert) => {
    alert(`Fitur unduh sertifikat untuk "${cert.moduleTitle}" akan segera hadir!`);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Sertifikat Kompetensi</h1>

      {certificates.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center shadow-sm">
          <AcademicCapIcon className="w-12 h-12 mx-auto text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-green-700 mb-2">Belum Ada Sertifikat yang Dicapai</h2>
          <p className="text-gray-600 mb-6">
            Anda belum menyelesaikan modul edukasi atau kuis yang tersedia. Selesaikan modul untuk mendapatkan sertifikat Anda!
          </p>
          <Link
            to="/modules"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md shadow transition"
          >
            Mulai Belajar Sekarang
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <AcademicCapIcon className="w-6 h-6 text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-green-700">Sertifikat Penyelesaian</h2>
                </div>
                <p className="text-sm text-gray-600">Dengan bangga mempersembahkan sertifikat ini kepada:</p>
                <p className="text-xl font-bold text-gray-800 my-2">{cert.name}</p>
                <p className="text-sm text-gray-600">Atas keberhasilan menyelesaikan modul:</p>
                <p className="text-base font-medium text-green-700">{cert.moduleTitle}</p>
                <p className="text-sm text-gray-500 mt-2">Diselesaikan pada: {cert.completionDate}</p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleDownloadCertificate(cert)}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-medium transition"
                >
                  <DocumentArrowDownIcon className="w-5 h-5" /> Unduh Sertifikat
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
