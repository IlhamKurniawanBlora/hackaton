import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  FireIcon,
  PlusIcon, 
  UserIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { forumService, commentService, forumHelpers } from '~/utils/forum';
import FormForum from '~/components/FormForum.jsx';

const categoryColors = {
  'Diskusi': 'bg-green-100 text-green-800 border-green-200',
  'Tanya Jawab': 'bg-orange-100 text-orange-800 border-orange-200',
  'Pengalaman': 'bg-green-100 text-green-800 border-green-200',
  'Ide': 'bg-purple-100 text-purple-800 border-purple-200',
  'Masukan': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

function ForumPage() {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedForums, setExpandedForums] = useState(new Set());
  const [forumComments, setForumComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [editingComment, setEditingComment] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [loadingComments, setLoadingComments] = useState(new Set());
  const [deletingComment, setDeletingComment] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadForums();
  }, []);

  const loadForums = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await forumService.getForums();
      setForums(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading forums:', error);
      setError('Gagal memuat forum. Silakan coba lagi.');
      setForums([]);
    } finally {
      setLoading(false);
    }
  };

  const handleForumCreated = (newForum) => {
      // Add new forum to the top of the list
      setForums(prev => [newForum, ...prev]);
    };
    
  const toggleForum = useCallback(async (forumId) => {
    const newExpanded = new Set(expandedForums);
    
    if (newExpanded.has(forumId)) {
      newExpanded.delete(forumId);
    } else {
      newExpanded.add(forumId);
      
      // Load comments when expanding
      if (!forumComments[forumId]) {
        const newLoadingComments = new Set(loadingComments);
        newLoadingComments.add(forumId);
        setLoadingComments(newLoadingComments);
        
        try {
          const comments = await commentService.getCommentsByForumId(forumId);
          setForumComments(prev => ({
            ...prev,
            [forumId]: Array.isArray(comments) ? comments : []
          }));
        } catch (error) {
          console.error('Error loading comments:', error);
          setForumComments(prev => ({
            ...prev,
            [forumId]: []
          }));
        } finally {
          const updatedLoadingComments = new Set(loadingComments);
          updatedLoadingComments.delete(forumId);
          setLoadingComments(updatedLoadingComments);
        }
      }
    }
    
    setExpandedForums(newExpanded);
  }, [expandedForums, forumComments, loadingComments]);

  const handleCreateComment = async (forumId) => {
    const comment = newComment[forumId];
    if (!comment?.trim()) return;

    try {
      setSubmittingComment(true);
      const newCommentData = await commentService.createComment(forumId, comment.trim());
      
      setForumComments(prev => ({
        ...prev,
        [forumId]: [...(prev[forumId] || []), newCommentData]
      }));
      
      setNewComment(prev => ({
        ...prev,
        [forumId]: ''
      }));
      
      // Update forum comment count
      setForums(prev => prev.map(forum => 
        forum.id === forumId 
          ? { 
              ...forum, 
              comment_count: [{
                count: (forum.comment_count?.[0]?.count || 0) + 1 
              }]
            }
          : forum
      ));
    } catch (error) {
      console.error('Error creating comment:', error);
      alert('Gagal mengirim komentar. Silakan coba lagi.');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editCommentText.trim()) return;

    try {
      const updatedComment = await commentService.updateComment(commentId, editCommentText.trim());
      
      setForumComments(prev => {
        const newComments = { ...prev };
        Object.keys(newComments).forEach(forumId => {
          newComments[forumId] = newComments[forumId].map(comment => 
            comment.id === commentId ? updatedComment : comment
          );
        });
        return newComments;
      });
      
      setEditingComment(null);
      setEditCommentText('');
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Gagal memperbarui komentar. Silakan coba lagi.');
    }
  };

  const handleDeleteComment = async (commentId, forumId) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus komentar ini?')) return;

    try {
      setDeletingComment(commentId);
      await commentService.deleteComment(commentId);
      
      setForumComments(prev => ({
        ...prev,
        [forumId]: prev[forumId].filter(comment => comment.id !== commentId)
      }));
      
      // Update forum comment count
      setForums(prev => prev.map(forum => 
        forum.id === forumId 
          ? { 
              ...forum, 
              comment_count: [{
                count: Math.max(0, (forum.comment_count?.[0]?.count || 0) - 1)
              }]
            }
          : forum
      ));
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Gagal menghapus komentar. Silakan coba lagi.');
    } finally {
      setDeletingComment(null);
    }
  };

  const startEditComment = (comment) => {
    setEditingComment(comment.id);
    setEditCommentText(comment.comment);
  };

  const cancelEditComment = () => {
    setEditingComment(null);
    setEditCommentText('');
  };

  const handleCommentInputChange = (forumId, value) => {
    setNewComment(prev => ({
      ...prev,
      [forumId]: value
    }));
  };

  const getCommentCount = (forum) => {
    return forum.comment_count?.[0]?.count || 0;
  };

  const getCategory = (forum) => {
    return forumHelpers?.getCategory ? forumHelpers.getCategory(forum) : 'Diskusi';
  };

  const getUserDisplayName = (user) => {
    return forumHelpers?.getUserDisplayName ? forumHelpers.getUserDisplayName(user) : 'Anonymous';
  };

  const getUserAvatar = (user) => {
    return forumHelpers?.getUserAvatar ? forumHelpers.getUserAvatar(user) : null;
  };

  const formatDate = (date) => {
    return forumHelpers?.formatDate ? forumHelpers.formatDate(date) : new Date(date).toLocaleDateString();
  };

  const truncateText = (text, length) => {
    return forumHelpers?.truncateText ? forumHelpers.truncateText(text, length) : 
           text.length > length ? text.substring(0, length) + '...' : text;
  };

  const isHotForum = (commentCount, updatedAt) => {
    return forumHelpers?.isHotForum ? forumHelpers.isHotForum(commentCount, updatedAt) : false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat forum...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadForums}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Forum Diskusi AgriNuklir
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dalam diskusi seputar teknologi nuklir untuk pertanian. 
            Berbagi pengalaman, tanya jawab, dan dapatkan wawasan baru bersama komunitas.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              {forums.length} Topik Aktif
            </span>
            <div className="flex items-center gap-2 text-orange-600">
              <FireIcon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {forums.filter(forum => isHotForum(getCommentCount(forum), forum.updated_at)).length} Topik Populer
              </span>
            </div>
          </div>
          
           <button
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            onClick={() => setShowCreateModal(true)}
          >
            <PlusIcon className="w-5 h-5" />
            Buat Topik Baru
          </button>
        </div>

        {/* Create Forum Modal */}
        <FormForum 
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onForumCreated={handleForumCreated}
        />

        {/* Forum Topics */}
        <div className="space-y-4">
          {forums.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Belum ada topik forum. Mulai diskusi pertama!</p>
            </div>
          ) : (
            forums.map((forum) => {
              const isExpanded = expandedForums.has(forum.id);
              const comments = forumComments[forum.id] || [];
              const commentCount = getCommentCount(forum);
              const isHot = isHotForum(commentCount, forum.updated_at);
              const category = getCategory(forum);
              const userName = getUserDisplayName(forum.user);
              const userAvatar = getUserAvatar(forum.user);
              const isLoadingComments = loadingComments.has(forum.id);

              return (
                <div 
                  key={forum.id} 
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Main Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[category] || categoryColors['Diskusi']}`}>
                            {category}
                          </span>
                          {isHot && (
                            <div className="flex items-center gap-1 text-orange-500">
                              <FireIcon className="w-4 h-4" />
                              <span className="text-xs font-medium">Hot</span>
                            </div>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {forum.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm mb-3">
                          {truncateText(forum.content, 150)}
                        </p>
                        
                        {/* Mobile Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 lg:hidden">
                          <div className="flex items-center gap-1">
                            <UserIcon className="w-4 h-4" />
                            <span>{userName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
                            <span>{commentCount} komentar</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CalendarDaysIcon className="w-4 h-4" />
                            <span>{formatDate(forum.inserted_at)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Stats */}
                      <div className="hidden lg:flex items-center gap-8">
                        <div className="text-center">
                          <div className="flex items-center gap-2 text-gray-600 mb-1">
                            {userAvatar && (
                              <img 
                                src={userAvatar} 
                                alt={userName} 
                                className="w-6 h-6 rounded-full"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            )}
                            <UserIcon className="w-4 h-4" />
                            <span className="text-sm">{userName}</span>
                          </div>
                          <div className="text-xs text-gray-500">{formatDate(forum.inserted_at)}</div>
                        </div>
                        
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                            <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                            <span className="font-semibold text-lg">{commentCount}</span>
                          </div>
                          <div className="text-xs text-gray-500">komentar</div>
                        </div>
                        
                        <div className="text-center min-w-0">
                          <div className="flex items-center gap-1 text-green-600 mb-1">
                            <ClockIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">Terakhir</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {formatDate(forum.updated_at)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => toggleForum(forum.id)}
                        className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                        disabled={isLoadingComments}
                      >
                        {isLoadingComments ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                            <span>Memuat komentar...</span>
                          </>
                        ) : isExpanded ? (
                          <>
                            <ChevronUpIcon className="w-5 h-5" />
                            <span>Tutup Komentar</span>
                          </>
                        ) : (
                          <>
                            <ChevronDownIcon className="w-5 h-5" />
                            <span>Lihat Komentar ({commentCount})</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Comments Section */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50 p-6">
                      {/* Comments List */}
                      <div className="space-y-4 mb-6">
                        {comments.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
                          </div>
                        ) : (
                          comments.map((comment) => (
                            <div key={comment.id} className="bg-white rounded-lg p-4 shadow-sm">
                              <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                  {getUserAvatar(comment.user) && (
                                    <img 
                                      src={getUserAvatar(comment.user)} 
                                      alt={getUserDisplayName(comment.user)} 
                                      className="w-8 h-8 rounded-full"
                                      onError={(e) => {
                                        e.target.style.display = 'none';
                                      }}
                                    />
                                  )}
                                  <div>
                                    <span className="font-medium text-gray-900">
                                      {getUserDisplayName(comment.user)}
                                    </span>
                                    <p className="text-xs text-gray-500">
                                      {formatDate(comment.inserted_at)}
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => startEditComment(comment)}
                                    className="text-gray-400 hover:text-green-600 transition-colors duration-200"
                                    disabled={editingComment === comment.id}
                                  >
                                    <PencilIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteComment(comment.id, forum.id)}
                                    className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                                    disabled={deletingComment === comment.id}
                                  >
                                    {deletingComment === comment.id ? (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                                    ) : (
                                      <TrashIcon className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>
                              
                              {editingComment === comment.id ? (
                                <div className="space-y-2">
                                  <textarea
                                    value={editCommentText}
                                    onChange={(e) => setEditCommentText(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                    rows="3"
                                    placeholder="Edit komentar..."
                                  />
                                  <div className="flex gap-2">
                                    <button
                                      onClick={() => handleUpdateComment(comment.id)}
                                      disabled={!editCommentText.trim()}
                                      className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
                                    >
                                      <CheckIcon className="w-4 h-4" />
                                      Simpan
                                    </button>
                                    <button
                                      onClick={cancelEditComment}
                                      className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200"
                                    >
                                      <XMarkIcon className="w-4 h-4" />
                                      Batal
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-gray-700 whitespace-pre-wrap">{comment.comment}</p>
                              )}
                            </div>
                          ))
                        )}
                      </div>

                      {/* Add Comment Form */}
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="space-y-3">
                          <textarea
                            value={newComment[forum.id] || ''}
                            onChange={(e) => handleCommentInputChange(forum.id, e.target.value)}
                            placeholder="Tulis komentar Anda..."
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            rows="3"
                          />
                          <div className="flex justify-end">
                            <button
                              onClick={() => handleCreateComment(forum.id)}
                              disabled={!newComment[forum.id]?.trim() || submittingComment}
                              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                            >
                              {submittingComment ? 'Mengirim...' : 'Kirim Komentar'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Load More Button */}
        {forums.length > 0 && (
          <div className="text-center mt-8">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Muat Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForumPage;