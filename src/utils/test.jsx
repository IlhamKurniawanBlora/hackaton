// utils/test.js
import { supabase } from './supabase';
import { authService } from './auth';

/**
 * Service untuk mengelola quiz dan sertifikat
 */
export const testService = {
  /**
   * Mendapatkan quiz berdasarkan module ID
   * @param {string} moduleId - ID dari module
   * @returns {Promise<{success: boolean, quiz?: object, error?: string}>}
   */
  async getQuizByModuleId(moduleId) {
    try {
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('module_id', moduleId)
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        quiz: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal mengambil data quiz'
      };
    }
  },

  /**
   * Mendapatkan semua quiz berdasarkan module ID
   * @param {string} moduleId - ID dari module
   * @returns {Promise<{success: boolean, quizzes?: array, error?: string}>}
   */
  async getAllQuizzesByModuleId(moduleId) {
    try {
      const { data, error } = await supabase
        .from('quiz')
        .select('*')
        .eq('module_id', moduleId)
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      return {
        success: true,
        quizzes: data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal mengambil data quiz'
      };
    }
  },

  /**
   * Menghitung skor dari jawaban quiz
   * @param {array} questions - Array pertanyaan dari quiz
   * @param {array} userAnswers - Array jawaban pengguna
   * @returns {object} - {score: number, percentage: number, totalQuestions: number}
   */
  calculateScore(questions, userAnswers) {
    if (!questions || !userAnswers || questions.length !== userAnswers.length) {
      throw new Error('Data pertanyaan dan jawaban tidak valid');
    }

    let correctAnswers = 0;
    const totalQuestions = questions.length;

    questions.forEach((question, index) => {
      if (question.correct === userAnswers[index]) {
        correctAnswers++;
      }
    });

    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    return {
      score: correctAnswers,
      percentage,
      totalQuestions,
      correctAnswers,
      wrongAnswers: totalQuestions - correctAnswers
    };
  },

  /**
   * Membuat summary hasil quiz
   * @param {object} quiz - Data quiz
   * @param {array} userAnswers - Jawaban pengguna
   * @returns {object} - Summary lengkap hasil quiz
   */
  createQuizSummary(quiz, userAnswers) {
    try {
      const scoreData = this.calculateScore(quiz.questions, userAnswers);
      const passed = scoreData.percentage >= quiz.passing_score;

      return {
        quizId: quiz.id,
        moduleId: quiz.module_id,
        title: quiz.title,
        ...scoreData,
        passingScore: quiz.passing_score,
        passed,
        canGetCertificate: scoreData.percentage >= 80 // Sertifikat untuk nilai 80% ke atas
      };
    } catch (error) {
      throw new Error(`Gagal membuat summary: ${error.message}`);
    }
  },

  /**
   * Generate nomor sertifikat unik
   * @returns {string} - Nomor sertifikat
   */
  generateCertificateNumber() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `CERT-${timestamp}-${random}`;
  },

  /**
   * Menyimpan data sertifikat ke database
   * @param {object} certificationData - Data sertifikat
   * @returns {Promise<{success: boolean, certification?: object, error?: string}>}
   */
  async saveCertification(certificationData) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .insert([certificationData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        certification: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal menyimpan sertifikat'
      };
    }
  },

  /**
   * Membuat dan menyimpan sertifikat
   * @param {string} moduleId - ID module
   * @param {string} quizId - ID quiz
   * @param {number} score - Nilai yang diperoleh
   * @param {string} userName - Nama pengguna
   * @returns {Promise<{success: boolean, certification?: object, error?: string}>}
   */
  async createCertification(moduleId, quizId, score, userName) {
    try {
      // Ambil data pengguna saat ini
      const { user } = await authService.getCurrentUser();
      
      if (!user) {
        throw new Error('Pengguna tidak ditemukan');
      }

      // Cek apakah sudah ada sertifikat untuk module ini
      const existingCert = await this.getCertificationByModuleId(moduleId, user.id);
      
      if (existingCert.success && existingCert.certification) {
        return {
          success: false,
          error: 'Sertifikat untuk modul ini sudah ada'
        };
      }

      // Generate nomor sertifikat
      const certificateNumber = this.generateCertificateNumber();

      // Data sertifikat
      const certificationData = {
        user_id: user.id,
        module_id: moduleId,
        quiz_id: quizId,
        certificate_number: certificateNumber,
        user_name: userName,
        score: score,
        certificate_url: null, // Akan diisi setelah generate PDF
        issued_at: new Date().toISOString(),
      };

      // Simpan ke database
      const result = await this.saveCertification(certificationData);

      if (result.success) {
        // TODO: Generate PDF sertifikat dan upload ke storage
        // const pdfUrl = await this.generateCertificatePDF(result.certification);
        // await this.updateCertificationUrl(result.certification.id, pdfUrl);
        
        return {
          success: true,
          certification: result.certification,
          message: 'Sertifikat berhasil dibuat!'
        };
      }

      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal membuat sertifikat'
      };
    }
  },

  /**
   * Mendapatkan sertifikat berdasarkan module ID dan user ID
   * @param {string} moduleId - ID module
   * @param {string} userId - ID user
   * @returns {Promise<{success: boolean, certification?: object, error?: string}>}
   */
  async getCertificationByModuleId(moduleId, userId) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('module_id', moduleId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        throw error;
      }

      return {
        success: true,
        certification: data || null
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal mengambil data sertifikat'
      };
    }
  },

  /**
   * Mendapatkan semua sertifikat pengguna
   * @param {string} userId - ID user
   * @returns {Promise<{success: boolean, certifications?: array, error?: string}>}
   */
  async getUserCertifications(userId) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select(`
          *,
          modules:module_id (
            title,
            description
          )
        `)
        .eq('user_id', userId)
        .order('issued_at', { ascending: false });

      if (error) {
        throw error;
      }

      return {
        success: true,
        certifications: data || []
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal mengambil data sertifikat'
      };
    }
  },

  /**
   * Mendapatkan sertifikat berdasarkan nomor sertifikat
   * @param {string} certificateNumber - Nomor sertifikat
   * @returns {Promise<{success: boolean, certification?: object, error?: string}>}
   */
  async getCertificationByNumber(certificateNumber) {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select(`
          *,
          modules:module_id (
            title,
            description
          )
        `)
        .eq('certificate_number', certificateNumber)
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        certification: data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Sertifikat tidak ditemukan'
      };
    }
  },

  /**
   * Update URL sertifikat setelah PDF dibuat
   * @param {string} certificationId - ID sertifikat
   * @param {string} certificateUrl - URL file sertifikat
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  async updateCertificationUrl(certificationId, certificateUrl) {
    try {
      const { error } = await supabase
        .from('certifications')
        .update({ certificate_url: certificateUrl })
        .eq('id', certificationId);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal update URL sertifikat'
      };
    }
  },

  /**
   * Proses lengkap: dari submit quiz hingga dapat sertifikat
   * @param {string} moduleId - ID module
   * @param {array} userAnswers - Jawaban pengguna
   * @param {string} userName - Nama pengguna
   * @returns {Promise<{success: boolean, summary?: object, certification?: object, error?: string}>}
   */
  async processQuizSubmission(moduleId, userAnswers, userName) {
    try {
      // 1. Ambil data quiz
      const quizResult = await this.getQuizByModuleId(moduleId);
      if (!quizResult.success) {
        throw new Error(quizResult.error);
      }

      // 2. Buat summary
      const summary = this.createQuizSummary(quizResult.quiz, userAnswers);

      // 3. Jika nilai >= 80%, buat sertifikat
      let certification = null;
      if (summary.canGetCertificate) {
        const certResult = await this.createCertification(
          moduleId,
          quizResult.quiz.id,
          summary.percentage,
          userName
        );

        if (certResult.success) {
          certification = certResult.certification;
        } else {
          // Jika gagal buat sertifikat, tetap return summary
          console.warn('Gagal membuat sertifikat:', certResult.error);
        }
      }

      return {
        success: true,
        summary,
        certification,
        message: summary.passed ? 'Selamat! Anda berhasil menyelesaikan quiz.' : 'Maaf, Anda belum lulus quiz ini.'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Gagal memproses quiz'
      };
    }
  }
};

// Export individual functions
export const {
  getQuizByModuleId,
  getAllQuizzesByModuleId,
  calculateScore,
  createQuizSummary,
  generateCertificateNumber,
  saveCertification,
  createCertification,
  getCertificationByModuleId,
  getUserCertifications,
  getCertificationByNumber,
  updateCertificationUrl,
  processQuizSubmission
} = testService;

// Export default
export default testService;