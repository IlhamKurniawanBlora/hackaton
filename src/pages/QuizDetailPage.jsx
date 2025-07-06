// src/pages/QuizDetailPage.jsx
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import quizzes from '~/data/quizzes'; // Impor data kuis
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

function QuizDetailPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState({}); // Untuk menyimpan jawaban pengguna

  if (!quiz) {
    return (
      <div className="container py-8 text-center min-h-content">
        <h1 className="page-title">Kuis Tidak Ditemukan</h1>
        <p className="text-lg text-gray-700">Maaf, kuis yang Anda cari tidak ada.</p>
        <Link to="/modules" className="button button-primary mt-6">
          Kembali ke Daftar Modul
        </Link>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    // Simpan jawaban pengguna
    setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedOption
    }));

    // Cek jawaban
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    // Pindah ke pertanyaan berikutnya atau tampilkan hasil
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null); // Reset pilihan
    } else {
      setShowResults(true); // Semua pertanyaan sudah dijawab
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setAnswers({});
  };

  const passThreshold = quiz.questions.length * 0.7; // Lulus jika benar 70%
  const isPassed = score >= passThreshold;

  // Fungsi untuk navigasi ke sertifikat jika lulus
  const goToCertificate = () => {
    // Di sini kita akan mengirim data ke halaman sertifikat
    // Untuk sekarang, kita bisa lewatkan via state atau parameter URL
    navigate('/certificates', {
        state: {
            certificateData: {
                name: 'Pengguna AgriNuklir', // Ganti dengan nama pengguna sebenarnya
                moduleTitle: quiz.title,
                completionDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            },
            fromQuiz: true // Menandakan datang dari kuis
        }
    });
  };

  return (
    <div className="module-detail-page container py-8 min-h-content">
      <Link to="/modules" className="back-link">
        <ArrowLeftIcon className="back-link-icon" /> Kembali ke Daftar Modul
      </Link>

      <h1 className="module-detail-title">{quiz.title}</h1>
      <p className="module-detail-description">Uji pemahaman Anda tentang topik ini!</p>

      {!showResults ? (
        <div className="quiz-card">
          <p className="quiz-question-counter">
            Pertanyaan {currentQuestionIndex + 1} dari {quiz.questions.length}
          </p>
          <h2 className="quiz-question-text">{currentQuestion.text}</h2>
          <div className="quiz-options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`quiz-option-button ${selectedOption === index ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(index)}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="button button-primary next-question-button"
            disabled={selectedOption === null}
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Pertanyaan Selanjutnya' : 'Selesai Kuis'}
          </button>
        </div>
      ) : (
        <div className="quiz-results-card">
          <h2 className="quiz-results-title">Hasil Kuis Anda</h2>
          <p className="quiz-score">
            Skor Anda: {score} dari {quiz.questions.length}
          </p>
          <p className={`quiz-result-message ${isPassed ? 'pass' : 'fail'}`}>
            {isPassed ? (
              <>
                <CheckCircleIcon className="result-icon" /> Selamat! Anda Lulus Kuis!
              </>
            ) : (
              <>
                <XCircleIcon className="result-icon" /> Maaf, Anda Belum Lulus.
              </>
            )}
          </p>

          <div className="quiz-summary">
              <h3>Tinjauan Jawaban:</h3>
              {quiz.questions.map((q, index) => (
                  <div key={q.id} className="summary-item">
                      <p className="summary-question">{index + 1}. {q.text}</p>
                      <p className={`summary-answer ${answers[q.id] === q.correctAnswer ? 'correct' : 'incorrect'}`}>
                          Jawaban Anda: {q.options[answers[q.id]]} ({answers[q.id] === q.correctAnswer ? 'Benar' : 'Salah'})
                      </p>
                      {answers[q.id] !== q.correctAnswer && (
                          <p className="summary-correct-answer">Jawaban Benar: {q.options[q.correctAnswer]}</p>
                      )}
                  </div>
              ))}
          </div>

          <div className="quiz-results-actions">
            {isPassed && (
              <button onClick={goToCertificate} className="button button-primary get-certificate-button">
                Dapatkan Sertifikat
              </button>
            )}
            <button onClick={handleRetakeQuiz} className="button button-secondary retake-quiz-button">
              Coba Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizDetailPage;