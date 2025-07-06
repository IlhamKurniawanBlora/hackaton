import { supabase, getImageUrl } from './supabase';

// Fetch all modules
export const fetchModules = async () => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching modules:', error);
      return [];
    }

    // Add image URLs for each module
    const modulesWithImages = data.map(module => ({
      ...module,
      imageUrl: module.image_url ? getImageUrl('modules', module.image_url) : null
    }));

    return modulesWithImages;
  } catch (error) {
    console.error('Error fetching modules:', error);
    return [];
  }
};

// Fetch modules by level
export const fetchModulesByLevel = async (level) => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('is_active', true)
      .eq('level', level)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching modules by level:', error);
      return [];
    }

    const modulesWithImages = data.map(module => ({
      ...module,
      imageUrl: module.image_url ? getImageUrl('modules', module.image_url) : null
    }));

    return modulesWithImages;
  } catch (error) {
    console.error('Error fetching modules by level:', error);
    return [];
  }
};

// Fetch single module by ID
export const fetchModuleById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching module by ID:', error);
      return null;
    }

    return {
      ...data,
      imageUrl: data.image_url ? getImageUrl('modules', data.image_url) : null
    };
  } catch (error) {
    console.error('Error fetching module by ID:', error);
    return null;
  }
};

// Fixed: Fetch single module by slug with better error handling
export const fetchModuleBySlug = async (slug) => {
  try {
    console.log('Fetching module with slug:', slug);
    
    // First, let's check if there are any modules at all
    const { data: allModules, error: allError } = await supabase
      .from('modules')
      .select('slug, title, is_active')
      .limit(10);
    
    if (allError) {
      console.error('Error fetching all modules for debug:', allError);
    } else {
      console.log('Available modules:', allModules);
    }

    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching module by slug:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.log('No module found with slug:', slug);
      return null;
    }

    if (data.length > 1) {
      console.warn('Multiple modules found with slug:', slug, 'taking first one');
    }

    const module = data[0];
    console.log('Module found:', module);

    return {
      ...module,
      imageUrl: module.image_url ? getImageUrl('modules', module.image_url) : null
    };
  } catch (error) {
    console.error('Error fetching module by slug:', error);
    return null;
  }
};

// Alternative function to fetch by slug or ID
export const fetchModuleBySlugOrId = async (identifier) => {
  try {
    // First try to fetch by slug
    let { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('slug', identifier)
      .eq('is_active', true);

    // If no data found and identifier looks like an ID (numeric), try fetching by ID
    if ((!data || data.length === 0) && !isNaN(identifier)) {
      console.log('Slug not found, trying ID:', identifier);
      const result = await supabase
        .from('modules')
        .select('*')
        .eq('id', parseInt(identifier))
        .eq('is_active', true);
      
      data = result.data;
      error = result.error;
    }

    if (error) {
      console.error('Error fetching module:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.log('No module found with identifier:', identifier);
      return null;
    }

    const module = data[0];
    return {
      ...module,
      imageUrl: module.image_url ? getImageUrl('modules', module.image_url) : null
    };
  } catch (error) {
    console.error('Error fetching module by slug or ID:', error);
    return null;
  }
};

// Fetch comments for a module
export const fetchModuleComments = async (moduleId) => {
  try {
    const { data, error } = await supabase
      .from('comment_modules')
      .select('*')
      .eq('module_id', moduleId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching module comments:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error fetching module comments:', error);
    return [];
  }
};

// Add comment to module
export const addModuleComment = async (moduleId, userId, comment) => {
  try {
    const { data, error } = await supabase
      .from('comment_modules')
      .insert([
        {
          module_id: moduleId,
          user_id: userId,
          comment,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding module comment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error adding module comment:', error);
    return null;
  }
};

// Update comment
export const updateModuleComment = async (commentId, comment, rating = null) => {
  try {
    const updateData = { comment };
    if (rating !== null) {
      updateData.rating = rating;
    }

    const { data, error } = await supabase
      .from('comment_modules')
      .update(updateData)
      .eq('id', commentId)
      .select()
      .single();

    if (error) {
      console.error('Error updating module comment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error updating module comment:', error);
    return null;
  }
};

// Soft delete comment
export const deleteModuleComment = async (commentId) => {
  try {
    const { data, error } = await supabase
      .from('comment_modules')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', commentId)
      .select()
      .single();

    if (error) {
      console.error('Error deleting module comment:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error deleting module comment:', error);
    return null;
  }
};

// Debug function to check all module slugs
export const debugModuleSlugs = async () => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('id, title, slug, is_active')
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching module slugs:', error);
      return;
    }

    console.log('All active module slugs:', data);
    return data;
  } catch (error) {
    console.error('Error in debugModuleSlugs:', error);
  }
};