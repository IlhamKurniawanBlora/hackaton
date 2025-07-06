import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchModuleBySlug, 
  fetchModuleBySlugOrId,
  fetchModuleComments, 
  addModuleComment, 
  updateModuleComment, 
  deleteModuleComment,
  debugModuleSlugs 
} from '~/utils/modules';

// Icon Components
const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BookIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const StarIcon = ({ className, filled = false }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const ArrowLeftIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const PlayIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const CheckIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

const MessageIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const AlertIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

// Loading Components
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const CommentCard = ({ comment, onEdit, onDelete, currentUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [rating, setRating] = useState(comment.rating || 0);

  const handleSaveEdit = async () => {
    try {
      await onEdit(comment.id, editText, rating);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving edit:', error);
    }
  };

  const canEdit = currentUserId === comment.user_id;

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <h4 className="font-semibold text-gray-800">{comment.user_name || 'Anonymous'}</h4>
            <p className="text-sm text-gray-600">{new Date(comment.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        {canEdit && (
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(comment.id)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Rating Stars */}
      {(comment.rating || isEditing) && (
        <div className="flex items-center mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`w-5 h-5 ${isEditing ? 'cursor-pointer' : ''} ${
                star <= (isEditing ? rating : comment.rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              filled={star <= (isEditing ? rating : comment.rating)}
              onClick={() => isEditing && setRating(star)}
            />
          ))}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="3"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSaveEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
      )}
    </div>
  );
};

function ModuleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [module, setModule] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [currentUserId] = useState(1); // Replace with actual user ID from auth

  useEffect(() => {
    const loadModule = async () => {
      // Reset states
      setLoading(true);
      setError(null);
      setModule(null);

      // Validate slug
      console.log('Module slug:', slug);
      if (!slug) {
        setError('Slug parameter is missing');
        setLoading(false);
        return;
      }
      try {
        console.log('Loading module with slug:', slug);
        
        // Debug: Check all available slugs (optional, remove in production)
        if (process.env.NODE_ENV === 'development') {
          await debugModuleSlugs();
        }
        
        let moduleData = null;
        
        // Try to fetch by slug first
        try {
          moduleData = await fetchModuleBySlug(slug);
        } catch (slugError) {
          console.warn('fetchModuleBySlug failed:', slugError);
        }
        
        // If slug doesn't work, try alternative method
        if (!moduleData) {
          console.log('Slug not found, trying alternative method');
          try {
            moduleData = await fetchModuleBySlugOrId(slug);
          } catch (altError) {
            console.warn('fetchModuleBySlugOrId failed:', altError);
          }
        }
        
        if (!moduleData) {
          setError('Module not found');
        } else {
          console.log('Module data received:', moduleData);
          setModule(moduleData);
        }
      } catch (error) {
        console.error('Error loading module:', error);
        setError('Failed to load module');
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [slug]);

  useEffect(() => {
    const loadComments = async () => {
      if (!module?.id) return;
      
      setLoadingComments(true);
      try {
        const commentsData = await fetchModuleComments(module.id);
        setComments(commentsData || []);
      } catch (error) {
        console.error('Error loading comments:', error);
        setComments([]);
      } finally {
        setLoadingComments(false);
      }
    };

    loadComments();
  }, [module?.id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !module?.id) return;

    try {
      const commentData = await addModuleComment(module.id, currentUserId, newComment, newRating);
      if (commentData) {
        setComments([commentData, ...comments]);
        setNewComment('');
        setNewRating(0);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleEditComment = async (commentId, comment, rating) => {
    try {
      const updatedComment = await updateModuleComment(commentId, comment, rating);
      if (updatedComment) {
        setComments(comments.map(c => c.id === commentId ? updatedComment : c));
      }
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      await deleteModuleComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const getLevelBadgeColor = (level) => {
    switch (level) {
      case 'Dasar': return 'text-green-600 bg-green-100';
      case 'Menengah': return 'text-orange-600 bg-orange-100';
      case 'Lanjut': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <AlertIcon className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Error</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/modules')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Modul
          </button>
        </div>
      </div>
    );
  }

  // Module not found state
  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <BookIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Modul tidak ditemukan</h2>
          <p className="text-gray-500 mb-4">Modul dengan slug "{slug}" tidak tersedia atau telah dihapus.</p>
          <button
            onClick={() => navigate('/modules')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Modul
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/modules')}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Kembali ke Daftar Modul
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Module Hero Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-indigo-500 relative">
                {module.imageUrl ? (
                  <img
                    src={module.imageUrl}
                    alt={module.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookIcon className="w-20 h-20 text-white" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getLevelBadgeColor(module.level)}`}>
                    {module.level}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{module.title}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed">{module.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <BookIcon className="w-5 h-5 mr-2" />
                  <span>{module.modules_count || 0} Bab</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>Fleksibel</span>
                </div>
                {module.instructor && (
                  <div className="flex items-center text-gray-600 col-span-2">
                    <UserIcon className="w-5 h-5 mr-2" />
                    <span>{module.instructor}</span>
                  </div>
                )}
              </div>

              {/* Topics */}
              {module.topics && module.topics.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Topik yang Dipelajari:</h3>
                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3">
                <PlayIcon className="w-6 h-6" />
                <span>Mulai Belajar Sekarang</span>
              </button>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Module Chapters */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Bab</h2>
              <div className="space-y-4">
                {/* Example chapters - replace with actual data */}
                {[1, 2, 3, 4, 5].map((chapter) => (
                  <div key={chapter} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-semibold text-sm">{chapter}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">Bab {chapter}: Pengenalan Dasar</h3>
                      <p className="text-sm text-gray-600">Durasi: 15 menit</p>
                    </div>
                    <PlayIcon className="w-5 h-5 text-blue-600" />
                  </div>
                ))}
              </div>
            </div>

           
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Module Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Modul</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-semibold">{module.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Durasi:</span>
                  <span className="font-semibold">Fleksibel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bahasa:</span>
                  <span className="font-semibold">Indonesia</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Akses:</span>
                  <span className="font-semibold">Selamanya</span>
                </div>
              </div>
            </div>

            {/* Certificate */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl p-6 text-white mb-6">
              <div className="flex items-center mb-3">
                <CheckIcon className="w-6 h-6 mr-2" />
                <h3 className="font-bold">Sertifikat</h3>
              </div>
              <p className="text-sm mb-4">Dapatkan sertifikat digital setelah menyelesaikan semua materi pembelajaran.</p>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-xs">Sertifikat dapat digunakan untuk portofolio dan LinkedIn profile Anda.</p>
              </div>
            </div>

            {/* Instructor */}
            {module.instructor && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Instruktur</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{module.instructor}</h4>
                    <p className="text-sm text-gray-600">Expert Instructor</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Instruktur berpengalaman dengan track record yang terbukti dalam memberikan pembelajaran berkualitas tinggi.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <MessageIcon className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Komentar & Ulasan</h2>
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mb-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Berikan Rating (Opsional)
                </label>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        star <= newRating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      filled={star <= newRating}
                      onClick={() => setNewRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tulis Komentar
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows="4"
                  placeholder="Bagikan pengalaman Anda tentang modul ini..."
                />
              </div>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Kirim Komentar
              </button>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {loadingComments ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Memuat komentar...</p>
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    onEdit={handleEditComment}
                    onDelete={handleDeleteComment}
                    currentUserId={currentUserId}
                  />
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada komentar. Jadilah yang pertama memberikan ulasan!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetailPage;