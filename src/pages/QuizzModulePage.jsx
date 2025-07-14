import { useState, useEffect } from 'react';
import { testService } from '../utils/test';
import { authService } from '../utils/auth';
import { CheckCircle, XCircle, Clock, Award, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
// Get moduleId from URL params
const { moduleId } = useParams();
  
  // State management
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [user, setUser] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  // Load quiz data
  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { user: currentUser } = await authService.getCurrentUser();
        if (!currentUser) {
          alert('Silakan login terlebih dahulu');
          return;
        }
        setUser(currentUser);
        
        // Get quiz data
        const result = await testService.getQuizByModuleId(moduleId);
        if (!result.success) {
          throw new Error(result.error);
        }
        
        setQuiz(result.quiz);
        setUserAnswers(new Array(result.quiz.questions.length).fill(null));
        
        // Set timer if quiz has time limit (optional)
        if (result.quiz.time_limit) {
          setTimeLeft(result.quiz.time_limit * 60); // Convert to seconds
        }
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadQuiz();
  }, [moduleId]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && isStarted && !showResults) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isStarted) {
      handleSubmitQuiz();
    }
  }, [timeLeft, isStarted, showResults]);

  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setUserAnswers(newAnswers);
  };

  // Navigate questions
  const goToQuestion = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Start quiz
  const startQuiz = () => {
    setIsStarted(true);
  };

  // Submit quiz
  const handleSubmitQuiz = async () => {
    try {
      setIsSubmitting(true);
      
      // Check if all questions are answered
      const unansweredQuestions = userAnswers.filter(answer => answer === null).length;
      if (unansweredQuestions > 0) {
        const confirm = window.confirm(
          `Anda masih memiliki ${unansweredQuestions} pertanyaan yang belum dijawab. Apakah Anda yakin ingin menyelesaikan quiz?`
        );
        if (!confirm) {
          setIsSubmitting(false);
          return;
        }
      }
      
      // Get user name for certificate
      const userName = user.user_metadata?.full_name || user.email;
      
      // Process quiz submission
      const result = await testService.processQuizSubmission(
        moduleId,
        userAnswers,
        userName
      );
      
      if (result.success) {
        setResults(result);
        setShowResults(true);
      } else {
        throw new Error(result.error);
      }
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to certificate
  const goToCertificate = () => {
    // Navigate to certificate page
    window.location.href = `/certificates/${moduleId}`;
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  // Results view
  if (showResults) {
    const { summary, certification } = results;
    
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              {summary.passed ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {summary.passed ? 'Selamat!' : 'Belum Berhasil'}
              </h1>
              
              <p className="text-gray-600">
                {summary.passed 
                  ? 'Anda telah menyelesaikan quiz dengan baik'
                  : 'Anda belum mencapai nilai minimum untuk lulus'
                }
              </p>
            </div>

            {/* Score Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{summary.percentage}%</div>
                <div className="text-sm text-gray-600">Nilai Anda</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{summary.correctAnswers}</div>
                <div className="text-sm text-gray-600">Jawaban Benar</div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{summary.wrongAnswers}</div>
                <div className="text-sm text-gray-600">Jawaban Salah</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-gray-600">{summary.totalQuestions}</div>
                <div className="text-sm text-gray-600">Total Soal</div>
              </div>
            </div>

            {/* Passing Score Info */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-800">
                <strong>Nilai Minimum:</strong> {summary.passingScore}% • 
                <strong> Nilai Anda:</strong> {summary.percentage}%
              </p>
            </div>

            {/* Certificate Section */}
            {summary.canGetCertificate && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-yellow-600 mr-3" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Sertifikat Tersedia!</h3>
                      <p className="text-sm text-gray-600">
                        Anda mendapatkan nilai {summary.percentage}% dan berhak mendapatkan sertifikat
                      </p>
                      {certification && (
                        <p className="text-xs text-green-600 mt-1">
                          No. Sertifikat: {certification.certificate_number}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={goToCertificate}
                    className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Lihat Sertifikat
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => alert('Kembali ke halaman modul')}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Kembali ke Modul
              </button>
              {!summary.passed && (
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Ulangi Quiz
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz not started
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{quiz.title}</h1>
              <p className="text-gray-600">Siap untuk memulai quiz?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{quiz.questions.length}</div>
                <div className="text-sm text-gray-600">Pertanyaan</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{quiz.passing_score}%</div>
                <div className="text-sm text-gray-600">Nilai Minimum</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {timeLeft ? `${Math.floor(timeLeft / 60)} menit` : 'Unlimited'}
                </div>
                <div className="text-sm text-gray-600">Waktu</div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Petunjuk:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Jawab semua pertanyaan dengan teliti</li>
                <li>• Nilai minimum untuk lulus adalah {quiz.passing_score}%</li>
                <li>• Nilai 80% ke atas akan mendapatkan sertifikat</li>
                <li>• Quiz hanya bisa dikerjakan sekali</li>
                {timeLeft && <li>• Waktu akan berjalan setelah quiz dimulai</li>}
              </ul>
            </div>

            <div className="text-center">
              <button
                onClick={startQuiz}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
              >
                Mulai Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz in progress
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
            {timeLeft && (
              <div className="flex items-center text-red-600">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Pertanyaan {currentQuestion + 1} dari {quiz.questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-green-600 text-white'
                    : userAnswers[index] !== null
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {question.question}
          </h2>
          
          <div className="space-y-3">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  userAnswers[currentQuestion] === index
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{answer}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center">
            <button
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sebelumnya
            </button>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {userAnswers.filter(answer => answer !== null).length} dari {quiz.questions.length} terjawab
              </p>
            </div>
            
            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Mengirim...' : 'Selesai'}
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Selanjutnya
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;