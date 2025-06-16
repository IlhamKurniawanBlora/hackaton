// src/pages/ModulesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Import ikon waktu dari Heroicons jika diperlukan
import { ClockIcon } from '@heroicons/react/24/outline';

const dummyModules = [
  // ... data dummy kamu tetap sama ...
  {
    id: '1',
    title: 'Pengantar Iradiasi Benih',
    description: 'Pelajari dasar-dasar iradiasi benih, mengapa dilakukan, dan manfaatnya bagi pertanian modern.',
    imageUrl: '/assets/images/module-benih.jpg',
    level: 'Dasar',
    duration: '2 jam',
  },
  {
    id: '2',
    title: 'Teknik Pengawetan Makanan dengan Nuklir',
    description: 'Pahami bagaimana teknologi nuklir digunakan untuk memperpanjang masa simpan makanan dan mengurangi limbah.',
    imageUrl: '/assets/images/module-makanan.jpg',
    level: 'Menengah',
    duration: '3 jam',
  },
  {
    id: '3',
    title: 'Peran Isotop dalam Analisis Tanah',
    description: 'Selami penggunaan isotop untuk memahami kesuburan tanah, penyerapan nutrisi, dan manajemen pupuk.',
    imageUrl: '/assets/images/module-tanah.jpg',
    level: 'Lanjut',
    duration: '4 jam',
  },
  {
    id: '4',
    title: 'Keselamatan dan Regulasi Teknologi Nuklir Pertanian',
    description: 'Mempelajari standar keselamatan, peraturan, dan etika dalam aplikasi nuklir di bidang pertanian.',
    imageUrl: '/assets/images/module-safety.jpg',
    level: 'Dasar',
    duration: '2.5 jam',
  },
];

function ModulesPage() {
  return (
    <div className="container py-8 min-h-content">
      <h1 className="page-title">Modul Edukasi AgriNuklir</h1>

      <div className="module-grid-layout">
        {dummyModules.map((module) => (
          <Link to={`/modules/${module.id}`} key={module.id}>
            <div className="module-card"> {/* Gunakan kelas module-card */}
              <img
                src={module.imageUrl}
                alt={module.title}
                className="module-card-image"
              />
              <div className="module-card-content">
                <h2 className="module-card-title">{module.title}</h2>
                <p className="module-card-description">{module.description}</p>
                <span className="module-level">{module.level}</span>
              </div>
              <div className="module-card-footer">
                <span className="module-duration">
                  <ClockIcon className="module-duration-icon" /> {/* Ikon waktu */}
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