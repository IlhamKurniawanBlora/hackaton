import React, { useState, useEffect } from 'react';

// Clock Icon Component (replacing Heroicons dependency)
const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// Book Icon Component
const BookIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

// Star Icon Component
const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Atom Icon Component
const AtomIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
  </svg>
);

const dummyModules = [
  {
    id: '1',
    title: 'Pengantar Iradiasi Benih',
    description: 'Pelajari dasar-dasar iradiasi benih, proses mutasi tanaman, dan bagaimana teknologi nuklir meningkatkan varietas unggul untuk ketahanan pangan.',
    imageUrl: '/assets/images/module-benih.jpg',
    level: 'Dasar',
    duration: '2 jam',
    modules: 5,
    rating: 4.8,
    students: 1250,
    gradient: 'from-emerald-500 to-green-600',
    bgGradient: 'from-emerald-50 to-green-50',
    topics: ['Dasar Iradiasi', 'Mutasi Tanaman', 'Varietas Unggul']
  },
  {
    id: '2',
    title: 'Teknologi Pengawetan Makanan Nuclear',
    description: 'Pahami aplikasi teknologi nuklir untuk food irradiation, sterilisasi makanan, dan perpanjangan masa simpan produk pertanian.',
    imageUrl: '/assets/images/module-makanan.jpg',
    level: 'Menengah',
    duration: '3 jam',
    modules: 7,
    rating: 4.9,
    students: 980,
    gradient: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    topics: ['Food Irradiation', 'Sterilisasi', 'Preservation']
  },
  {
    id: '3',
    title: 'Isotop Tracer dalam Analisis Tanah',
    description: 'Selami penggunaan isotop radioaktif sebagai tracer untuk memahami dinamika nutrisi tanah, siklus hara, dan efisiensi pemupukan.',
    imageUrl: '/assets/images/module-tanah.jpg',
    level: 'Lanjut',
    duration: '4 jam',
    modules: 9,
    rating: 4.7,
    students: 650,
    gradient: 'from-blue-500 to-purple-600',
    bgGradient: 'from-blue-50 to-purple-50',
    topics: ['Isotop Tracer', 'Siklus Hara', 'Nutrisi Tanah']
  },
  {
    id: '4',
    title: 'Keselamatan Radiasi Pertanian',
    description: 'Pelajari protokol keselamatan, regulasi BAPETEN, manajemen risiko, dan etika dalam penerapan teknologi nuklir di sektor pertanian.',
    imageUrl: '/assets/images/module-safety.jpg',
    level: 'Dasar',
    duration: '2.5 jam',
    modules: 6,
    rating: 4.6,
    students: 1100,
    gradient: 'from-yellow-500 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    topics: ['Protokol Keselamatan', 'Regulasi BAPETEN', 'Manajemen Risiko']
  },
  {
    id: '5',
    title: 'Teknik Sterile Insect Technique (SIT)',
    description: 'Eksplorasi teknologi pengendalian hama ramah lingkungan menggunakan serangga jantan steril hasil iradiasi gamma.',
    imageUrl: '/assets/images/module-sit.jpg',
    level: 'Lanjut',
    duration: '3.5 jam',
    modules: 8,
    rating: 4.8,
    students: 720,
    gradient: 'from-teal-500 to-emerald-600',
    bgGradient: 'from-teal-50 to-emerald-50',
    topics: ['SIT Technology', 'Pengendalian Hama', 'Iradiasi Gamma']
  },
  {
    id: '6',
    title: 'Aplikasi Radioisotop dalam Hidrologi Pertanian',
    description: 'Memahami penggunaan isotop untuk studi pergerakan air tanah, efisiensi irigasi, dan manajemen sumber daya air pertanian.',
    imageUrl: '/assets/images/module-water.jpg',
    level: 'Menengah',
    duration: '3 jam',
    modules: 7,
    rating: 4.5,
    students: 540,
    gradient: 'from-cyan-500 to-blue-600',
    bgGradient: 'from-cyan-50 to-blue-50',
    topics: ['Hidrologi Isotop', 'Manajemen Air', 'Efisiensi Irigasi']
  }
];

function ModulesPage() {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('Semua');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            setVisibleCards(prev => [...prev, cardId]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const cardElements = document.querySelectorAll('.module-card-animated');
    cardElements.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const levels = ['Semua', 'Dasar', 'Menengah', 'Lanjut'];
  const filteredModules = selectedLevel === 'Semua' 
    ? dummyModules 
    : dummyModules.filter(module => module.level === selectedLevel);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-green-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-blue-300 to-purple-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <AtomIcon className="w-12 h-12 text-emerald-600 mr-4" />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="text-emerald-700">Modul </span>
              <span className="text-orange-600">AgriNuklir</span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Jelajahi berbagai modul pembelajaran teknologi nuklir untuk pertanian modern. 
            Dari dasar-dasar iradiasi hingga aplikasi lanjutan dalam agribisnis berkelanjutan.
          </p>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl font-bold text-emerald-600">6</div>
              <div className="text-gray-600">Modul Tersedia</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl font-bold text-orange-600">5,240+</div>
              <div className="text-gray-600">Peserta Aktif</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
              <div className="text-3xl font-bold text-blue-600">4.7</div>
              <div className="text-gray-600">Rating Rata-rata</div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg'
                  : 'bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-white/50'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredModules.map((module, index) => (
            <div
              key={module.id}
              onClick={() => {
                // Handle navigation - replace with your routing logic
                console.log(`Navigate to /modules/${module.id}`);
              }}
              className="block cursor-pointer"
            >
              <div
                data-card-id={module.id}
                className={`module-card-animated group relative bg-gradient-to-br ${module.bgGradient} backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl border border-white/50 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                  visibleCards.includes(module.id) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: visibleCards.includes(module.id) ? `${index * 100}ms` : '0ms',
                }}
                onMouseEnter={() => setHoveredCard(module.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${module.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${module.gradient} opacity-90`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AtomIcon className="w-16 h-16 text-white" />
                  </div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 bg-white/90 text-xs font-semibold rounded-full ${
                      module.level === 'Dasar' ? 'text-green-600' :
                      module.level === 'Menengah' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {module.level}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 left-4 flex items-center bg-white/90 rounded-full px-2 py-1">
                    <StarIcon className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-xs font-semibold text-gray-700">{module.rating}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors line-clamp-2">
                    {module.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors text-sm line-clamp-3">
                    {module.description}
                  </p>

                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.topics.slice(0, 2).map((topic, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-white/70 text-gray-600 rounded-full">
                        {topic}
                      </span>
                    ))}
                    {module.topics.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-white/70 text-gray-600 rounded-full">
                        +{module.topics.length - 2}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <BookIcon className="w-4 h-4 mr-1" />
                      <span>{module.modules} Bab</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      <span>{module.duration}</span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mb-6">
                    {module.students.toLocaleString()} peserta terdaftar
                  </div>

                  {/* Action Button */}
                  <button
                    className={`w-full bg-gradient-to-r ${module.gradient} text-white py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 group-hover:shadow-2xl flex items-center justify-center space-x-2`}
                  >
                    <span>Mulai Belajar</span>
                    <svg 
                      className={`w-4 h-4 transform transition-transform duration-300 ${
                        hoveredCard === module.id ? 'translate-x-1' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>

                {/* Floating Particles Effect */}
                {hoveredCard === module.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${module.gradient} rounded-full opacity-60 animate-ping`}
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${1 + Math.random()}s`
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-8 shadow-2xl border border-white/50 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Siap Menjadi Ahli AgriNuklir?
            </h3>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan petani dan peneliti yang telah meningkatkan produktivitas pertanian mereka dengan teknologi nuklir yang aman dan berkelanjutan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors transform hover:scale-105">
                Konsultasi Gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors transform hover:scale-105">
                Download Panduan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModulesPage;