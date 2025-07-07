import { supabase, getImageUrl, uploadFile, deleteFile, createSignedUrl } from './supabase';

// ===================== MODULES =====================

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

export const getModuleById = async (moduleId) => {
  try {
    const { data, error } = await supabase
      .from('modules')
      .select('*')
      .eq('id', moduleId)
      .eq('is_active', true)
      .single();

    if (error) throw error;

    return {
      ...data,
      imageUrl: data.image_url ? getImageUrl('modules', data.image_url) : null
    };
  } catch (error) {
    console.error('Error fetching module:', error);
    return null;
  }
};

// ===================== MODULE DETAILS =====================

export const getModuleDetails = async (moduleId) => {
  try {
    const { data, error } = await supabase
      .from('modules_detail')
      .select('*')
      .eq('module_id', moduleId)
      .order('sequence_order', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching module details:', error);
    return [];
  }
};

export const getModuleDetailById = async (detailId) => {
  try {
    const { data, error } = await supabase
      .from('modules_detail')
      .select('*')
      .eq('id', detailId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching module detail:', error);
    return null;
  }
};

// ===================== QUIZ =====================

export const getQuizByModuleId = async (moduleId) => {
  try {
    const { data, error } = await supabase
      .from('quiz')
      .select('*')
      .eq('module_id', moduleId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching quiz:', error);
    return null;
  }
};

export const createQuiz = async (moduleId, title, questions, passingScore = 70) => {
  try {
    const { data, error } = await supabase
      .from('quiz')
      .insert({
        module_id: moduleId,
        title,
        questions,
        passing_score: passingScore
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating quiz:', error);
    return null;
  }
};

export const updateQuiz = async (quizId, updates) => {
  try {
    const { data, error } = await supabase
      .from('quiz')
      .update(updates)
      .eq('id', quizId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating quiz:', error);
    return null;
  }
};

// ===================== CERTIFICATIONS =====================

export const createCertification = async (userId, moduleId, quizId, userName, score, certificateUrl = null) => {
  try {
    // Generate certificate number
    const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    const { data, error } = await supabase
      .from('certifications')
      .insert({
        user_id: userId,
        module_id: moduleId,
        quiz_id: quizId,
        certificate_number: certificateNumber,
        user_name: userName,
        score,
        certificate_url: certificateUrl
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating certification:', error);
    return null;
  }
};

export const getCertificationsByUserId = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select(`
        *,
        modules (
          id,
          title,
          image_url
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(cert => ({
      ...cert,
      module: {
        ...cert.modules,
        imageUrl: cert.modules.image_url ? getImageUrl('modules', cert.modules.image_url) : null
      },
      certificateDownloadUrl: cert.certificate_url ? getImageUrl('certifications', cert.certificate_url) : null
    }));
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return [];
  }
};

export const getCertificationById = async (certificationId) => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select(`
        *,
        modules (
          id,
          title,
          image_url
        )
      `)
      .eq('id', certificationId)
      .single();

    if (error) throw error;

    return {
      ...data,
      module: {
        ...data.modules,
        imageUrl: data.modules.image_url ? getImageUrl('modules', data.modules.image_url) : null
      },
      certificateDownloadUrl: data.certificate_url ? getImageUrl('certifications', data.certificate_url) : null
    };
  } catch (error) {
    console.error('Error fetching certification:', error);
    return null;
  }
};

export const updateCertificationUrl = async (certificationId, certificateUrl) => {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .update({ certificate_url: certificateUrl })
      .eq('id', certificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating certification URL:', error);
    return null;
  }
};

// ===================== CERTIFICATE FILE MANAGEMENT =====================

export const uploadCertificate = async (path, file) => {
  return uploadFile('certifications', path, file);
};

export const deleteCertificate = async (path) => {
  return deleteFile('certifications', path);
};

export const createCertificateSignedUrl = async (path, expiresIn = 3600) => {
  return createSignedUrl('certifications', path, expiresIn);
};

// ===================== HELPER FUNCTIONS =====================

export const calculateScore = (userAnswers, correctAnswers) => {
  if (!userAnswers || !correctAnswers || userAnswers.length !== correctAnswers.length) {
    return 0;
  }
  
  const correct = userAnswers.filter((answer, index) => answer === correctAnswers[index]).length;
  return Math.round((correct / correctAnswers.length) * 100);
};

export const hasPassedQuiz = (score, passingScore = 70) => {
  return score >= passingScore;
};

export const getModuleWithQuiz = async (moduleId) => {
  try {
    const [module, moduleDetails, quiz] = await Promise.all([
      getModuleById(moduleId),
      getModuleDetails(moduleId),
      getQuizByModuleId(moduleId)
    ]);

    return {
      module,
      moduleDetails,
      quiz
    };
  } catch (error) {
    console.error('Error fetching module with quiz:', error);
    return {
      module: null,
      moduleDetails: [],
      quiz: null
    };
  }
};