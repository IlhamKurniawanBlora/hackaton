// src/pages/ForumTopicPage.jsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Impor ikon

// Dummy data untuk topik (sama dengan yang di ForumPage, ditambahkan konten)
const dummyForumTopics = [
  {
    id: '1',
    title: 'Diskusi: Manfaat Iradiasi Benih untuk Padi Lokal',
    author: 'Petani_Maju',
    date: '10 Juni 2025',
    content: 'Halo teman-teman! Saya ingin tahu lebih banyak tentang bagaimana iradiasi benih bisa diterapkan pada padi lokal kita. Apakah ada studi kasus atau pengalaman langsung yang bisa dibagikan? Saya tertarik untuk meningkatkan ketahanan dan produktivitas padi di daerah saya.',
    comments: [
      { id: 'c1', author: 'AhliAgri', date: '10 Juni 2025, 14:00', text: 'Tentu saja! Iradiasi benih padi lokal dapat meningkatkan daya tahan terhadap hama wereng dan kekeringan. BRIN memiliki beberapa varietas unggul hasil mutasi yang sudah dilepas ke petani.' },
      { id: 'c2', author: 'Petani_Maju', date: '10 Juni 2025, 14:15', text: 'Wah, menarik sekali! Bisakah Anda berikan informasi lebih lanjut tentang varietas tersebut?' },
      { id: 'c3', author: 'AhliAgri', date: '11 Juni 2025, 09:00', text: 'Ada varietas Inpari Sidenuk dan Mira-1 yang toleran kekeringan dan hama. Anda bisa mencari informasi di website resmi BRIN atau kontak pusat penelitian padi.' },
    ],
  },
  {
    id: '2',
    title: 'Tanya Jawab: Keamanan Pangan Iradiasi, Apakah Aman Dikonsumsi?',
    author: 'IbuRumahTangga',
    date: '08 Juni 2025',
    content: 'Saya sering mendengar tentang iradiasi makanan, tapi masih ragu apakah aman untuk keluarga. Apakah makanan yang diiradiasi menjadi radioaktif? Bagaimana dampaknya terhadap kesehatan jangka panjang?',
    comments: [
        { id: 'c4', author: 'DokterGizi', date: '08 Juni 2025, 11:00', text: 'Iradiasi makanan adalah proses yang aman dan tidak membuat makanan menjadi radioaktif. Ini seperti memasak atau memanaskan. Dampaknya sudah diteliti luas oleh FAO dan WHO, dan dinyatakan aman jika sesuai standar.' },
        { id: 'c5', author: 'RegulatorPangan', date: '09 Juni 2025, 10:00', text: 'Betul sekali. Di Indonesia, ada regulasi ketat dari BPOM terkait pangan iradiasi. Pastikan produk memiliki label iradiasi yang jelas.' }
    ],
  },
  // ... tambahkan topik lainnya jika ada
];

function ForumTopicPage() {
  const { topicId } = useParams();
  const topic = dummyForumTopics.find(t => t.id === topicId);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    // Logika untuk menambahkan komentar baru ke data (sementara dummy)
    const commentToAdd = {
      id: `c${topic.comments.length + 1}`, // ID dummy
      author: 'Anda', // Atau nama pengguna yang login
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      text: newComment,
    };

    topic.comments.push(commentToAdd); // Langsung ubah dummy data
    setNewComment('');
    // Di aplikasi nyata, ini akan mengirim ke backend
    alert('Komentar ditambahkan! (Ini dummy, belum tersimpan permanen)');
  };

  if (!topic) {
    return <div className="container py-8 text-center min-h-content">Topik tidak ditemukan.</div>;
  }

  return (
    <div className="forum-topic-page container py-8 min-h-content">
      <Link to="/forum" className="back-link">
        <ArrowLeftIcon className="back-link-icon" /> Kembali ke Forum
      </Link>

      <div className="forum-post-card">
        <h1 className="forum-post-title">{topic.title}</h1>
        <div className="forum-post-meta">
          <span className="forum-post-author"><UserCircleIcon className="meta-icon" /> {topic.author}</span>
          <span className="forum-post-date"><CalendarDaysIcon className="meta-icon" /> {topic.date}</span>
        </div>
        <div className="forum-post-content">
          <p>{topic.content}</p>
        </div>
      </div>

      <h2 className="comments-section-title">Komentar ({topic.comments.length})</h2>

      <div className="comments-list">
        {topic.comments.length === 0 ? (
          <p className="no-comments-message">Belum ada komentar untuk topik ini. Jadilah yang pertama!</p>
        ) : (
          topic.comments.map((comment) => (
            <div key={comment.id} className="forum-comment-card">
              <div className="comment-header">
                <span className="comment-author"><UserCircleIcon className="meta-icon" /> {comment.author}</span>
                <span className="comment-date"><CalendarDaysIcon className="meta-icon" /> {comment.date}</span>
              </div>
              <div className="comment-content">
                <p>{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="comment-form-container">
        <h3 className="comment-form-title">Tambahkan Komentar Anda</h3>
        <form onSubmit={handleAddComment} className="comment-form">
          <textarea
            className="form-input comment-textarea"
            rows="4"
            placeholder="Tulis komentar Anda di sini..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="button button-primary submit-comment-button">
            Kirim Komentar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForumTopicPage;