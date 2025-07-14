// utils/adminData.js
import { supabase } from './supabase';
import { authService } from './auth';

/**
 * Admin service untuk mengelola semua fungsi CRUD modules
 */
export const adminModuleService = {
  
  // ==================== MODULES CRUD ====================
  
  /**
   * Mendapatkan semua modules
   */
  async getModules() {
    try {
      // Pastikan user authenticated
      const { user } = await authService.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User tidak terautentikasi' };
      }

      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Mendapatkan module berdasarkan ID
   */
  async getModuleById(id) {
    try {
      // Pastikan user authenticated
      const { user } = await authService.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User tidak terautentikasi' };
      }

      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Upload image ke storage bucket
   */
  async uploadModuleImage(moduleId, imageFile, imageName) {
    try {
      // Validasi file
      if (!imageFile || !imageFile.type.startsWith('image/')) {
        throw new Error('File harus berupa gambar');
      }

      // Validasi ukuran file (maksimal 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (imageFile.size > maxSize) {
        throw new Error('Ukuran file maksimal 5MB');
      }

      // Buat nama file yang unik dan aman
      const fileExtension = imageName.split('.').pop();
      const safeFileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
      const filePath = `modules/${moduleId}/${safeFileName}`;

      // Upload file ke bucket storage 'modules' (konsisten dengan getPublicUrl)
      const { data, error } = await supabase.storage
        .from('modules')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false // Gunakan false untuk menghindari overwrite
        });

      if (error) throw error;

      // Dapatkan public URL dari file yang sudah diupload
      const { data: publicUrlData } = supabase.storage
        .from('modules')
        .getPublicUrl(filePath);

      return { 
        success: true, 
        data: { 
          path: data.path, 
          publicUrl: publicUrlData.publicUrl 
        } 
      };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Hapus image dari storage
   */
  async deleteModuleImage(imagePath) {
    try {
      if (!imagePath) return { success: true };

      const { error } = await supabase.storage
        .from('modules')
        .remove([imagePath]);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting image:', error);
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Create atau Update module (Upsert)
   */
  async createOrUpdateModule(moduleData, imageFile) {
    try {
      // Pastikan user authenticated
      const { user } = await authService.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User tidak terautentikasi' };
      }

      const isUpdate = Boolean(moduleData.id);
      const timestamp = new Date().toISOString();

      // Siapkan data untuk disimpan/upsert
      const preparedData = {
        ...moduleData,
        slug: this.generateSlug(moduleData.title),
        updated_at: timestamp,
        // Tambahkan user_id untuk RLS
        user_id: user.id
      };

      if (!isUpdate) {
        preparedData.created_at = timestamp;
      }

      // Jika ada file image yang diupload
      if (imageFile) {
        // Untuk update, hapus image lama jika ada
        if (isUpdate && moduleData.image_url) {
          await this.deleteModuleImage(moduleData.image_url);
        }

        // Gunakan moduleId jika update, jika create gunakan id sementara
        const moduleId = isUpdate ? moduleData.id : `temp-${Date.now()}`;

        // Upload image ke storage
        const uploadResult = await this.uploadModuleImage(moduleId, imageFile, imageFile.name);

        if (uploadResult.success) {
          preparedData.image_url = uploadResult.data.publicUrl;
          preparedData.image_url = uploadResult.data.path;
        } else {
          // Jika gagal upload image, return error
          return { success: false, error: uploadResult.error };
        }
      }

      // Upsert data module ke database
      const { data, error } = await supabase
        .from('modules')
        .upsert(preparedData, {
          onConflict: 'id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) throw error;

      // Jika create berhasil dan ada image yang diupload dengan temp ID,
      // rename folder dari temp ke ID asli
      if (!isUpdate && imageFile && data.id) {
        const tempModuleId = `temp-${Date.now()}`;
        if (preparedData.image_url && preparedData.image_url.includes(tempModuleId)) {
          // Update path dengan ID yang benar
          const newImagePath = preparedData.image_url.replace(tempModuleId, data.id);
          
          // Update record dengan path yang benar
          await supabase
            .from('modules')
            .update({ 
              image_url: newImagePath,
              image_url: preparedData.image_url.replace(tempModuleId, data.id)
            })
            .eq('id', data.id);
        }
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Menghapus module
   */
  async deleteModule(id) {
    try {
      const { data: moduleData } = await supabase
        .from('modules')
        .select('image_url')
        .eq('id', id)
        .single();

      // Hapus image dari storage jika ada
      if (moduleData?.image_url) {
        await this.deleteModuleImage(moduleData.image_url);
      }

      const { error } = await supabase
        .from('modules')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  // ==================== MODULES DETAIL CRUD ====================

  /**
   * Mendapatkan semua detail module berdasarkan module_id
   */
  async getModuleDetails(moduleId) {
    try {
      const { data, error } = await supabase
        .from('modules_detail')
        .select('*')
        .eq('module_id', moduleId)
        .order('sequence_order', { ascending: true });

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Create atau Update module detail (Upsert)
   */
  async createOrUpdateModuleDetail(detailData) {
    try {
      // Pastikan user authenticated
      const { user } = await authService.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User tidak terautentikasi' };
      }

      const isUpdate = detailData.id ? true : false;
      const timestamp = new Date().toISOString();
      
      const preparedData = {
        ...detailData,
        updated_at: timestamp,
        // Tambahkan user_id untuk RLS jika diperlukan
        user_id: user.id
      };

      if (!isUpdate) {
        preparedData.created_at = timestamp;
      }

      const { data, error } = await supabase
        .from('modules_detail')
        .upsert(preparedData, {
          onConflict: 'id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) throw error;
      
      await this.updateModulesCount(detailData.module_id);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Menghapus detail module
   */
  async deleteModuleDetail(id) {
    try {
      const { data: detailData, error: fetchError } = await supabase
        .from('modules_detail')
        .select('module_id')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error } = await supabase
        .from('modules_detail')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await this.updateModulesCount(detailData.module_id);
      return { success: true };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  // ==================== QUIZ CRUD ====================

  /**
   * Mendapatkan quiz berdasarkan module_id
   */
  async getQuizByModuleId(moduleId) {
    try {
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('module_id', moduleId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return { success: true, data: data || null };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Create atau Update quiz (Upsert)
   */
  async createOrUpdateQuiz(quizData) {
    try {
      // Pastikan user authenticated
      const { user } = await authService.getCurrentUser();
      if (!user) {
        return { success: false, error: 'User tidak terautentikasi' };
      }

      const isUpdate = quizData.id ? true : false;
      const timestamp = new Date().toISOString();
      
      const preparedData = {
        ...quizData,
        updated_at: timestamp,
        // Tambahkan user_id untuk RLS jika diperlukan
        user_id: user.id
      };

      if (!isUpdate) {
        preparedData.created_at = timestamp;
      }

      const { data, error } = await supabase
        .from('quiz')
        .upsert(preparedData, {
          onConflict: 'id',
          ignoreDuplicates: false
        })
        .select()
        .single();

      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  /**
   * Menghapus quiz
   */
  async deleteQuiz(id) {
    try {
      const { error } = await supabase
        .from('quiz')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      return { success: false, error: this.getErrorMessage(error) };
    }
  },

  // ==================== HELPER FUNCTIONS ====================

  /**
   * Update modules_count di tabel modules
   */
  async updateModulesCount(moduleId) {
    try {
      const { count, error } = await supabase
        .from('modules_detail')
        .select('*', { count: 'exact', head: true })
        .eq('module_id', moduleId);

      if (error) throw error;

      await supabase
        .from('modules')
        .update({ modules_count: count })
        .eq('id', moduleId);
    } catch (error) {
      console.error('Error updating modules count:', error);
    }
  },

  /**
   * Generate slug dari title
   */
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  },

  /**
   * Mendapatkan pesan error yang user-friendly
   */
  getErrorMessage(error) {
    const errorMessages = {
      'duplicate key value violates unique constraint': 'Data sudah ada',
      'invalid input syntax': 'Format data tidak valid',
      'foreign key constraint': 'Data terkait tidak ditemukan',
      'permission denied': 'Tidak memiliki akses',
      'not null violation': 'Field wajib tidak boleh kosong',
      'unique constraint': 'Data sudah ada',
      'File harus berupa gambar': 'File harus berupa gambar',
      'Ukuran file maksimal 5MB': 'Ukuran file maksimal 5MB',
      'The resource was not found': 'File tidak ditemukan',
      'Bucket not found': 'Storage bucket tidak ditemukan',
      'StorageApi': 'Terjadi kesalahan pada storage',
      'new row violates row-level security policy': 'Tidak memiliki izin akses untuk operasi ini',
      'User tidak terautentikasi': 'User tidak terautentikasi',
      'row-level security policy': 'Akses ditolak oleh kebijakan keamanan'
    };

    const message = error.message || error.toString();
    
    for (const [key, value] of Object.entries(errorMessages)) {
      if (message.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    return message || 'Terjadi kesalahan yang tidak terduga';
  }
};

// Export individual functions
export const {
  getModules,
  getModuleById,
  createOrUpdateModule,
  deleteModule,
  getModuleDetails,
  createOrUpdateModuleDetail,
  deleteModuleDetail,
  getQuizByModuleId,
  createOrUpdateQuiz,
  deleteQuiz,
  uploadModuleImage,
  deleteModuleImage
} = adminModuleService;

export default adminModuleService;