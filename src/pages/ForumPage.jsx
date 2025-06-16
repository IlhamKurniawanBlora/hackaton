// src/pages/ForumPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
// Impor ikon Heroicons jika diperlukan
import { ChatBubbleOvalLeftEllipsisIcon, CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline';

// Data dummy untuk topik forum
const dummyForumTopics = [
  {
    id: '1',
    title: 'Diskusi: Manfaat Iradiasi Benih untuk Padi Lokal',
    author: 'Petani_Maju',
    comments: 12,
    date: '10 Juni 2025',
    lastActivity: '12 Juni 2025, 10:30',
  },
  {
    id: '2',
    title: 'Tanya Jawab: Keamanan Pangan Iradiasi, Apakah Aman Dikonsumsi?',
    author: 'IbuRumahTangga',
    comments: 25,
    date: '08 Juni 2025',
    lastActivity: '11 Juni 2025, 15:00',
  },
  {
    id: '3',
    title: 'Berbagi Pengalaman: Penggunaan Isotop untuk Analisis Hara Tanah',
    author: 'Agronom_Muda',
    comments: 8,
    date: '05 Juni 2025',
    lastActivity: '09 Juni 2025, 09:00',
  },
  {
    id: '4',
    title: 'Ide: Bagaimana Jika Kita Buat Grup Belajar AgriNuklir?',
    author: 'Mahasiswa_Pertanian',
    comments: 18,
    date: '03 Juni 2025',
    lastActivity: '07 Juni 2025, 18:00',
  },
  {
    id: '5',
    title: 'Masukan Fitur: Simulasi Pengelolaan Limbah Nuklir Pertanian',
    author: 'PemerhatiLingkungan',
    comments: 5,
    date: '01 Juni 2025',
    lastActivity: '06 Juni 2025, 11:00',
  },
];

function ForumPage() {
  return (
    <div className="container py-8 min-h-content">
      <h1 className="page-title">Forum Diskusi AgriNuklir</h1>

      <div className="forum-header-actions">
        <Link to="/forum/new-topic" className="button button-primary create-topic-button">
          Buat Topik Baru
        </Link>
      </div>

      <div className="forum-table-container">
        <table className="forum-table">
          <thead>
            <tr className="forum-table-header">
              <th className="forum-header-title">Topik Diskusi</th>
              <th className="forum-header-author hidden-on-mobile">Penulis</th> {/* Sembunyikan di mobile */}
              <th className="forum-header-comments hidden-on-mobile">Komentar</th> {/* Sembunyikan di mobile */}
              <th className="forum-header-date hidden-on-mobile">Tanggal Dibuat</th> {/* Sembunyikan di mobile */}
              <th className="forum-header-activity">Aktivitas Terakhir</th>
            </tr>
          </thead>
          <tbody>
            {dummyForumTopics.map((topic) => (
              <tr key={topic.id} className="forum-table-row">
                <td className="forum-cell forum-cell-title">
                  <Link to={`/forum/${topic.id}`} className="forum-title-link">
                    {topic.title}
                  </Link>
                  <div className="forum-meta-mobile show-on-mobile"> {/* Tampilkan di mobile */}
                    <span className="forum-meta-item"><UserIcon className="meta-icon" /> {topic.author}</span>
                    <span className="forum-meta-item"><ChatBubbleOvalLeftEllipsisIcon className="meta-icon" /> {topic.comments}</span>
                    <span className="forum-meta-item"><CalendarDaysIcon className="meta-icon" /> {topic.date}</span>
                  </div>
                </td>
                <td className="forum-cell hidden-on-mobile">{topic.author}</td>
                <td className="forum-cell hidden-on-mobile">{topic.comments}</td>
                <td className="forum-cell hidden-on-mobile">{topic.date}</td>
                <td className="forum-cell">{topic.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ForumPage;