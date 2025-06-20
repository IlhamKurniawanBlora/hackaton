import React, { useState, useEffect } from 'react';

// Enhanced Feature Grid Component
function FeatureGrid() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id'));
            setVisibleCards(prev => [...prev, cardId]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cardElements = document.querySelectorAll('.feature-card-animated');
    cardElements.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      id: 1,
      title: 'Modul Edukasi Interaktif',
      description: 'Pelajari konsep dasar hingga aplikasi canggih teknologi nuklir di pertanian dengan modul yang mudah dipahami.',
      link: '/modules',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"/>
        </svg>
      ),
      gradient: 'from-emerald-500 to-green-600',
      bgColor: 'from-emerald-50 to-green-50'
    },
    {
      id: 2,
      title: 'Simulasi Praktis',
      description: 'Eksperimen virtual dengan skenario iradiasi benih, pengawetan makanan, dan analisis tanah secara aman.',
      link: '/simulations',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"/>
        </svg>
      ),
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50'
    },
    {
      id: 3,
      title: 'Chatbot Edukasi AI',
      description: 'Dapatkan jawaban instan untuk pertanyaan Anda seputar agrinuklir 24/7 dengan asisten AI cerdas.',
      link: '/chatbot',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
        </svg>
      ),
      gradient: 'from-blue-500 to-purple-600',
      bgColor: 'from-blue-50 to-purple-50'
    },
    {
      id: 4,
      title: 'Sertifikat Kompetensi',
      description: 'Raih pengakuan atas pengetahuan yang Anda peroleh setelah menyelesaikan setiap modul dan kuisnya.',
      link: '/certificates',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      id: 5,
      title: 'Forum Komunitas Aktif',
      description: 'Berinteraksi dengan sesama pegiat pertanian, bertanya, dan berbagi pengalaman dengan ahli di bidangnya.',
      link: '/forum',
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
        </svg>
      ),
      gradient: 'from-teal-500 to-emerald-600',
      bgColor: 'from-teal-50 to-emerald-50'
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-emerald-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-emerald-700">Fitur </span>
            <span className="text-orange-600">Unggulan</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi berbagai fitur canggih yang dirancang khusus untuk memberikan pengalaman pembelajaran terbaik
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              data-card-id={feature.id}
              className={`feature-card-animated group relative bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 transform transition-all duration-700 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                visibleCards.includes(feature.id) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: visibleCards.includes(feature.id) ? `${index * 150}ms` : '0ms',
              }}
              onMouseEnter={() => setHoveredCard(feature.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Icon Container */}
              <div className={`relative w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 text-white shadow-lg transform transition-transform duration-300 ${
                hoveredCard === feature.id ? 'rotate-12 scale-110' : ''
              }`}>
                {feature.icon}
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-50 -z-10 transform transition-transform duration-300 ${
                  hoveredCard === feature.id ? 'scale-150' : 'scale-100'
                }`}></div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Link Button */}
                <button
                  onClick={() => window.location.href = feature.link}
                  className={`inline-flex items-center space-x-2 bg-gradient-to-r ${feature.gradient} text-white px-6 py-3 rounded-lg font-semibold shadow-lg transform transition-all duration-300 hover:shadow-xl hover:scale-105 group-hover:shadow-2xl`}
                >
                  <span>Jelajahi</span>
                  <svg 
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      hoveredCard === feature.id ? 'translate-x-1' : ''
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
              {hoveredCard === feature.id && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full opacity-60 animate-ping`}
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
          ))}
        </div>
      </div>
    </section>
  );
}

// Combined Export
export default FeatureGrid;