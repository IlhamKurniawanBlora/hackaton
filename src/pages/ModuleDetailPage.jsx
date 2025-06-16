// src/pages/ModuleDetailPage.jsx
// ... (Kode ini sudah benar, tidak ada perubahan) ...
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import modules from '../data/modules/modulesData'; // Sudah benar
import quizzes from '../data/quizzes';
import { ArrowLeftIcon, BookOpenIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

function ModuleDetailPage() {
  const { moduleId } = useParams();
  const module = modules.find(m => m.id === moduleId);
  const relatedQuiz = quizzes.find(q => q.moduleRef === moduleId);

  if (!module) {
    return <div className="container py-8 text-center min-h-content">Modul tidak ditemukan.</div>;
  }

  return (
    <div className="module-detail-page container py-8 min-h-content">
      <Link to="/modules" className="back-link">
        <ArrowLeftIcon className="back-link-icon" /> Kembali ke Daftar Modul
      </Link>

      <h1 className="module-detail-title">{module.title}</h1>
      <p className="module-detail-description">{module.shortDescription}</p> {/* Menggunakan shortDescription */}

      <div className="module-sections">
        {/* Menggunakan module.content dari data asli */}
        {module.content.map((block, index) => { // Mengubah sections menjadi content
          if (block.type === 'heading') {
            return <h2 key={index} className="module-section-title"><BookOpenIcon className="module-section-icon" /> {block.text}</h2>;
          } else if (block.type === 'paragraph') {
            return <p key={index} className="module-section-text">{block.text}</p>;
          } else if (block.type === 'image') {
            return <img key={index} src={block.src} alt={block.alt} className="module-section-image" />;
          } else if (block.type === 'list') {
            return (
              <ul key={index} className="module-section-list">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );
          }
          return null;
        })}
      </div>

      {relatedQuiz && (
        <div className="quiz-call-to-action">
          <h2 className="quiz-cta-title">
            <QuestionMarkCircleIcon className="quiz-cta-icon" /> Uji Pemahaman Anda!
          </h2>
          <p className="quiz-cta-description">
            Selesaikan kuis ini untuk menguji pengetahuan Anda tentang "{relatedQuiz.title}" dan dapatkan sertifikat!
          </p>
          <Link to={`/quiz/${relatedQuiz.id}`} className="button button-primary quiz-cta-button">
            Mulai Kuis
          </Link>
        </div>
      )}
    </div>
  );
}

export default ModuleDetailPage;