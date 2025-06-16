// src/pages/PrivacyPolicyPage.jsx
import React from 'react';

function PrivacyPolicyPage() {
  const currentDate = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="container mx-auto p-8 py-12 min-h-[calc(100vh-160px)]">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Kebijakan Privasi AgriNuklir Platform</h1>

      <div className="bg-white rounded-lg shadow-xl p-8 max-w-3xl mx-auto prose max-w-none"> {/* Gunakan 'prose' untuk styling teks panjang */}
        <p className="text-sm text-gray-500 mb-6">Terakhir Diperbarui: {currentDate}</p>

        <p>
          Selamat datang di AgriNuklir Platform ("Kami", "Platform"). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda saat Anda menggunakan layanan kami.
        </p>

        <h2>1. Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami mungkin mengumpulkan jenis informasi berikut saat Anda menggunakan Platform kami:
        </p>
        <ul>
          <li>**Informasi yang Anda Berikan Secara Langsung**: Ini termasuk informasi yang Anda berikan saat mendaftar, mengisi formulir, berpartisipasi dalam forum, atau menghubungi kami. Contohnya termasuk nama, alamat email, dan kredensial login.</li>
          <li>**Informasi Penggunaan Otomatis**: Saat Anda mengakses dan menggunakan Platform, kami mungkin secara otomatis mengumpulkan informasi tertentu tentang perangkat dan interaksi Anda, seperti alamat IP, jenis browser, halaman yang Anda kunjungi, waktu yang dihabiskan di halaman tersebut, dan data diagnostik lainnya.</li>
        </ul>

        <h2>2. Bagaimana Kami Menggunakan Informasi Anda</h2>
        <p>
          Informasi yang kami kumpulkan digunakan untuk berbagai tujuan, antara lain:
        </p>
        <ul>
          <li>Menyediakan, mengoperasikan, dan memelihara Platform kami.</li>
          <li>Meningkatkan, mempersonalisasi, dan memperluas Platform kami.</li>
          <li>Memahami dan menganalisis bagaimana Anda menggunakan Platform kami.</li>
          <li>Mengembangkan produk, layanan, fitur, dan fungsionalitas baru.</li>
          <li>Berkomunikasi dengan Anda, baik secara langsung maupun melalui salah satu mitra kami, termasuk untuk layanan pelanggan, untuk memberi Anda pembaruan dan informasi lain yang berkaitan dengan Platform, dan untuk tujuan pemasaran dan promosi.</li>
          <li>Mengirim email kepada Anda.</li>
          <li>Menemukan dan mencegah penipuan.</li>
        </ul>

        <h2>3. Pengungkapan Informasi Anda</h2>
        <p>
          Kami tidak menjual informasi identifikasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi Anda dengan:
        </p>
        <ul>
          <li>**Penyedia Layanan Pihak Ketiga**: Kami dapat menggunakan penyedia layanan pihak ketiga untuk membantu kami mengoperasikan, menyediakan, atau mengelola Platform (misalnya, penyedia hosting, layanan analitik, penyedia email).</li>
          <li>**Kewajiban Hukum**: Kami dapat mengungkapkan informasi Anda jika diwajibkan oleh hukum atau sebagai tanggapan atas permintaan yang sah oleh otoritas publik (misalnya, pengadilan atau lembaga pemerintah).</li>
        </ul>

        <h2>4. Keamanan Data</h2>
        <p>
          Keamanan informasi Anda adalah prioritas bagi kami. Kami berusaha menggunakan langkah-langkah perlindungan yang wajar secara komersial untuk melindungi informasi pribadi Anda. Namun, tidak ada metode transmisi melalui internet, atau metode penyimpanan elektronik yang 100% aman dan kami tidak dapat menjamin keamanan absolutnya.
        </p>

        <h2>5. Tautan ke Situs Lain</h2>
        <p>
          Platform kami mungkin berisi tautan ke situs web lain yang tidak dioperasikan oleh kami. Jika Anda mengklik tautan pihak ketiga, Anda akan diarahkan ke situs pihak ketiga tersebut. Kami sangat menyarankan Anda untuk meninjau Kebijakan Privasi setiap situs yang Anda kunjungi.
        </p>
        <p>
          Kami tidak memiliki kendali atas dan tidak bertanggung jawab atas konten, kebijakan privasi, atau praktik situs atau layanan pihak ketiga mana pun.
        </p>

        <h2>6. Perubahan pada Kebijakan Privasi Ini</h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberitahu Anda tentang setiap perubahan dengan memposting Kebijakan Privasi baru di halaman ini. Anda disarankan untuk meninjau Kebijakan Privasi ini secara berkala untuk setiap perubahan.
        </p>

        <h2>7. Hubungi Kami</h2>
        <p>
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, Anda dapat menghubungi kami:
        </p>
        <ul>
          <li>Melalui email: <a href="mailto:info@agrinuklir.com">info@agrinuklir.com</a></li>
          <li>Melalui halaman kontak kami: <Link to="/contact">Hubungi Kami</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;