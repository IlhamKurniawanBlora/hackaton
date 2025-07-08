import React, { useState, useEffect } from 'react';
import { adminModuleService } from '~/utils/adminData';

const FormModule = ({ moduleId = null, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    level: 'Dasar',
    instructor: '',
    topics: [],
    is_active: true
  });

  const [topics, setTopics] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  // Load data jika mode edit
  useEffect(() => {
    if (moduleId) {
      setIsEdit(true);
      loadModuleData();
    } else {
      resetForm();
      setIsEdit(false);
    }
  }, [moduleId]);

  const loadModuleData = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await adminModuleService.getModuleById(moduleId);
      if (result.success) {
        const moduleData = result.data;
        setFormData({
          id: moduleData.id,
          title: moduleData.title || '',
          description: moduleData.description || '',
          image_url: moduleData.image_url || '',
          level: moduleData.level || 'Dasar',
          instructor: moduleData.instructor || '',
          topics: moduleData.topics || [],
          is_active: moduleData.is_active !== undefined ? moduleData.is_active : true
        });
        setTopics(moduleData.topics ? moduleData.topics.join(', ') : '');
      } else {
        setError('Gagal memuat data module');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTopicsChange = (e) => {
    setTopics(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Jangan set image_url di sini, biarkan backend yang meng-handle upload dan mengembalikan URL
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      level: 'Dasar',
      instructor: '',
      topics: [],
      is_active: true
    });
    setTopics('');
    setImageFile(null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.title.trim()) {
        setError('Judul module wajib diisi');
        setLoading(false);
        return;
      }

      const topicsArray = topics
        .split(',')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0);

      const submitData = {
        ...formData,
        topics: topicsArray
      };

      const result = await adminModuleService.createOrUpdateModule(submitData, imageFile);

      if (result.success) {
        if (result.data && result.data.image_url) {
          setFormData(prev => ({
            ...prev,
            image_url: result.data.image_url
          }));
        }
        onSuccess && onSuccess(result.data);
        onClose && onClose();
      } else {
        setError(result.error || 'Terjadi kesalahan saat menyimpan data');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat menyimpan data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEdit ? 'Edit Module' : 'Tambah Module Baru'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-xl"
          aria-label="Close form"
        >
          ×
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Judul Module *
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Upload Gambar
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          {formData.image_url && (
            <div className="mt-2">
              <img
                src={formData.image_url}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-md"
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
            Level *
          </label>
          <select
            id="level"
            name="level"
            value={formData.level}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
          >
            <option value="Dasar">Dasar</option>
            <option value="Menengah">Menengah</option>
            <option value="Lanjut">Lanjut</option>
          </select>
        </div>

        <div>
          <label htmlFor="instructor" className="block text-sm font-medium text-gray-700 mb-1">
            Instructor
          </label>
          <input
            id="instructor"
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="topics" className="block text-sm font-medium text-gray-700 mb-1">
            Topics
          </label>
          <input
            id="topics"
            type="text"
            value={topics}
            onChange={handleTopicsChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan topik dipisahkan dengan koma (contoh: HTML, CSS, JavaScript)"
            disabled={loading}
          />
          <p className="text-sm text-gray-500 mt-1">
            Pisahkan setiap topik dengan koma
          </p>
        </div>

        <div className="flex items-center">
          <input
            id="is_active"
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleInputChange}
            className="mr-2"
            disabled={loading}
          />
          <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
            Module Aktif
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 text-gray-600 bg-yellow-200 rounded-md hover:bg-yellow-300"
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Menyimpan...' : (isEdit ? 'Update' : 'Simpan')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModule;
