// src/pages/FAQPage.jsx
import React from 'react';

function FAQPage() {
  const faqs = [
    {
      question: "Apa itu AgriNuklir Platform?",
      answer: "AgriNuklir Platform adalah platform edukasi online yang dirancang untuk mengenalkan pemanfaatan teknologi nuklir di bidang pertanian, seperti iradiasi benih, pengawetan makanan, dan analisis tanah, kepada pelajar, petani muda, dan masyarakat umum."
    },
    {
      question: "Apakah teknologi nuklir di pertanian aman?",
      answer: "Ya, teknologi nuklir yang diterapkan di bidang pertanian (misalnya iradiasi) dilakukan dengan dosis sangat terkontrol dan telah terbukti aman oleh berbagai badan internasional seperti FAO dan WHO. Tujuannya adalah untuk meningkatkan kualitas dan keamanan produk pertanian, bukan untuk membuat produk tersebut radioaktif."
    },
    {
      question: "Bagaimana cara mendapatkan sertifikat?",
      answer: "Sertifikat kompetensi akan diberikan secara otomatis setelah Anda berhasil menyelesaikan seluruh modul edukasi yang ditentukan dan lulus ujian akhir modul."
    },
    {
      question: "Apakah simulasi di platform ini nyata?",
      answer: "Simulasi interaktif kami dirancang untuk memberikan gambaran visual dan pemahaman konsep tentang proses-proses seperti iradiasi benih atau pengawetan makanan. Meskipun interaktif, ini adalah simulasi virtual dan bukan operasional nyata."
    },
    {
      question: "Apakah ada biaya untuk menggunakan platform ini?",
      answer: "Untuk saat ini, AgriNuklir Platform tersedia secara gratis untuk tujuan edukasi. Informasi mengenai fitur premium atau perubahan kebijakan di masa depan akan diumumkan."
    },
    {
      question: "Bagaimana saya bisa berkontribusi atau memberikan masukan?",
      answer: "Kami sangat menghargai masukan Anda! Anda bisa menghubungi kami melalui halaman 'Hubungi Kami' atau berpartisipasi di 'Forum Komunitas' untuk berbagi ide dan saran."
    }
  ];

  return (
    <div className="container mx-auto p-8 py-12 min-h-[calc(100vh-160px)] pt-24">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Pertanyaan yang Sering Diajukan (FAQ)</h1>

      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{faq.question}</h2>
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQPage;