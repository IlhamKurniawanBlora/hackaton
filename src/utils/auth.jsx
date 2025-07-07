// utils/auth.js
import { supabase } from './supabase';

/**
 * Authentication service untuk mengelola semua fungsi auth
 */
export const authService = {
  /**
   * Login dengan email dan password
   * @param {string} email - Email pengguna
   * @param {string} password - Password pengguna
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        throw error;
      }

      return { 
        success: true, 
        user: data.user,
        session: data.session 
      };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Registrasi pengguna baru
   * @param {string} email - Email pengguna
   * @param {string} password - Password pengguna
   * @param {object} metadata - Data tambahan pengguna (nama, dll)
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  async signUp(email, password, metadata = {}) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: metadata
        }
      });

      if (error) {
        throw error;
      }

      return { 
        success: true, 
        user: data.user,
        session: data.session,
        needsConfirmation: !data.session // Jika tidak ada session, berarti perlu konfirmasi email
      };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Logout pengguna
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Mendapatkan pengguna yang sedang login
   * @returns {Promise<{user: object|null, session: object|null}>}
   */
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      return { user, session };
    } catch (error) {
      console.error('Error getting current user:', error);
      return { user: null, session: null };
    }
  },

  /**
   * Mengecek apakah pengguna sudah login
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    const { user } = await this.getCurrentUser();
    return !!user;
  },

  /**
   * Reset password via email
   * @param {string} email - Email pengguna
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async resetPassword(email) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Update password pengguna
   * @param {string} newPassword - Password baru
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async updatePassword(newPassword) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Update profile pengguna
   * @param {object} updates - Data yang akan diupdate
   * @returns {Promise<{success: boolean, user?: object, error?: string}>}
   */
  async updateProfile(updates) {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: updates
      });

      if (error) {
        throw error;
      }

      return { 
        success: true, 
        user: data.user 
      };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Resend email confirmation
   * @param {string} email - Email pengguna
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async resendConfirmation(email) {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: this.getErrorMessage(error) 
      };
    }
  },

  /**
   * Listen untuk perubahan auth state
   * @param {function} callback - Callback yang dipanggil saat auth state berubah
   * @returns {function} - Unsubscribe function
   */
  onAuthStateChange(callback) {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  },

  /**
   * Mendapatkan pesan error yang user-friendly
   * @param {object} error - Error object dari Supabase
   * @returns {string} - Pesan error yang user-friendly
   */
  getErrorMessage(error) {
    const errorMessages = {
      'Invalid login credentials': 'Email atau password salah',
      'Email not confirmed': 'Silakan konfirmasi email Anda terlebih dahulu',
      'User already registered': 'Email sudah terdaftar',
      'Password should be at least 6 characters': 'Password minimal 6 karakter',
      'Invalid email': 'Format email tidak valid',
      'Too many requests': 'Terlalu banyak percobaan. Silakan tunggu sebentar',
      'Signup is disabled': 'Registrasi sedang dinonaktifkan',
      'Email rate limit exceeded': 'Terlalu banyak email dikirim. Silakan tunggu sebentar',
      'Invalid credentials': 'Kredensial tidak valid',
      'User not found': 'Pengguna tidak ditemukan',
      'Session not found': 'Sesi tidak ditemukan',
      'Invalid refresh token': 'Token refresh tidak valid',
      'Password too weak': 'Password terlalu lemah',
      'Same password': 'Password baru harus berbeda dari password lama',
    };

    return errorMessages[error.message] || error.message || 'Terjadi kesalahan yang tidak terduga';
  }
};

// Export individual functions untuk kemudahan penggunaan
export const {
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  isAuthenticated,
  resetPassword,
  updatePassword,
  updateProfile,
  resendConfirmation,
  onAuthStateChange
} = authService;

// Export default
export default authService;