import { supabase } from './supabase';

// Forum CRUD Operations
export const forumService = {
  // Get all forums with user info and comment count
  async getForums() {
    try {
      // First get forums with comment count
      const { data: forumData, error: forumError } = await supabase
        .from('forums')
        .select(`
          *,
          comment_count:comment_forum(count)
        `)
        .order('updated_at', { ascending: false });

      if (forumError) throw forumError;

      // Get unique user IDs
      const userIds = [...new Set(forumData.map(forum => forum.user_id))];
      
      // Get user profiles for these IDs
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      if (profileError) {
        console.warn('Error fetching profiles:', profileError);
      }

      // Create a map of user profiles
      const userMap = new Map();
      if (profileData) {
        profileData.forEach(profile => {
          userMap.set(profile.id, profile);
        });
      }
      
      // Transform data to ensure consistent structure
      return forumData.map(forum => ({
        ...forum,
        comment_count: forum.comment_count ?? 0,
        user: userMap.get(forum.user_id) || { id: forum.user_id, full_name: 'Unknown User' }
        }));
    } catch (error) {
      console.error('Error fetching forums:', error);
      throw error;
    }
  },

  // Get single forum with details
  async getForumById(id) {
    try {
      const { data: forumData, error: forumError } = await supabase
        .from('forums')
        .select('*')
        .eq('id', id)
        .single();

      if (forumError) throw forumError;

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', forumData.user_id)
        .single();

      if (profileError) {
        console.warn('Error fetching profile:', profileError);
      }

      return {
        ...forumData,
        user: profileData || { id: forumData.user_id, full_name: 'Unknown User' }
      };
    } catch (error) {
      console.error('Error fetching forum:', error);
      throw error;
    }
  },

  // Create new forum
  async createForum(forumData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: newForum, error: forumError } = await supabase
        .from('forums')
        .insert([
          {
            title: forumData.title,
            content: forumData.content,
            image_url: forumData.image_url,
            data: forumData.data,
            user_id: user.id,
            inserted_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select('*')
        .single();

      if (forumError) throw forumError;

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.warn('Error fetching profile:', profileError);
      }

      return {
        ...newForum,
        user: profileData || { id: user.id, full_name: 'Unknown User' },
        comment_count: 0
      };
    } catch (error) {
      console.error('Error creating forum:', error);
      throw error;
    }
  },

  // Update forum
  async updateForum(id, forumData) {
    try {
      const { data: updatedForum, error: forumError } = await supabase
        .from('forums')
        .update({
          title: forumData.title,
          content: forumData.content,
          image_url: forumData.image_url,
          data: forumData.data,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('*')
        .single();

      if (forumError) throw forumError;

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', updatedForum.user_id)
        .single();

      if (profileError) {
        console.warn('Error fetching profile:', profileError);
      }

      return {
        ...updatedForum,
        user: profileData || { id: updatedForum.user_id, full_name: 'Unknown User' }
      };
    } catch (error) {
      console.error('Error updating forum:', error);
      throw error;
    }
  },

  // Delete forum
  async deleteForum(id) {
    try {
      // First delete all comments associated with this forum
      await supabase
        .from('comment_forum')
        .delete()
        .eq('forum_id', id);

      // Then delete the forum
      const { error } = await supabase
        .from('forums')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting forum:', error);
      throw error;
    }
  }
};

// Comment CRUD Operations
export const commentService = {
  // Get comments for a forum
  async getCommentsByForumId(forumId) {
    try {
      const { data: commentsData, error: commentsError } = await supabase
        .from('comment_forum')
        .select('*')
        .eq('forum_id', forumId)
        .order('inserted_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Get unique user IDs
      const userIds = [...new Set(commentsData.map(comment => comment.user_id))];
      
      // Get user profiles for these IDs
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      if (profileError) {
        console.warn('Error fetching profiles:', profileError);
      }

      // Create a map of user profiles
      const userMap = new Map();
      if (profileData) {
        profileData.forEach(profile => {
          userMap.set(profile.id, profile);
        });
      }

      return commentsData.map(comment => ({
        ...comment,
        user: userMap.get(comment.user_id) || { id: comment.user_id, full_name: 'Unknown User' }
      }));
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    }
  },

  // Create new comment
  async createComment(forumId, commentText) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      if (!commentText?.trim()) {
        throw new Error('Comment cannot be empty');
      }

      const { data: newComment, error: commentError } = await supabase
        .from('comment_forum')
        .insert([
          {
            forum_id: forumId,
            user_id: user.id,
            comment: commentText.trim(),
            data: null,
            inserted_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select('*')
        .single();

      if (commentError) throw commentError;

      // Update forum's updated_at to reflect new activity
      await supabase
        .from('forums')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', forumId);

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.warn('Error fetching profile:', profileError);
      }

      return {
        ...newComment,
        user: profileData || { id: user.id, full_name: 'Unknown User' }
      };
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  // Update comment
  async updateComment(id, commentText) {
    try {
      if (!commentText?.trim()) {
        throw new Error('Comment cannot be empty');
      }

      const { data: updatedComment, error: commentError } = await supabase
        .from('comment_forum')
        .update({
          comment: commentText.trim(),
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select('*')
        .single();

      if (commentError) throw commentError;

      // Get user profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .eq('id', updatedComment.user_id)
        .single();

      if (profileError) {
        console.warn('Error fetching profile:', profileError);
      }

      return {
        ...updatedComment,
        user: profileData || { id: updatedComment.user_id, full_name: 'Unknown User' }
      };
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  },

  // Delete comment
  async deleteComment(id) {
    try {
      const { error } = await supabase
        .from('comment_forum')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
};

// Helper functions
export const forumHelpers = {
  // Get user display name
  getUserDisplayName(user) {
    if (!user) return 'Unknown User';
    return user.full_name || user.name || user.email?.split('@')[0] || 'Anonymous';
  },

  // Get user avatar
  getUserAvatar(user) {
    if (!user) return null;
    return user.avatar_url || user.picture || null;
  },

  // Format date
  formatDate(dateString) {
    if (!dateString) return 'Unknown';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'Baru saja';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} menit yang lalu`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} jam yang lalu`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} hari yang lalu`;
    } else {
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  },

  // Get category from forum data
  getCategory(forumData) {
    return forumData?.data?.category || 'Diskusi';
  },

  // Check if forum is hot (has many recent comments)
  isHotForum(commentCount, updatedAt) {
    const recentThreshold = 7 * 24 * 60 * 60 * 1000; // 7 days
    const isRecent = new Date() - new Date(updatedAt) < recentThreshold;
    return commentCount >= 10 && isRecent;
  },

  // Truncate text
  truncateText(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  // Validate forum data
  validateForumData(forumData) {
    const errors = [];
    
    if (!forumData.title?.trim()) {
      errors.push('Judul forum tidak boleh kosong');
    }
    
    if (!forumData.content?.trim()) {
      errors.push('Konten forum tidak boleh kosong');
    }
    
    if (forumData.title && forumData.title.length > 200) {
      errors.push('Judul forum terlalu panjang (maksimal 200 karakter)');
    }
    
    return errors;
  }
};

// Real-time subscriptions
export const forumSubscriptions = {
  // Subscribe to forum changes
  subscribeToForums(callback) {
    const channel = supabase
      .channel('forums')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'forums' },
        callback
      )
      .subscribe();

    return channel;
  },

  // Subscribe to comment changes
  subscribeToComments(forumId, callback) {
    const channel = supabase
      .channel(`comments-${forumId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'comment_forum',
          filter: `forum_id=eq.${forumId}`
        },
        callback
      )
      .subscribe();

    return channel;
  },

  // Unsubscribe from channel
  unsubscribe(channel) {
    if (channel) {
      return supabase.removeChannel(channel);
    }
    return Promise.resolve();
  }
};