import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get public URL for images
export const getImageUrl = (bucket, path) => {
  if (!path) return null;
  
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data?.publicUrl || null;
  } catch (error) {
    console.error('Error getting image URL:', error);
    return null;
  }
};

// Helper function to upload files
export const uploadFile = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Helper function to delete files
export const deleteFile = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .remove([path]);
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
};

// Helper function to list files in a bucket
export const listFiles = async (bucket, path = '') => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path, {
        limit: 100,
        offset: 0
      });
    
    if (error) {
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error listing files:', error);
    throw error;
  }
};

// Helper function to check if file exists
export const fileExists = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list('', {
        limit: 1,
        search: path
      });
    
    if (error) {
      throw error;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error checking file existence:', error);
    return false;
  }
};

// Helper function to get file metadata
export const getFileMetadata = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list('', {
        limit: 1,
        search: path
      });
    
    if (error) {
      throw error;
    }
    
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error getting file metadata:', error);
    return null;
  }
};

// Helper function to create signed URL (for private files)
export const createSignedUrl = async (bucket, path, expiresIn = 3600) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);
    
    if (error) {
      throw error;
    }
    
    return data?.signedUrl || null;
  } catch (error) {
    console.error('Error creating signed URL:', error);
    return null;
  }
};

// Helper function to get download URL
export const getDownloadUrl = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);
    
    if (error) {
      throw error;
    }
    
    return URL.createObjectURL(data);
  } catch (error) {
    console.error('Error getting download URL:', error);
    return null;
  }
};