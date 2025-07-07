import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Simple helpers
export const getImageUrl = (bucket, path) =>
  path
    ? supabase.storage.from(bucket).getPublicUrl(path).data?.publicUrl ?? null
    : null;

export const uploadFile = (bucket, path, file) =>
  supabase.storage.from(bucket).upload(path, file, { cacheControl: '3600' });

export const deleteFile = (bucket, path) =>
  supabase.storage.from(bucket).remove([path]);

export const listFiles = (bucket, path = '') =>
  supabase.storage.from(bucket).list(path);

export const createSignedUrl = (bucket, path, expiresIn = 3600) =>
  supabase.storage.from(bucket).createSignedUrl(path, expiresIn);

export const getDownloadUrl = async (bucket, path) => {
  const { data, error } = await supabase.storage.from(bucket).download(path);
  if (error) throw error;
  return URL.createObjectURL(data);
};
