import { useState, useEffect, useRef } from 'react';
import { testService } from '../utils/test';
import { authService } from '../utils/auth';
import { Download, Award, Calendar, Check, Share2, ArrowLeft, Star } from 'lucide-react';

const CertificatePage = () => {
  // Mock moduleId for demo - in real app this would come from URL params
  const moduleId = 'e51d7795-b5bc-4f7d-a726-bdeb21ce20e9';
  
  // State management
  const [certification, setCertification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [moduleData, setModuleData] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  // Load certification data
  useEffect(() => {
    const loadCertification = async () => {
      try {
        setLoading(true);
        
        // Get current user
        const { user: currentUser } = await authService.getCurrentUser();
        if (!currentUser) {
          setError('Silakan login terlebih dahulu');
          return;
        }
        setUser(currentUser);
        
        // Get certification data
        const result = await testService.getCertificationByModuleId(moduleId, currentUser.id);
        if (!result.success) {
          throw new Error(result.error);
        }
        
        if (!result.certification) {
          setError('Sertifikat tidak ditemukan. Pastikan Anda telah menyelesaikan quiz dengan nilai minimal 80%');
          return;
        }
        
        setCertification(result.certification);
        
        // Mock module data - in real app, fetch from modules table
        setModuleData({
          title: 'Advanced Web Development',
          description: 'Complete course on modern web development techniques',
          instructor: 'John Doe',
          duration: '40 hours'
        });
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadCertification();
  }, [moduleId]);

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Generate certificate as image/PDF
  const generateCertificateImage = () => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Set canvas size (A4 landscape ratio)
      canvas.width = 1200;
      canvas.height = 850;
      
      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f8fafc');
      gradient.addColorStop(0.5, '#e2e8f0');
      gradient.addColorStop(1, '#cbd5e1');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Border
      ctx.strokeStyle = '#1e40af';
      ctx.lineWidth = 8;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
      
      // Inner border
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
      
      // Title
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 180);
      
      // Subtitle
      ctx.fillStyle = '#64748b';
      ctx.font = '24px Arial';
      ctx.fillText('This is to certify that', canvas.width / 2, 230);
      
      // Name
      ctx.fillStyle = '#1e293b';
      ctx.font = 'bold 42px Arial';
      ctx.fillText(certification.user_name, canvas.width / 2, 300);
      
      // Achievement text
      ctx.fillStyle = '#64748b';
      ctx.font = '24px Arial';
      ctx.fillText('has successfully completed the course', canvas.width / 2, 350);
      
      // Course title
      ctx.fillStyle = '#1e40af';
      ctx.font = 'bold 36px Arial';
      ctx.fillText(moduleData?.title || 'Course Title', canvas.width / 2, 420);
      
      // Score
      ctx.fillStyle = '#059669';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(`with a score of ${certification.score}%`, canvas.width / 2, 480);
      
      // Date and certificate number
      ctx.fillStyle = '#64748b';
      ctx.font = '20px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Date: ${formatDate(certification.issued_at)}`, 100, 700);
      ctx.textAlign = 'right';
      ctx.fillText(`Certificate No: ${certification.certificate_number}`, canvas.width - 100, 700);
      
      // Signature line
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(canvas.width - 300, 780);
      ctx.lineTo(canvas.width - 100, 780);
      ctx.stroke();
      
      ctx.fillStyle = '#64748b';
      ctx.font = '18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Authorized Signature', canvas.width - 200, 800);
      
      // Add decorative elements
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(150, 150, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(canvas.width - 150, 150, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      resolve(canvas.toDataURL('image/png'));
    });
  };

  // Download certificate
  const downloadCertificate = async () => {
    try {
      setIsDownloading(true);
      
      // Generate certificate image
      const imageData = await generateCertificateImage();
      
      // Create download link
      const link = document.createElement('a');
      link.href = imageData;
      link.download = `Certificate_${certification.certificate_number}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Save download record (optional)
      // await testService.recordCertificateDownload(certification.id);
      
    } catch (err) {
      alert('Gagal mendownload sertifikat: ' + err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  // Share certificate
  const shareCertificate = async () => {
    const shareData = {
      title: 'Sertifikat Saya',
      text: `Saya telah menyelesaikan course ${moduleData?.title} dengan nilai ${certification.score}%!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareData.text + ' ' + shareData.url);
      alert('Link sertifikat telah disalin ke clipboard!');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat sertifikat...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <Award className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sertifikat Tidak Ditemukan</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sertifikat Anda</h1>
          <p className="text-gray-600">Selamat! Anda telah berhasil menyelesaikan course</p>
        </div>

        {/* Certificate Display */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8" ref={certificateRef}>
          {/* Certificate Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full p-4">
                <Award className="h-12 w-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mb-2">CERTIFICATE OF COMPLETION</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          {/* Certificate Body */}
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 mb-4">This is to certify that</p>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-blue-900">
              {certification.user_name}
            </h3>
            <p className="text-lg text-gray-600 mb-4">has successfully completed the course</p>
            <h4 className="text-2xl font-semibold text-blue-800 mb-6">
              {moduleData?.title}
            </h4>
            
            {/* Score Badge */}
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full mb-6">
              <Star className="h-5 w-5 mr-2" />
              <span className="text-lg font-semibold">Score: {certification.score}%</span>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="flex justify-between items-end pt-8 border-t border-gray-200">
            <div className="text-left">
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Issued on {formatDate(certification.issued_at)}</span>
              </div>
              <p className="text-sm text-gray-500">
                Certificate No: {certification.certificate_number}
              </p>
            </div>
            
            <div className="text-right">
              <div className="w-32 h-px bg-gray-400 mb-2"></div>
              <p className="text-sm text-gray-600">Authorized Signature</p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 opacity-10">
            <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
          </div>
          <div className="absolute top-8 right-8 opacity-10">
            <div className="w-16 h-16 bg-blue-400 rounded-full"></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={downloadCertificate}
            disabled={isDownloading}
            className="flex items-center justify-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDownloading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Mendownload...
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Download Certificate
              </>
            )}
          </button>

          <button
            onClick={shareCertificate}
            className="flex items-center justify-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Certificate
          </button>
        </div>

        {/* Certificate Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Certificate Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <Check className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Status</p>
                <p className="text-sm text-gray-600">Verified & Authentic</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Achievement</p>
                <p className="text-sm text-gray-600">Course Completion</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Valid From</p>
                <p className="text-sm text-gray-600">{formatDate(certification.issued_at)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-gray-900">Final Score</p>
                <p className="text-sm text-gray-600">{certification.score}% (Excellent)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            This certificate can be verified using certificate number: 
            <span className="font-mono font-medium text-gray-700 ml-1">
              {certification.certificate_number}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificatePage;