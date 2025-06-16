// src/pages/ModulesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// IMPOR DATA MODUL DARI SUMBER ASLI
import modules from '../data/modules/modulesData'; // <-- BARIS BARU / PERBAIKAN IMPORT
// Import ikon waktu dari Heroicons
import { ClockIcon } from '@heroicons/react/24/outline';

// HAPUS ARRAY dummyModules INI SEPENUHNYA
// const dummyModules = [ ... ]; // HAPUS SEMUA BARIS INI SAMPAI AKHIR ARRAY

function ModulesPage() {
  return (
    <div className="container py-8 min-h-content">
      <h1 className="page-title">Modul Edukasi AgriNuklir</h1>

      <div className="module-grid-layout">
        {/* GUNAKAN 'modules' YANG DIIMPOR, BUKAN dummyModules */}
        {modules.map((module) => (
          // Link sekarang akan menggunakan ID yang benar dari data modul asli
          <Link to={`/modules/${module.id}`} key={module.id}>
            <div className="module-card">
              <img
                // Perhatikan: module.imageUrl tidak ada di data aslimu, yang ada adalah module.image
                src={module.image} // <-- UBAH KE module.image
                alt={module.title}
                className="module-card-image"
              />
              <div className="module-card-content">
                <h2 className="module-card-title">{module.title}</h2>
                {/* module.description tidak ada, yang ada module.shortDescription */}
                <p className="module-card-description">{module.shortDescription}</p> {/* <-- UBAH KE module.shortDescription */}
                <span className="module-level">{module.level}</span>
              </div>
              <div className="module-card-footer">
                <span className="module-duration">
                  <ClockIcon className="module-duration-icon" />
                  Waktu Belajar: {module.duration}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ModulesPage;