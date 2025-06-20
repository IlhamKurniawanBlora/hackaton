import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Play, 
  Award, 
  ExternalLink,
  Clock,
  GraduationCap,
  Target,
  CheckCircle,
  BookOpen,
  Users,
  Star,
  Download,
  Share2
} from 'lucide-react';

// Data simulasi
const simulationsData = [
  {
    id: 'sim-iradiasi-benih-optimal',
    title: 'Simulasi Iradiasi Benih Optimal',
    description: 'Eksperimen dengan dosis radiasi berbeda untuk melihat efek pada pertumbuhan dan hasil benih tanaman X.',
    content: 'Dalam simulasi ini, Anda akan dapat memilih jenis benih, mengatur dosis radiasi (rendah, sedang, tinggi), dan mengamati perkecambahan serta pertumbuhan awal dalam jangka waktu virtual. Perhatikan bagaimana dosis yang berbeda dapat mempengaruhi vigor benih dan resistensi terhadap kondisi lingkungan tertentu. Tujuan simulasi ini adalah untuk membantu Anda memahami konsep optimasi dosis radiasi untuk hasil terbaik.',
    link: 'https://www.google.com',
    duration: '30 Menit',
    imageUrl: '/assets/images/simulation-1.jpg',
    level: 'Pemula',
    objectives: [
      'Memahami efek dosis radiasi pada perkecambahan benih',
      'Menganalisis pertumbuhan tanaman dengan variasi dosis',
      'Menentukan dosis optimal untuk hasil maksimal'
    ],
    rating: 4.8,
    participants: '2.1k',
    difficulty: 'Mudah'
  },
  {
    id: 'sim-pengawetan-makanan-stroberi',
    title: 'Simulasi Pengawetan Makanan (Stroberi)',
    description: 'Amati efek iradiasi pada masa simpan stroberi dibandingkan dengan metode konvensional.',
    content: 'Simulasi ini memvisualisasikan perbedaan masa simpan stroberi yang diiradiasi dan yang tidak diiradiasi. Anda akan melihat grafik pertumbuhan mikroba dan perubahan kualitas (misal: busuk, perubahan warna) seiring waktu. Ini akan memberikan gambaran jelas tentang efektivitas iradiasi sebagai metode pengawetan pangan.',
    link: 'https://www.bing.com',
    duration: '45 Menit',
    imageUrl: '/assets/images/simulation-2.jpg',
    level: 'Menengah',
    objectives: [
      'Membandingkan metode pengawetan konvensional vs iradiasi',
      'Menganalisis pertumbuhan mikroba pada makanan',
      'Mengevaluasi efektivitas iradiasi untuk pengawetan'
    ],
    rating: 4.6,
    participants: '1.8k',
    difficulty: 'Sedang'
  },
  {
    id: 'sim-analisis-penyerapan-hara',
    title: 'Analisis Penyerapan Hara Tanah dengan Isotop',
    description: 'Pahami bagaimana tanaman menyerap nutrisi dari tanah menggunakan pelacak isotop.',
    content: 'Simulasi interaktif ini akan menunjukkan pergerakan nutrisi berlabel isotop di dalam tanah dan bagaimana akar tanaman menyerapnya. Anda bisa mengubah jenis tanah, ketersediaan air, dan jenis pupuk untuk melihat dampaknya pada efisiensi penyerapan nutrisi, sebuah konsep penting dalam pertanian presisi.',
    link: 'https://www.yahoo.com',
    duration: '60 Menit',
    imageUrl: '/assets/images/simulation-3.jpg',
    level: 'Lanjutan',
    objectives: [
      'Memahami pergerakan nutrisi dalam tanah',
      'Menganalisis efisiensi penyerapan hara tanaman',
      'Menerapkan konsep pertanian presisi'
    ],
    rating: 4.9,
    participants: '1.2k',
    difficulty: 'Menantang'
  },
  {
    id: 'sim-manajemen-limbah-radioaktif',
    title: 'Manajemen Limbah Radioaktif Pertanian',
    description: 'Pelajari proses penanganan dan penyimpanan limbah radioaktif dari aplikasi pertanian.',
    content: 'Simulasi ini akan membimbing Anda melalui tahapan pengelolaan limbah radioaktif tingkat rendah yang dihasilkan dari aplikasi pertanian (misalnya, dari alat ukur isotop). Anda akan belajar tentang klasifikasi limbah, metode dekomposisi atau pengemasan, hingga penyimpanan akhir yang aman sesuai dengan protokol internasional.',
    link: 'https://www.duckduckgo.com',
    duration: '50 Menit',
    imageUrl: '/assets/images/simulation-4.jpg',
    level: 'Lanjutan',
    objectives: [
      'Memahami klasifikasi limbah radioaktif pertanian',
      'Menguasai prosedur penanganan yang aman',
      'Menerapkan protokol penyimpanan internasional'
    ],
    rating: 4.7,
    participants: '890',
    difficulty: 'Menantang'
  },
];

const levelColors = {
  'Pemula': 'bg-green-100 text-green-800 border-green-200',
  'Menengah': 'bg-orange-100 text-orange-800 border-orange-200',
  'Lanjutan': 'bg-red-100 text-red-800 border-red-200',
};

const difficultyColors = {
  'Mudah': 'text-green-600',
  'Sedang': 'text-orange-600',
  'Menantang': 'text-red-600',
};

function SimulationDetailPage() {
  // Simulasi menggunakan ID pertama sebagai default
  const simulationId = 'sim-iradiasi-benih-optimal';
  const simulation = simulationsData.find(s => s.id === simulationId);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!simulation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">Simulasi Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">
            Maaf, simulasi yang Anda cari tidak tersedia.
          </p>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali ke Daftar Simulasi
          </button>
        </div>
      </div>
    );
  }

  const handleCompleteSimulation = () => {
    const userName = prompt("Masukkan nama lengkap Anda untuk sertifikat:");

    if (userName && userName.trim()) {
      setIsCompleted(true);
      // Simulasi download sertifikat
      setTimeout(() => {
        alert(`Sertifikat untuk ${userName} telah berhasil dibuat!`);
      }, 1000);
    } else {
      alert("Nama diperlukan untuk menerbitkan sertifikat.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Daftar Simulasi
        </button>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-64 bg-gradient-to-r from-green-600 to-orange-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <BookOpen className="w-4 h-4" />
                  Simulasi Interaktif
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {simulation.title}
                </h1>
                <p className="text-green-100 max-w-2xl mx-auto">
                  {simulation.description}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-900">{simulation.rating}</span>
                  <span className="text-gray-600">/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{simulation.participants} peserta</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{simulation.duration}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${levelColors[simulation.level]}`}>
                  {simulation.level}
                </span>
                <span className={`font-medium ${difficultyColors[simulation.difficulty]}`}>
                  {simulation.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-green-600" />
                Deskripsi Simulasi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {simulation.content}
              </p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="w-6 h-6 text-orange-600" />
                Tujuan Pembelajaran
              </h2>
              <div className="space-y-4">
                {simulation.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700">{objective}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Petunjuk Pelaksanaan</h3>
              <ol className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">1.</span>
                  Klik "Mulai Simulasi" untuk membuka simulasi di tab baru
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">2.</span>
                  Ikuti semua instruksi dalam simulasi dengan cermat
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">3.</span>
                  Setelah selesai, kembali ke halaman ini
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-blue-600">4.</span>
                  Klik "Selesaikan Simulasi" untuk mendapatkan sertifikat
                </li>
              </ol>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Mulai Simulasi</h3>
              
              <div className="space-y-4">
                <a
                  href={simulation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Mulai Simulasi
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCompleteSimulation}
                  className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800 border-2 border-green-200'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                  }`}
                  disabled={isCompleted}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Simulasi Selesai
                    </>
                  ) : (
                    <>
                      <Award className="w-5 h-5" />
                      Selesaikan & Dapatkan Sertifikat
                    </>
                  )}
                </button>

                {isCompleted && (
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Sertifikat
                  </button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <button className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Bagikan Simulasi
                </button>
              </div>
            </div>

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-green-100 to-orange-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Progress Anda</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Simulasi Selesai</span>
                  <span className="font-semibold text-green-600">
                    {isCompleted ? '1/1' : '0/1'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: isCompleted ? '100%' : '0%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  {isCompleted ? 'Selamat! Anda telah menyelesaikan simulasi.' : 'Mulai simulasi untuk melanjutkan.'}
                </p>
              </div>
            </div>

            {/* Certificate Preview */}
            {isCompleted && (
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                <div className="text-center">
                  <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Sertifikat Tersedia!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Anda telah berhasil menyelesaikan simulasi dan berhak mendapatkan sertifikat.
                  </p>
                  <div className="bg-white rounded-lg p-3 border-2 border-dashed border-yellow-300">
                    <div className="text-xs text-gray-500 mb-1">Simulasi:</div>
                    <div className="font-semibold text-gray-900 text-sm">{simulation.title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Diselesaikan: {new Date().toLocaleDateString('id-ID')}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationDetailPage;