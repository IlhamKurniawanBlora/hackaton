import React, { useState } from 'react';
import { BookOpen, FileText, Award, MessageSquare, Star, ArrowRight, Users, Calendar } from 'lucide-react';

const AgriNuclearCertificationFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Akses Modules",
      description: "Daftar dan akses modul pembelajaran agri nuclear",
      icon: BookOpen,
      color: "blue",
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
      blue: isActive ? 'bg-blue-100 border-blue-400 shadow-lg' : 'bg-blue-50 border-blue-200',
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
      blue: 'text-blue-600',
      green: 'text-green-600',
      purple: 'text-purple-600',
      yellow: 'text-yellow-600',
      red: 'text-red-600',
      indigo: 'text-indigo-600'
    };
    return colors[color] || 'text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <BookOpen className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Sertifikasi Kompetensi Agri Nuclear
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ikuti 6 langkah terstruktur untuk mendapatkan sertifikat profesional
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isActive = activeStep === index;
            
            return (
              <div
                key={step.id}
                className={`relative p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:scale-105 ${
                  getColorClasses(step.color, isActive)
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">
                  {step.id}
                </div>

                {/* Arrow for flow */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-white">
                  <IconComponent className={`w-6 h-6 ${getIconColor(step.color)}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {step.description}
                </p>

                {/* Details */}
                <ul className="space-y-1">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start text-xs text-gray-500">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Detail View */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-lg mr-4 flex items-center justify-center bg-${steps[activeStep].color}-100`}>
                {React.createElement(steps[activeStep].icon, { 
                  className: `w-6 h-6 ${getIconColor(steps[activeStep].color)}` 
                })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {steps[activeStep].title}
                </h2>
                <p className="text-gray-600">
                  Langkah {activeStep + 1} dari {steps.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">1,234 peserta</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">~2 minggu</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-700 text-lg mb-4">
              {steps[activeStep].description}
            </p>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Yang akan Anda pelajari:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps[activeStep].details.map((detail, idx) => (
                <div key={idx} className="flex items-start p-4 bg-gray-50 rounded-lg">
                  <div className={`w-2 h-2 bg-${steps[activeStep].color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}></div>
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sebelumnya
            </button>
            
            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Selanjutnya
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
              <Award className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Manfaat Sertifikasi
              </h3>
              <ul className="text-gray-700 space-y-1">
                <li>• Diakui oleh Badan Tenaga Nuklir Nasional (BATAN)</li>
                <li>• Meningkatkan kredibilitas profesional di bidang agrikultur</li>
                <li>• Membuka peluang karir di instansi pemerintah dan swasta</li>
                <li>• Akses ke jaringan profesional agri nuclear Indonesia</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriNuclearCertificationFlow;