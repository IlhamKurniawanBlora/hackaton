// src/components/home/FeatureGrid.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BeakerIcon, ChatBubbleLeftRightIcon, StarIcon, UsersIcon } from '@heroicons/react/24/outline';

const features = [
  { id: 1, title: 'Modul Edukasi Interaktif', description: 'Pelajari konsep dasar hingga aplikasi canggih teknologi nuklir di pertanian dengan modul yang mudah dipahami.', link: '/modules', icon: <AcademicCapIcon className="feature-icon" /> },
  { id: 2, title: 'Simulasi Praktis', description: 'Eksperimen virtual dengan skenario iradiasi benih, pengawetan makanan, dan analisis tanah secara aman.', link: '/simulations', icon: <BeakerIcon className="feature-icon" /> },
  { id: 3, title: 'Chatbot Edukasi AI', description: 'Dapatkan jawaban instan untuk pertanyaan Anda seputar agrinuklir 24/7.', link: '/chatbot', icon: <ChatBubbleLeftRightIcon className="feature-icon" /> },
  { id: 4, title: 'Sertifikat Kompetensi', description: 'Raih pengakuan atas pengetahuan yang Anda peroleh setelah menyelesaikan setiap modul dan kuisnya.', link: '/certificates', icon: <StarIcon className="feature-icon" /> },
  { id: 5, title: 'Forum Komunitas Aktif', description: 'Berinteraksi dengan sesama pegiat pertanian, bertanya, dan berbagi pengalaman dengan ahli di bidangnya.', link: '/forum', icon: <UsersIcon className="feature-icon" /> },
];

function FeatureGrid() {
  return (
    <div className="container">
      <div className="feature-grid-layout">
        {features.map((feature) => (
          <div key={feature.id} className="card feature-card"> {/* Gunakan kelas card dan feature-card */}
            <div className="card-content">
              <div className="feature-icon-container">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <Link
                to={feature.link}
                className="feature-link"
              >
                Pelajari Lebih Lanjut
                <svg className="link-icon-small" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureGrid;