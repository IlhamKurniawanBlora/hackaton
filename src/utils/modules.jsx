import { supabase, getImageUrl } from './supabase';
import { authService } from '~/utils/auth';

// ====================
// USER RELATED
// ====================

export const loadUserData = async () => {
  try {
    const { user: authUser } = await authService.getCurrentUser();
    
    if (!authUser) return null;

    // Load profile data
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading profile:', error);
      return { user: authUser, profile: null };
    }

    return {
      user: authUser,
      profile: profileData ? {
        username: profileData.username || '',
        full_name: profileData.full_name || '',
        avatar_url: profileData.avatar_url || ''
      } : null
    };
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

// ====================
// MODULE CRUD
// ====================

// Get all active modules
export const getModules = async () => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(module => ({
      ...module,
      imageUrl: module.image_url ? getImageUrl('modules', module.image_url) : null
    }));
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

// Get modules by level
export const getModulesByLevel = async (level) => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .eq('level', level)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(module => ({
      ...module,
      imageUrl: module.image_url ? getImageUrl('modules', module.image_url) : null
    }));
  } catch (error) {
    console.error('Error fetching modules by level:', error);
    return [];
  }
};

// Get single module by ID
export const getModuleById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    return {
      ...data,
      imageUrl: data.image_url ? getImageUrl('modules', data.image_url) : null
    };
  } catch (error) {
    console.error('Error fetching module by ID:', error);
    return null;
  }
};

// Get single module by slug
export const getModuleBySlug = async (slug) => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    return {
      ...data,
      imageUrl: data.image_url ? getImageUrl('modules', data.image_url) : null
    };
  } catch (error) {
    console.error('Error fetching module by slug:', error);
    return null;
  }
};

// ====================
// MODULE DETAILS (CHAPTERS)
// ====================

// Get all chapters for a module
export const getModuleChapters = async (moduleId) => {
  try {
    const { data, error } = await supabase
      .from('modules_detail')
      .select('*')
      .eq('module_id', moduleId)
      .order('sequence_order', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching module chapters:', error);
    return [];
  }
};

// Get single chapter by ID
export const getChapterById = async (chapterId) => {
  try {
    const { data, error } = await supabase
      .from('modules_detail')
      .select('*')
      .eq('id', chapterId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching chapter by ID:', error);
    return null;
  }
};

// Get module with its chapters
export const getModuleWithChapters = async (moduleId) => {
  try {
    const [module, chapters] = await Promise.all([
      getModuleById(moduleId),
      getModuleChapters(moduleId)
    ]);

    return module ? { ...module, chapters } : null;
  } catch (error) {
    console.error('Error fetching module with chapters:', error);
    return null;
  }
};

// ====================
// MODULE COMMENTS
// ====================

// Get module comments with user info
export const getModuleComments = async (moduleId) => {
  try {
    const { data, error } = await supabase
      .from('comment_modules')
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          username
        )
      `)
      .eq('module_id', moduleId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(comment => ({
      ...comment,
      user_name: comment.users?.full_name || comment.users?.username || 'Anonymous'
    }));
  } catch (error) {
    console.error('Error fetching module comments:', error);
    return [];
  }
};

// Add comment to module
export const addModuleComment = async (moduleId, comment, rating = null) => {
  try {
    const user = await authService.getCurrentUser();
    if (!user?.user?.id) {
      throw new Error('User not authenticated');
    }

    const insertData = {
      module_id: moduleId,
      user_id: user.user.id,
      comment,
      ...(rating && { rating })
    };

    const { data, error } = await supabase
      .from('comment_modules')
      .insert([insertData])
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          username
        )
      `)
      .single();

    if (error) throw error;

    return {
      ...data,
      user_name: data.users?.full_name || data.users?.username || 'Anonymous'
    };
  } catch (error) {
    console.error('Error adding module comment:', error);
    return null;
  }
};

// Update comment
export const updateModuleComment = async (commentId, comment, rating = null) => {
  try {
    const updateData = {
      comment,
      ...(rating && { rating })
    };

    const { data, error } = await supabase
      .from('comment_modules')
      .update(updateData)
      .eq('id', commentId)
      .select(`
        *,
        users:user_id (
          id,
          full_name,
          username
        )
      `)
      .single();

    if (error) throw error;

    return {
      ...data,
      user_name: data.users?.full_name || data.users?.username || 'Anonymous'
    };
  } catch (error) {
    console.error('Error updating module comment:', error);
    return null;
  }
};

// Delete comment (soft delete)
export const deleteModuleComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('comment_modules')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', commentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error deleting module comment:', error);
    return null;
  }
};