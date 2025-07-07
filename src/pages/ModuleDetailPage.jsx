import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getModuleBySlug, 
  getModuleComments, 
  addModuleComment, 
  updateModuleComment, 
  deleteModuleComment 
} from '~/utils/modules';

// Simple Icons
const ArrowLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const Book = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const Clock = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const User = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const Star = ({ filled }) => (
  <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Loading = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const CommentCard = ({ comment, onEdit, onDelete, currentUserId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.comment);
  const [rating, setRating] = useState(comment.rating || 0);

  const handleSave = async () => {
    await onEdit(comment.id, editText, rating);
    setIsEditing(false);
  };

  const canEdit = currentUserId === comment.user_id;

  return (
    <div className="bg-white rounded-lg p-4 shadow border">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-medium">{comment.user_name || 'Anonymous'}</h4>
            <p className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</p>
          </div>
        </div>
        {canEdit && (
          <div className="flex gap-2">
            <button onClick={() => setIsEditing(!isEditing)} className="text-blue-600 text-sm">
              Edit
            </button>
            <button onClick={() => onDelete(comment.id)} className="text-red-600 text-sm">
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      {(comment.rating || isEditing) && (
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              filled={star <= (isEditing ? rating : comment.rating)}
              className={`${isEditing ? 'cursor-pointer' : ''} ${
                star <= (isEditing ? rating : comment.rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => isEditing && setRating(star)}
            />
          ))}
        </div>
      )}

      {/* Comment Content */}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="px-3 py-1 bg-gray-300 rounded text-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">{comment.comment}</p>
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
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [currentUserId] = useState(1); // Replace with actual user ID

  useEffect(() => {
    const loadModule = async () => {
      try {
        const moduleData = await getModuleBySlug(slug);
        if (moduleData) {
          setModule(moduleData);
          const commentsData = await getModuleComments(moduleData.id);
          setComments(commentsData || []);
        } else {
          setError('Module not found');
        }
      } catch (err) {
        setError('Failed to load module');
      } finally {
        setLoading(false);
      }
    };

    loadModule();
  }, [slug]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const commentData = await addModuleComment(module.id, newComment, newRating);
      if (commentData) {
        setComments([commentData, ...comments]);
        setNewComment('');
        setNewRating(0);
      }
    } catch (err) {
      console.error('Error adding comment:', err);
    }
  };

  const handleEditComment = async (commentId, comment, rating) => {
    try {
      const updatedComment = await updateModuleComment(commentId, comment, rating);
      if (updatedComment) {
        setComments(comments.map(c => c.id === commentId ? updatedComment : c));
      }
    } catch (err) {
      console.error('Error updating comment:', err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;
    
    try {
      await deleteModuleComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-4">{error}</h2>
          <button
            onClick={() => navigate('/modules')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-4">Module not found</h2>
          <button
            onClick={() => navigate('/modules')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Back to Modules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/modules')}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="mr-2" />
            Back to Modules
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Module Info */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center">
                {module.imageUrl ? (
                  <img src={module.imageUrl} alt={module.title} className="w-full h-full object-cover" />
                ) : (
                  <Book className="w-20 h-20 text-white" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="md:w-1/2 p-8">
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                {module.level}
              </span>
              <h1 className="text-3xl font-bold text-gray-800 mt-4 mb-4">{module.title}</h1>
              <p className="text-gray-600 mb-6">{module.description}</p>

                      <div className="flex items-center gap-6 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Book className="mr-2" />
                        <span>{module.modules_count || 0} Chapters</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="mr-2" />
                        <span>Flexible</span>
                      </div>
                      </div>

                      <button
                      className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                      onClick={() => navigate(`/educations/${module.id}`)}
                      >
                      Start Learning
                      </button>
                    </div>
                    </div>
                  </div>

                  {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments & Reviews</h2>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating (Optional)</label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    filled={star <= newRating}
                    className={`cursor-pointer ${star <= newRating ? 'text-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setNewRating(star)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                placeholder="Share your thoughts about this module..."
              />
            </div>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Add Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
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
              <div className="text-center py-8 text-gray-500">
                No comments yet. Be the first to share your thoughts!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModuleDetailPage;