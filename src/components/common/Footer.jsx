// src/components/common/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Import ikon dari @heroicons/react/24/outline
import { AcademicCapIcon, BeakerIcon, ChatBubbleLeftRightIcon, BuildingOfficeIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-grid">
          {/* Bagian 1: Informasi Platform */}
          <div className="footer-col footer-info">
            <h3 className="footer-logo-title">AgriNuklir Platform</h3>
            <p className="footer-description">
              Inovasi pertanian masa depan dengan pemanfaatan teknologi nuklir untuk ketahanan pangan yang berkelanjutan.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><AcademicCapIcon className="icon-size" /></a>
              <a href="#" className="social-icon"><BeakerIcon className="icon-size" /></a>
              <a href="#" className="social-icon"><ChatBubbleLeftRightIcon className="icon-size" /></a>
            </div>
          </div>

          {/* Bagian 2: Tautan Cepat */}
          <div className="footer-col">
            <h3 className="footer-heading">Tautan Cepat</h3>
            <ul className="footer-list">
              <li><Link to="/" className="footer-link">Beranda</Link></li>
              <li><Link to="/modules" className="footer-link">Modul Edukasi</Link></li>
              <li><Link to="/simulations" className="footer-link">Simulasi Interaktif</Link></li>
              <li><Link to="/chatbot" className="footer-link">Chatbot AI</Link></li>
              <li><Link to="/forum" className="footer-link">Forum Komunitas</Link></li>
              <li><Link to="/certificates" className="footer-link">Sertifikat</Link></li>
            </ul>
          </div>

          {/* Bagian 3: Sumber Daya & Bantuan */}
          <div className="footer-col">
            <h3 className="footer-heading">Sumber Daya</h3>
            <ul className="footer-list">
              <li><Link to="/about" className="footer-link">Tentang Kami</Link></li>
              <li><Link to="/faq" className="footer-link">FAQ</Link></li>
              <li><Link to="/privacy-policy" className="footer-link">Kebijakan Privasi</Link></li>
              <li><Link to="/contact" className="footer-link">Hubungi Kami</Link></li>
              <li><a href="https://www.brin.go.id/" target="_blank" rel="noopener noreferrer" className="footer-link">BRIN (Eksternal)</a></li>
            </ul>
          </div>

          {/* Bagian 4: Informasi Kontak (Dummy) */}
          <div className="footer-col">
            <h3 className="footer-heading">Kontak</h3>
            <p className="footer-contact-item">
              <EnvelopeIcon className="icon-small-size" /> Email: <a href="mailto:info@agrinuklir.com" className="footer-link-inline">info@agrinuklir.com</a>
            </p>
            <p className="footer-contact-item">
              <PhoneIcon className="icon-small-size" /> Telepon: +62 123 4567 890 (Dummy)
            </p>
            <p className="footer-contact-item align-start">
              <BuildingOfficeIcon className="icon-small-size mt-05" /> Alamat: Jl. Inovasi Pertanian No. 123, Jakarta, Indonesia (Dummy)
            </p>
          </div>
        </div>

        {/* Bagian Hak Cipta */}
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} AgriNuklir Platform. Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="footer-made-with">Dibuat dengan ❤️ untuk kemajuan pertanian Indonesia.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;