import React from 'react';
import { Shield, Leaf, Atom, Mail, Phone, MapPin, Lock, Eye, Users, FileText } from 'lucide-react';

function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
      {/* Header dengan gradient background */}
      <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Leaf className="w-12 h-12 text-green-200" />
                <Atom className="w-6 h-6 text-blue-200 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">AgriNuklir Platform</h1>
            </div>
          </div>
          <div className="text-center">
            <Shield className="w-16 h-16 mx-auto mb-4 text-green-200" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kebijakan Privasi</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Komitmen kami dalam melindungi data dan privasi pengguna platform teknologi nuklir untuk pertanian
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Info Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-green-100">
          <div className="flex items-center space-x-3 mb-4">
            <FileText className="w-6 h-6 text-green-600" />
            <p className="text-sm text-gray-600 font-medium">
              Terakhir Diperbarui: <span className="text-green-700 font-semibold">{currentDate}</span>
            </p>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Selamat datang di AgriNuklir Platform ("Kami", "Platform"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda saat Anda menggunakan layanan teknologi nuklir untuk pertanian modern.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
            <div className="flex items-center space-x-3 mb-6">
              <Eye className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-800">1. Informasi yang Kami Kumpulkan</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Kami mengumpulkan informasi untuk memberikan layanan terbaik dalam teknologi nuklir pertanian:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="font-bold text-green-800 mb-3 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Informasi Langsung
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Informasi yang Anda berikan saat mendaftar, mengisi formulir penelitian pertanian, berpartisipasi dalam forum teknologi nuklir, atau menghubungi tim peneliti kami. Termasuk nama, email, institusi, dan bidang keahlian.
                </p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="font-bold text-blue-800 mb-3 flex items-center">
                  <Atom className="w-5 h-5 mr-2" />
                  Data Penggunaan Otomatis
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Data interaksi dengan platform penelitian nuklir, seperti alamat IP, jenis perangkat, halaman penelitian yang dikunjungi, waktu akses laboratorium virtual, dan data diagnostik sistem.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
            <div className="flex items-center space-x-3 mb-6">
              <Leaf className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">2. Penggunaan Informasi dalam Penelitian Pertanian</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Menyediakan akses ke teknologi nuklir pertanian",
                "Mengembangkan varietas tanaman unggul",
                "Menganalisis efektivitas teknik iradiasi",
                "Memfasilitasi kolaborasi penelitian internasional",
                "Memberikan update teknologi terbaru",
                "Menyediakan layanan konsultasi teknis",
                "Mengembangkan sistem keamanan radiologi",
                "Mencegah penyalahgunaan teknologi nuklir"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-l-4 border-emerald-500">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-800">3. Pengungkapan dan Keamanan Data</h2>
            </div>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 mb-6">
              <p className="text-red-800 font-semibold mb-2">⚠️ Kebijakan Khusus Teknologi Nuklir</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                Kami TIDAK PERNAH menjual informasi identifikasi pribadi. Data penelitian nuklir pertanian dilindungi dengan standar keamanan tinggi sesuai regulasi BATAN dan IAEA.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3">Partner Penelitian Resmi</h3>
                <p className="text-gray-700 text-sm">Universitas, lembaga penelitian, dan organisasi internasional yang telah diverifikasi untuk kolaborasi teknologi nuklir pertanian.</p>
              </div>
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <h3 className="font-bold text-amber-800 mb-3">Kewajiban Regulasi</h3>
                <p className="text-gray-700 text-sm">Pengungkapan data hanya untuk keperluan hukum, audit keamanan nuklir, atau permintaan resmi BATAN dan otoritas terkait.</p>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">4. Protokol Keamanan Tingkat Tinggi</h2>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                Mengingat sensitifitas teknologi nuklir, kami menerapkan protokol keamanan berlapis dengan enkripsi tingkat militer, autentikasi multi-faktor, dan monitoring 24/7 untuk melindungi data penelitian dan informasi pengguna.
              </p>
              <div className="flex items-center space-x-2 text-sm text-purple-700">
                <Lock className="w-4 h-4" />
                <span>Sertifikasi ISO 27001 • Compliance IAEA • Audit BATAN</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Hubungi Tim Keamanan Data</h2>
              <p className="text-green-100 max-w-2xl mx-auto">
                Untuk pertanyaan tentang kebijakan privasi atau keamanan data teknologi nuklir pertanian
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Email Resmi</h3>
                <a href="mailto:privacy@agrinuklir.com" className="text-green-200 hover:text-white transition-colors">
                  privacy@agrinuklir.com
                </a>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Hotline Keamanan</h3>
                <p className="text-green-200">+62-21-NUKLIR-1</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-bold mb-2">Pusat Keamanan Data</h3>
                <p className="text-green-200">Jakarta - Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 p-6 bg-gray-100 rounded-xl">
          <p className="text-gray-600 text-sm">
            Kebijakan ini disusun sesuai dengan standar keamanan internasional untuk teknologi nuklir dan regulasi perlindungan data Indonesia.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;