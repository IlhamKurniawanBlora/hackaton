import React, { useState, useEffect } from 'react';
import { Eye, Search, RefreshCw, BookOpen, Clock, Calendar, AlertCircle } from 'lucide-react';
import { adminModuleService } from '~/utils/adminData';

const ModuleDataQuizzAdminPage = () => {
  const [modules, setModules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredModules, setFilteredModules] = useState([]);
  const [error, setError] = useState(null);

  // Fetch modules data menggunakan adminModuleService
  const fetchModules = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await adminModuleService.getModules();
      
      if (result.success) {
        setModules(result.data);
        setFilteredModules(result.data);
      } else {
        setError(result.error);
        setModules([]);
        setFilteredModules([]);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mengambil data module');
      setModules([]);
      setFilteredModules([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchModules();
  }, []);

  // Filter modules berdasarkan search term
  useEffect(() => {
    const filtered = modules.filter(module =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredModules(filtered);
  }, [searchTerm, modules]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = async () => {
    await fetchModules();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetail = (moduleId) => {
    // Navigasi ke halaman detail module
    window.location.href = `/admin/quizzes/${moduleId}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Data Module</h1>
              <p className="text-gray-600 mt-1">Kelola semua module pembelajaran</p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Cari module..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={20} />
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Modules Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* Image */}
                <div className="h-48 bg-gray-200 relative">
                  <img
                    src={module.image_url || ''}
                    alt={module.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs flex items-center">
                    <BookOpen size={12} className="mr-1" />
                    {module.modules_count || 0} Detail
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{module.description}</p>
                  
                  {/* Meta Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={14} className="mr-2" />
                      <span>Dibuat: {formatDate(module.created_at)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={14} className="mr-2" />
                      <span>Update: {formatDate(module.updated_at)}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetail(module.id)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Eye size={16} />
                    <span>Lihat Quizz</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'Tidak ada module yang ditemukan' : 'Belum ada module'}
            </h3>
            <p className="text-gray-500">
              {searchTerm ? 'Coba gunakan kata kunci yang berbeda' : 'Mulai dengan menambahkan module pertama'}
            </p>
          </div>
        )}

        {/* Stats */}
        {!isLoading && !error && filteredModules.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{modules.length}</div>
                <div className="text-sm text-gray-500">Total Module</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {modules.reduce((total, module) => total + (module.modules_count || 0), 0)}
                </div>
                <div className="text-sm text-gray-500">Total Detail</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {modules.length > 0 
                    ? (modules.reduce((total, module) => total + (module.modules_count || 0), 0) / modules.length).toFixed(1)
                    : 0
                  }
                </div>
                <div className="text-sm text-gray-500">Rata-rata Detail</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDataQuizzAdminPage;