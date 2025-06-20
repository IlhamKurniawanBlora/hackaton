import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import modules from '../data/modules/modulesData';
import quizzes from '../data/quizzes';
import { 
  ArrowLeftIcon, 
  BookOpenIcon, 
  QuestionMarkCircleIcon,
  ClockIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  PlayIcon,
  DocumentTextIcon,
  PhotoIcon,
  ListBulletIcon
} from '@heroicons/react/24/outline';

function ModuleDetailPage() {
  const { moduleId } = useParams();
  const [readingProgress, setReadingProgress] = useState(0);
  const [completedSections, setCompletedSections] = useState(new Set());
  
  const module = modules.find(m => m.id === moduleId);
  const relatedQuiz = quizzes.find(q => q.moduleRef === moduleId);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSectionComplete = (index) => {
    const newCompleted = new Set(completedSections);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompletedSections(newCompleted);
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <DocumentTextIcon className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Modul Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">Maaf, modul yang Anda cari tidak tersedia.</p>
          <Link 
            to="/modules" 
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Kembali ke Daftar Modul
          </Link>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.round((completedSections.size / module.content.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link 
            to="/modules" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Daftar Modul
          </Link>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Module Info */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-4 ${
                  module.level === 'Pemula' 
                    ? 'bg-green-500/20 text-green-100 border border-green-400/30' 
                    : module.level === 'Menengah'
                    ? 'bg-yellow-500/20 text-yellow-100 border border-yellow-400/30'
                    : 'bg-red-500/20 text-red-100 border border-red-400/30'
                }`}>
                  {module.level}
                </span>
                <div className="flex items-center text-white/80">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">{module.duration}</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {module.title}
              </h1>
              
              <p className="text-xl text-white/90 leading-relaxed">
                {module.shortDescription}
              </p>
            </div>

            {/* Module Image */}
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <img
                  src={module.image}
                  alt={module.title}
                  className="w-full h-48 object-cover rounded-xl shadow-lg"
                />
                
                {/* Progress Card */}
                <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white/80">Progress Belajar</span>
                    <span className="text-sm font-bold text-white">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs text-white/70">
                    {completedSections.size} dari {module.content.length} bagian selesai
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Table of Contents */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <DocumentTextIcon className="w-6 h-6 mr-2 text-green-600" />
              Daftar Isi
            </h2>
            <div className="grid md:grid-cols-2 gap-2">
              {module.content.map((block, index) => {
                if (block.type === 'heading') {
                  return (
                    <div key={index} className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 text-xs font-bold ${
                        completedSections.has(index) 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {completedSections.has(index) ? '✓' : index + 1}
                      </div>
                      <span className="text-sm text-gray-700">{block.text}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Module Content */}
          <div className="space-y-8">
            {module.content.map((block, index) => {
              const isCompleted = completedSections.has(index);
              
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                  {block.type === 'heading' && (
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <BookOpenIcon className="w-6 h-6 mr-3" />
                          <h2 className="text-2xl font-bold">{block.text}</h2>
                        </div>
                        <button
                          onClick={() => toggleSectionComplete(index)}
                          className={`p-2 rounded-full transition-all ${
                            isCompleted 
                              ? 'bg-white text-green-600 shadow-lg' 
                              : 'bg-white/20 text-white hover:bg-white/30'
                          }`}
                        >
                          <CheckCircleIcon className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {block.type === 'paragraph' && (
                    <div className="p-6">
                      <div className="flex items-start">
                        <DocumentTextIcon className="w-5 h-5 mr-3 mt-1 text-gray-400 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed text-lg">{block.text}</p>
                      </div>
                    </div>
                  )}
                  
                  {block.type === 'image' && (
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <PhotoIcon className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">Ilustrasi</span>
                      </div>
                      <div className="relative rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={block.src} 
                          alt={block.alt} 
                          className="w-full h-auto object-cover"
                        />
                        {block.alt && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3">
                            <p className="text-sm">{block.alt}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {block.type === 'list' && (
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <ListBulletIcon className="w-5 h-5 mr-2 text-gray-500" />
                        <span className="text-sm font-medium text-gray-600">Poin Penting</span>
                      </div>
                      <ul className="space-y-3">
                        {block.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Call to Action */}
          {relatedQuiz && (
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full mr-4">
                    <QuestionMarkCircleIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Uji Pemahaman Anda!</h2>
                    <p className="text-white/90">
                      Selesaikan kuis "{relatedQuiz.title}" dan dapatkan sertifikat
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="flex items-center mb-4 text-white/80">
                      <AcademicCapIcon className="w-5 h-5 mr-2" />
                      <span className="text-sm">Sertifikat Digital Tersedia</span>
                    </div>
                    <p className="text-white/90 mb-6">
                      Buktikan penguasaan materi dengan menyelesaikan kuis interaktif dan dapatkan sertifikat kelulusan.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <Link 
                      to={`/quiz/${relatedQuiz.id}`} 
                      className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
                    >
                      <PlayIcon className="w-5 h-5 mr-2" />
                      Mulai Kuis Sekarang
                    </Link>
                    <p className="text-xs text-white/70 mt-2">
                      Estimasi waktu: 10-15 menit
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 flex justify-between items-center">
            <Link 
              to="/modules" 
              className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors inline-flex items-center"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Kembali ke Modul
            </Link>
            
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Progress Keseluruhan</div>
              <div className="text-2xl font-bold text-green-600">{progressPercentage}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetailPage;