import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Award, MessageSquare, Star, ArrowRight, Users, Calendar } from 'lucide-react';

const AgriNuclearCertificationFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState(new Set());

  // Handle scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(entry.target.getAttribute('data-step'));
            setVisibleSteps(prev => new Set(prev).add(stepIndex));
          }
        });
      },
      { threshold: 0.1 }
    );

    const stepElements = document.querySelectorAll('[data-step]');
    stepElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: 1,
      title: "Akses Modules",
      description: "Daftar dan akses modul pembelajaran agri nuclear",
      icon: BookOpen,
      color: "green",
      details: [
        "Pendaftaran akun pembelajaran",
        "Akses ke perpustakaan modul",
        "Materi dasar teknologi nuklir pertanian"
      ]
    },
    {
      id: 2,
      title: "Baca Modules",
      description: "Pelajari semua materi yang tersedia secara menyeluruh",
      icon: FileText,
      color: "green",
      details: [
        "Radioisotop dalam pertanian",
        "Teknik mutasi tanaman",
        "Keamanan radiasi"
      ]
    },
    {
      id: 3,
      title: "Mengerjakan Quiz",
      description: "Uji pemahaman dengan quiz di setiap modul",
      icon: Star,
      color: "purple",
      details: [
        "Quiz per modul (10-15 soal)",
        "Soal pilihan ganda dan essay",
        "Batas waktu pengerjaan"
      ]
    },
    {
      id: 4,
      title: "Dapatkan Nilai Standard",
      description: "Mencapai nilai minimum 75 untuk lulus",
      icon: Award,
      color: "yellow",
      details: [
        "Nilai minimum: 75/100",
        "Evaluasi komprehensif",
        "Feedback detail per soal"
      ]
    },
    {
      id: 5,
      title: "Dapatkan Sertifikat",
      description: "Terima sertifikat kompetensi resmi",
      icon: Award,
      color: "red",
      details: [
        "Sertifikat digital terakreditasi",
        "QR code untuk verifikasi",
        "Berlaku selama 3 tahun"
      ]
    },
    {
      id: 6,
      title: "Komentar di Module",
      description: "Berikan feedback dan diskusi dengan komunitas",
      icon: MessageSquare,
      color: "indigo",
      details: [
        "Rating dan review modul",
        "Diskusi dengan peserta lain",
        "Berbagi pengalaman praktis"
      ]
    }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      green: isActive ? 'bg-green-100 border-green-400 shadow-lg' : 'bg-green-50 border-green-200',
      green: isActive ? 'bg-green-100 border-green-400 shadow-lg' : 'bg-green-50 border-green-200',
      purple: isActive ? 'bg-purple-100 border-purple-400 shadow-lg' : 'bg-purple-50 border-purple-200',
      yellow: isActive ? 'bg-yellow-100 border-yellow-400 shadow-lg' : 'bg-yellow-50 border-yellow-200',
      red: isActive ? 'bg-red-100 border-red-400 shadow-lg' : 'bg-red-50 border-red-200',
      indigo: isActive ? 'bg-indigo-100 border-indigo-400 shadow-lg' : 'bg-indigo-50 border-indigo-200'
    };
    return colors[color] || 'bg-gray-50 border-gray-200';
  };

  const getIconColor = (color) => {
    const colors = {
      green: 'text-green-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      yellow: 'text-yellow-600',
      red: 'text-red-600',
      indigo: 'text-indigo-600'
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with scroll-based animation */}
        <div 
          className="text-center mb-8 transition-all duration-1000 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: Math.max(0, 1 - scrollY * 0.002)
          }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transform transition-all duration-700 hover:scale-110 hover:rotate-12">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 transform transition-all duration-500 hover:scale-105">
            Sertifikasi Kompetensi Agri Nuclear
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto transition-all duration-300 hover:text-gray-800">
            Ikuti 6 langkah terstruktur untuk mendapatkan sertifikat profesional
          </p>
        </div>

        {/* Steps Grid with scroll animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = activeStep === index;
            const isVisible = visibleSteps.has(index);
            
            return (
              <div
                key={step.id}
                data-step={index}
                className={`relative p-6 rounded-xl border-2 transition-all duration-700 cursor-pointer group
                  ${getColorClasses(step.color, isActive)}
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  hover:scale-105 hover:rotate-1 hover:shadow-2xl
                  hover:border-opacity-80 hover:bg-opacity-90
                  transform-gpu
                `}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
                onClick={() => setActiveStep(index)}
                onMouseEnter={() => {
                  // Add ripple effect on hover
                  const ripple = document.createElement('div');
                  ripple.className = 'absolute inset-0 rounded-xl bg-white opacity-20 scale-0 transition-transform duration-300';
                  ripple.style.animation = 'ripple 0.6s ease-out';
                }}
              >
                {/* Step Number with enhanced hover animation */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-700 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg group-hover:bg-gradient-to-r group-hover:from-green-50 group-hover:to-purple-50">
                  {step.id}
                </div>

                {/* Animated Arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-all duration-300 group-hover:text-gray-600 group-hover:translate-x-1">
                    <ArrowRight className="w-6 h-6 animate-pulse" />
                  </div>
                )}

                {/* Icon with enhanced animations */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg">
                  <IconComponent className={`w-6 h-6 ${getIconColor(step.color)} transition-all duration-300 group-hover:scale-125`} />
                </div>

                {/* Content with stagger animation */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2 transition-all duration-300 group-hover:text-gray-900 group-hover:translate-x-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 transition-all duration-300 group-hover:text-gray-700 group-hover:translate-x-1">
                  {step.description}
                </p>

                {/* Details with stagger animation */}
                <ul className="space-y-1">
                  {step.details.map((detail, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start text-xs text-gray-500 transition-all duration-300 group-hover:text-gray-600 group-hover:translate-x-2"
                      style={{
                        transitionDelay: `${idx * 50}ms`
                      }}
                    >
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0 transition-all duration-300 group-hover:bg-gray-600 group-hover:scale-150"></div>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Hover overlay effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"></div>
              </div>
            );
          })}
        </div>

        {/* Info Box with enhanced animations */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-green-100 rounded-xl p-6 border border-green-200 transition-all duration-500 hover:shadow-xl hover:scale-105 hover:bg-gradient-to-r hover:from-green-200 hover:to-green-200 group">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-lg">
              <Award className="w-4 h-4 text-white transition-all duration-300 group-hover:scale-125" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 transition-all duration-300 group-hover:text-gray-900 group-hover:translate-x-1">
                Manfaat Sertifikasi
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li className="transition-all duration-300 group-hover:text-gray-800 group-hover:translate-x-2 hover:scale-105">• Meningkatkan kredibilitas profesional di bidang agrikultur</li>
                <li className="transition-all duration-300 group-hover:text-gray-800 group-hover:translate-x-2 hover:scale-105" style={{transitionDelay: '50ms'}}>• Membuka peluang karir di instansi pemerintah dan swasta</li>
                <li className="transition-all duration-300 group-hover:text-gray-800 group-hover:translate-x-2 hover:scale-105" style={{transitionDelay: '100ms'}}>• Akses ke jaringan profesional agri nuclear Indonesia</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default AgriNuclearCertificationFlow;