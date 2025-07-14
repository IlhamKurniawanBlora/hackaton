import React, { useState, useEffect } from 'react';
import { User, Award, Camera, Save, Loader2, Mail, Edit2 } from 'lucide-react';
import { authService } from '~/utils/auth';
import { supabase } from '~/utils/supabase';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    avatar_url: ''
  });
  const [certifications, setCertifications] = useState([]);

  // Load user data and profile
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const { user: authUser } = await authService.getCurrentUser();
      
      if (authUser) {
        setUser(authUser);
        
        // Load profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error loading profile:', profileError);
        } else if (profileData) {
          setProfile({
            username: profileData.username || '',
            full_name: profileData.full_name || '',
            avatar_url: profileData.avatar_url || ''
          });
        }

        // Load certifications
        loadCertifications(authUser.id);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCertifications = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading certifications:', error);
      } else {
        setCertifications(data || []);
      }
    } catch (error) {
      console.error('Error loading certifications:', error);
    }
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !user) return;

    try {
      setUploadingAvatar(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${user.id}/${fileName}`;

      // Upload file to storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const updatedProfile = { ...profile, avatar_url: publicUrl };
      setProfile(updatedProfile);
      
      // Save to database
      await updateProfile(updatedProfile);
      
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Gagal upload avatar: ' + error.message);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const updateProfile = async (profileData = profile) => {
    if (!user) return;

    try {
      setUpdating(true);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          username: profileData.username,
          full_name: profileData.full_name,
          avatar_url: profileData.avatar_url,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      alert('Profile berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui profile: ' + error.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleProfileChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-green-600" />
          <span className="text-lg font-medium text-gray-700">Memuat data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-50">

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border mb-8">
          <div className="p-6">
            <div className="flex items-center space-x-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-400 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 cursor-pointer transition-colors shadow-lg">
                  {uploadingAvatar ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Camera className="w-4 h-4" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={uploadingAvatar}
                  />
                </label>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {profile.full_name || 'Belum diisi'}
                </h2>
                <p className="text-gray-600">@{profile.username || 'username'}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border">
          {/* Tab Headers */}
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-4 px-6 text-sm font-medium text-center border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profil</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('certifications')}
                className={`flex-1 py-4 px-6 text-sm font-medium text-center border-b-2 transition-colors ${
                  activeTab === 'certifications'
                    ? 'border-green-500 text-green-600 bg-green-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Award className="w-4 h-4" />
                  <span>Sertifikasi</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' ? (
              <ProfileTab 
                profile={profile}
                onProfileChange={handleProfileChange}
                onUpdate={updateProfile}
                updating={updating}
              />
            ) : (
              <CertificationTab 
                certifications={certifications}
                onRefresh={() => loadCertifications(user?.id)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ profile, onProfileChange, onUpdate, updating }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-6">
        <Edit2 className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold text-gray-900">Edit Profil</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            type="text"
            value={profile.username}
            onChange={(e) => onProfileChange('username', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan username"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            value={profile.full_name}
            onChange={(e) => onProfileChange('full_name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* Avatar URL (Read Only) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Avatar URL
          </label>
          <input
            type="text"
            value={profile.avatar_url}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
            placeholder="URL avatar akan muncul setelah upload"
          />
          <p className="text-xs text-gray-500 mt-1">
            Upload avatar menggunakan tombol kamera di atas
          </p>
        </div>
      </div>

      {/* Update Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={() => onUpdate()}
          disabled={updating}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors"
        >
          {updating ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{updating ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
        </button>
      </div>
    </div>
  );
};

// Certification Tab Component
const CertificationTab = ({ certifications, onRefresh }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Sertifikasi</h3>
        </div>
        <button
          onClick={onRefresh}
          className="text-sm text-green-600 hover:text-green-700 font-medium"
        >
          Refresh
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-12">
          <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Belum Ada Sertifikasi
          </h4>
          <p className="text-gray-600 mb-6">
            Anda belum memiliki sertifikasi apapun. Mulai ikuti program pelatihan untuk mendapatkan sertifikasi.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors">
            Jelajahi Program
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{cert.certificate_number}</h4>
                  <p className="text-sm text-gray-600 mt-1">{cert.created_at}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Diterbitkan: {new Date(cert.created_at).toLocaleDateString('id-ID')}
                  </p>
                  {cert.expiry_date && (
                    <p className="text-xs text-gray-500">
                      Berlaku hingga: selamanya
                    </p>
                  )}
                </div>
              </div>
              {cert.certificate_url && (
                <div className="mt-3 pt-3 border-t">
                  <a
                    href={`certificate/${cert.module_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Lihat Sertifikat →
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;