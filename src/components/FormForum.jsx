import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { forumService, forumHelpers } from '~/utils/forum';

const FormForum = ({ isOpen, onClose, onForumCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Diskusi',
    image_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const categories = [
    'Diskusi',
    'Tanya Jawab',
    'Pengalaman',
    'Ide',
    'Masukan'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    const validationErrors = forumHelpers.validateForumData(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors([]);

      // Create forum data with category
      const forumData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        image_url: formData.image_url.trim() || null,
        data: {
          category: formData.category
        }
      };

      const newForum = await forumService.createForum(forumData);
      
      // Reset form
      setFormData({
        title: '',
        content: '',
        category: 'Diskusi',
        image_url: ''
      });
      
      // Notify parent component
      if (onForumCreated) {
        onForumCreated(newForum);
      }
      
      // Close modal
      onClose();
      
    } catch (error) {
      console.error('Error creating forum:', error);
      setErrors([error.message || 'Gagal membuat forum. Silakan coba lagi.']);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: '',
        content: '',
        category: 'Diskusi',
        image_url: ''
      });
      setErrors([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Buat Topik Forum Baru
            </h2>
            <button
              onClick={handleClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-red-800">
                <h3 className="font-semibold mb-2">Terjadi kesalahan:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Topik *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Masukkan judul topik forum..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Maksimal 200 karakter
            </p>
          </div>

          {/* Content Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Isi Topik *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Tulis detail topik yang ingin Anda diskusikan..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={6}
              disabled={loading}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Jelaskan topik Anda dengan detail agar mendapat respon yang baik
            </p>
          </div>

          {/* Image URL Input (Optional) */}
          <div className="hidden">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL Gambar (Opsional)
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              disabled={loading}
            />
            <p className="text-xs text-gray-500 mt-1">
              Tambahkan gambar untuk mendukung topik Anda
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || !formData.title.trim() || !formData.content.trim()}
              className="px-6 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{loading ? 'Membuat...' : 'Buat Topik'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormForum;