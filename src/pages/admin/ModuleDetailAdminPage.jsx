import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, BookOpen, Clock, Calendar, AlertCircle } from 'lucide-react';
import { adminModuleService } from '~/utils/adminData';
import ModuleDetailForm from '~/components/admin/ModuleDetailForm';
import { useParams } from 'react-router-dom';

const ModuleDetailAdminPage = ({ moduleId }) => {
    const [module, setModule] = useState(null);
    const [moduleDetails, setModuleDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingDetail, setEditingDetail] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Ambil moduleId dari params jika tidak ada di props
    const params = useParams();
    const effectiveModuleId = moduleId || params.moduleId;

    // Debugging: log state changes
    useEffect(() => {
        console.log('effectiveModuleId:', effectiveModuleId);
        console.log('module:', module);
        console.log('moduleDetails:', moduleDetails);
        console.log('isLoading:', isLoading);
        console.log('showForm:', showForm);
        console.log('editingDetail:', editingDetail);
        console.log('error:', error);
        console.log('isSubmitting:', isSubmitting);
    }, [effectiveModuleId, module, moduleDetails, isLoading, showForm, editingDetail, error, isSubmitting]);

    // Fetch module data
    const fetchModuleData = async () => {
        if (!effectiveModuleId) {
            setError('Module ID tidak ditemukan');
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log('Fetching module data for ID:', effectiveModuleId);
            
            const moduleResult = await adminModuleService.getModuleById(effectiveModuleId);
            if (moduleResult.success) {
                setModule(moduleResult.data);
                console.log('Module data loaded:', moduleResult.data);
            } else {
                setError(moduleResult.error);
                console.error('Error loading module:', moduleResult.error);
                return;
            }

            const detailsResult = await adminModuleService.getModuleDetails(effectiveModuleId);
            if (detailsResult.success) {
                setModuleDetails(detailsResult.data);
                console.log('Module details loaded:', detailsResult.data);
            } else {
                setError(detailsResult.error);
                console.error('Error loading module details:', detailsResult.error);
            }
        } catch (err) {
            console.error('Exception while fetching module data:', err);
            setError('Terjadi kesalahan saat mengambil data module');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log('Effect triggered with effectiveModuleId:', effectiveModuleId);
        if (effectiveModuleId) {
            fetchModuleData();
        } else {
            console.warn('No moduleId available');
            setError('Module ID tidak ditemukan');
            setIsLoading(false);
        }
    }, [effectiveModuleId]); // Menggunakan effectiveModuleId sebagai dependency

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleAddDetail = () => {
    setEditingDetail(null);
    setShowForm(true);
  };

  const handleEditDetail = (detail) => {
    setEditingDetail(detail);
    setShowForm(true);
  };

  const handleDeleteDetail = async (detailId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus detail ini?')) {
      setIsSubmitting(true);
      
      try {
        const result = await adminModuleService.deleteModuleDetail(detailId);
        if (result.success) {
          // Refresh data setelah delete
          await fetchModuleData();
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Terjadi kesalahan saat menghapus detail');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSaveDetail = async (formData) => {
    setIsSubmitting(true);
    
    try {
      const result = await adminModuleService.createOrUpdateModuleDetail(formData);
      if (result.success) {
        setShowForm(false);
        setEditingDetail(null);
        // Refresh data setelah save
        await fetchModuleData();
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan detail');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingDetail(null);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" size={20} />
              <div>
                <h3 className="text-red-800 font-medium">Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
                <p className="text-red-600 text-xs mt-1">
                  Module ID: {effectiveModuleId || 'Tidak tersedia'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show message if no module data
  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-500 mr-3" size={20} />
              <div>
                <h3 className="text-yellow-800 font-medium">Module Tidak Ditemukan</h3>
                <p className="text-yellow-700 text-sm">
                  Module dengan ID {effectiveModuleId} tidak ditemukan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Kembali ke Daftar Module</span>
          </button>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{module?.title}</h1>
                <p className="text-gray-600 mb-4">{module?.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-500">
                    <BookOpen size={16} className="mr-2" />
                    <span>{module?.modules_count || 0} Detail</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar size={16} className="mr-2" />
                    <span>Dibuat: {formatDate(module?.created_at)}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Clock size={16} className="mr-2" />
                    <span>Update: {formatDate(module?.updated_at)}</span>
                  </div>
                </div>
              </div>
              
              {module?.image_url && (
                <div className="ml-6">
                  <img
                    src={module.image_url}
                    alt={module.title}
                    className="w-32 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <button
            onClick={handleAddDetail}
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Plus size={16} />
            <span>Tambah Detail</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-6">
            <ModuleDetailForm
              initialData={editingDetail}
              moduleId={effectiveModuleId} // Menggunakan effectiveModuleId
              onSave={handleSaveDetail}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          </div>
        )}

        {/* Module Details List */}
        <div className="space-y-4">
          {moduleDetails.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Belum ada detail module
              </h3>
              <p className="text-gray-500">
                Mulai dengan menambahkan detail module pertama
              </p>
            </div>
          ) : (
            moduleDetails.map((detail, index) => (
              <div key={detail.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Urutan {detail.sequence_order}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {detail.title}
                    </h3>
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">
                      {detail.content}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>Dibuat: {formatDate(detail.created_at)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>Update: {formatDate(detail.updated_at)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEditDetail(detail)}
                      disabled={isSubmitting}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg disabled:opacity-50"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteDetail(detail.id)}
                      disabled={isSubmitting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Statistics */}
        {moduleDetails.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Statistik Detail Module</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{moduleDetails.length}</div>
                <div className="text-sm text-gray-500">Total Detail</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {moduleDetails.reduce((total, detail) => total + detail.content.length, 0)}
                </div>
                <div className="text-sm text-gray-500">Total Karakter</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetailAdminPage;