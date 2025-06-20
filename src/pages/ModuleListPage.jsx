import React from 'react';
import { Link } from 'react-router-dom';
import modules from '../data/modules/modulesData';
import { ClockIcon, AcademicCapIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

function ModulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                <AcademicCapIcon className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Modul Edukasi AgriNuklir
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Pelajari teknologi nuklir untuk pertanian modern dan berkelanjutan
            </p>
            <div className="mt-6 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2">
                <span className="text-sm font-medium">
                  {modules.length} Modul Tersedia
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <Link to={`/modules/${module.id}`} key={module.id} className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                {/* Module Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={module.image}
                    alt={module.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                      module.level === 'Pemula' 
                        ? 'bg-green-500/90 text-white' 
                        : module.level === 'Menengah'
                        ? 'bg-yellow-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                    }`}>
                      {module.level}
                    </span>
                  </div>

                  {/* Module Number */}
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-700">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Module Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {module.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {module.shortDescription}
                  </p>

                  {/* Duration and Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-500">
                      <ClockIcon className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{module.duration}</span>
                    </div>
                    
                    <div className="flex items-center text-green-600 group-hover:text-green-700 transition-colors">
                      <span className="text-sm font-semibold mr-1">Mulai Belajar</span>
                      <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar (Optional) */}
                <div className="h-1 bg-gray-100">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State (jika tidak ada modul) */}
        {modules.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <AcademicCapIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Belum Ada Modul Tersedia
            </h3>
            <p className="text-gray-500">
              Modul edukasi AgriNuklir akan segera ditambahkan.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Siap Memulai Perjalanan Belajar Anda?
          </h2>
          <p className="text-white/90 mb-6 max-w-xl mx-auto">
            Jelajahi teknologi nuklir untuk pertanian dan tingkatkan pengetahuan Anda dalam AgriNuklir
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
              Panduan Memulai
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModulesPage;