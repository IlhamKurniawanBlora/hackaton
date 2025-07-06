import React, { useState, useEffect } from 'react';
import { fetchModules, fetchModulesByLevel } from '../utils/modules';

// Clock Icon Component
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

// User Icon Component
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

// Loading Component
const LoadingCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 animate-pulse">
    <div className="h-48 bg-gray-200"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="h-3 bg-gray-200 rounded mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

function ModulesPage() {
  const [modules, setModules] = useState([]);
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState('Semua');
  const [loading, setLoading] = useState(true);

  // Fetch modules data
  useEffect(() => {
    const loadModules = async () => {
      setLoading(true);
      try {
        let moduleData;
        if (selectedLevel === 'Semua') {
          moduleData = await fetchModules();
        } else {
          moduleData = await fetchModulesByLevel(selectedLevel);
        }
        setModules(moduleData);
        
      } catch (error) {
        console.error('Error loading modules:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModules();
  }, [selectedLevel]);

  // Intersection Observer for animations
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
  }, [modules]);

  const levels = ['Semua', 'Dasar', 'Menengah', 'Lanjut'];

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Dasar': return 'text-green-600 bg-green-100';
      case 'Menengah': return 'text-orange-600 bg-orange-100';
      case 'Lanjut': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleModuleClick = (module) => {
    // Use slug if available, otherwise fallback to id
    const identifier = module.slug || module.id;
    window.location.href = `/modules/${identifier}`;
    console.log(`Navigating to module: ${identifier}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-blue-700">Modul </span>
            <span className="text-indigo-600">Pembelajaran</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            Jelajahi berbagai modul pembelajaran yang dirancang untuk meningkatkan pengetahuan dan keterampilan Anda. 
            Dari tingkat dasar hingga mahir, semua tersedia dengan materi berkualitas tinggi.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedLevel === level
                  ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <LoadingCard key={index} />
            ))}
          </div>
        )}

        {/* Modules Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {modules.map((module, index) => (
              <div
                key={module.id}
                onClick={() => handleModuleClick(module)}
                className="block cursor-pointer"
              >
                <div
                  data-card-id={module.id}
                  className={`module-card-animated group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${
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
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-400 to-indigo-500">
                    {module.imageUrl ? (
                      <img 
                        src={module.imageUrl} 
                        alt={module.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookIcon className="w-16 h-16 text-white" />
                      </div>
                    )}
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getLevelBadgeColor(module.level)}`}>
                        {module.level}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 relative">
                    <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {module.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm line-clamp-3">
                      {module.description}
                    </p>

                    {/* Topics Tags */}
                    {module.topics && module.topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.slice(0, 2).map((topic, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            {topic}
                          </span>
                        ))}
                        {module.topics.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                            +{module.topics.length - 2}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <BookIcon className="w-4 h-4 mr-1" />
                        <span>{module.modules_count || 0} Bab</span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>Fleksibel</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    {module.instructor && (
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <UserIcon className="w-4 h-4 mr-1" />
                        <span>{module.instructor}</span>
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleModuleClick(module);
                      }}
                      className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-2"
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
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && modules.length === 0 && (
          <div className="text-center py-12">
            <BookIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Tidak ada modul ditemukan
            </h3>
            <p className="text-gray-500">
              Coba pilih filter level yang berbeda atau periksa kembali nanti.
            </p>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Siap Memulai Perjalanan Belajar Anda?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pembelajar yang telah meningkatkan keterampilan mereka 
              dengan modul pembelajaran berkualitas tinggi dari instruktur berpengalaman.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors transform hover:scale-105">
                Konsultasi Gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors transform hover:scale-105">
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