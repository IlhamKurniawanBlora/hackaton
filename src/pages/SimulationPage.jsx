import React from 'react';
import { 
  Clock, 
  Play, 
  BookOpen, 
  Zap, 
  Leaf, 
  Beaker,
  Shield,
  TrendingUp,
  Star,
  ChevronRight
} from 'lucide-react';

// Data simulasi
const simulationsData = [
  {
    id: 'optimalisasi-hasil-pertanian-radiasi',
    slug: 'optimalisasi-hasil-pertanian-radiasi',
    title: 'Optimalisasi Hasil Pertanian melalui Teknologi Radiasi',
    description: 'Simulasi edukatif interaktif yang mengajarkan bagaimana radiasi digunakan untuk memicu mutasi tanaman secara terarah guna meningkatkan hasil panen dan ketahanan hama.',
    content: 'Pengguna bisa melakukan eksperimen memilih jenis tanaman dan dosis radiasi untuk menghasilkan varietas unggul, serta memonitor hasil panen dan tingkat serangan hama melalui dashboard analitik.',
    duration: '45 Menit',
    level: 'Menengah',
    icon: Leaf,
    color: 'green',
    popularity: 4.8,
    users: '2.3k'
  }
];

const levelColors = {
  'Pemula': 'bg-green-100 text-green-800 border-green-200',
  'Menengah': 'bg-orange-100 text-orange-800 border-orange-200',
  'Lanjutan': 'bg-red-100 text-red-800 border-red-200',
};

const iconColors = {
  'green': 'text-green-600 bg-green-100',
  'orange': 'text-orange-600 bg-orange-100',
  'blue': 'text-blue-600 bg-blue-100',
  'purple': 'text-purple-600 bg-purple-100',
};

function SimulationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Play className="w-4 h-4" />
            Simulasi Interaktif
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Simulasi AgriNuklir
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi simulasi interaktif untuk memahami aplikasi teknologi nuklir dalam pertanian. 
            Setiap simulasi dirancang untuk memberikan pengalaman pembelajaran yang mendalam dan praktis.
          </p>
        </div>

        {/* Stats Section - Removed */}

        {/* Simulations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {simulationsData.map((simulation) => {
            const IconComponent = simulation.icon;
            return (
              <div 
                key={simulation.id} 
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 overflow-hidden"
              >
                {/* Card Header */}
                <div className="relative p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-4 rounded-2xl ${iconColors[simulation.color]}`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{simulation.popularity}</span>
                      </div>
                      <span className="text-sm text-gray-500">({simulation.users})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {simulation.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {simulation.description}
                  </p>
                </div>

                {/* Card Content */}
                <div className="px-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${levelColors[simulation.level]}`}>
                      {simulation.level}
                    </span>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{simulation.duration}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    onClick={() => {
                      window.location.href = `/simulations/${simulation.slug}`;
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5" />
                    Mulai Simulasi
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Siap Memulai Perjalanan Pembelajaran?
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pengguna lain yang telah merasakan manfaat simulasi interaktif kami. 
              Tingkatkan pemahaman Anda tentang teknologi nuklir dalam pertanian.
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-lg">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulationPage;