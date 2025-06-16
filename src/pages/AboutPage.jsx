// src/pages/AboutPage.jsx (dan terapkan konsep serupa ke halaman statis lainnya)
import React from 'react';

function AboutPage() {
  return (
    <div className="container mx-auto p-8 py-12 min-h-[calc(100vh-160px)]">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8 font-heading">Tentang AgriNuklir Platform</h1>

      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto"> {/* Lebih melengkung dan bayangan lebih kuat */}
        <h2 className="text-3xl font-semibold text-primary-green mb-6 font-heading">Misi Kami</h2> {/* Gunakan primary-green dan font-heading */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          AgriNuklir Platform didirikan dengan misi untuk menjembatani kesenjangan informasi mengenai pemanfaatan teknologi nuklir di bidang pertanian. Kami percaya bahwa edukasi yang akurat dan mudah diakses adalah kunci untuk mempromosikan praktik pertanian yang inovatif dan berkelanjutan.
        </p>

        <h2 className="text-3xl font-semibold text-primary-green mb-6 mt-8 font-heading">Visi Kami</h2> {/* Gunakan primary-green dan font-heading */}
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Menjadi sumber daya terkemuka bagi pelajar, petani muda, dan komunitas pertanian di Indonesia untuk memahami, mengadopsi, dan berkontribusi pada pengembangan aplikasi nuklir dalam pertanian. Kami bertekad untuk memberdayakan generasi mendatang dengan pengetahuan dan alat yang diperlukan untuk menghadapi tantangan ketahanan pangan global.
        </p>

        <h2 className="text-3xl font-semibold text-primary-green mb-6 mt-8 font-heading">Apa yang Kami Tawarkan?</h2> {/* Gunakan primary-green dan font-heading */}
        <ul className="list-disc list-inside text-lg text-gray-700 leading-relaxed mb-6 space-y-2 pl-4"> {/* Tambah pl-4 untuk indentasi list */}
          <li>**Modul Edukasi Interaktif**: Pelajari konsep dasar hingga aplikasi canggih teknologi nuklir di pertanian.</li>
          <li>**Simulasi Praktis**: Eksperimen virtual dengan skenario iradiasi benih, pengawetan makanan, dan lainnya.</li>
          <li>**Chatbot Edukasi AI**: Dapatkan jawaban instan untuk pertanyaan Anda seputar agrinuklir.</li>
          <li>**Forum Komunitas**: Berinteraksi dengan sesama pegiat pertanian dan ahli di bidangnya.</li>
          <li>**Sertifikat Kompetensi**: Dapatkan pengakuan atas pengetahuan yang Anda peroleh.</li>
        </ul>

        <p className="text-lg text-gray-700 leading-relaxed mt-8 text-center italic">
          "Pertanian masa depan adalah pertanian yang didukung inovasi, termasuk teknologi nuklir yang aman dan berkelanjutan."
        </p>
      </div>
    </div>
  );
}

export default AboutPage;