// src/data/simulations/simulationsData.js

const simulations = [
  {
    id: 'simulasi-iradiasi-benih',
    title: 'Simulasi Iradiasi Benih',
    shortDescription: 'Interaktif: Atur dosis radiasi dan lihat dampaknya pada benih.',
    image: '/assets/images/simulations/seed-irradiation-sim.jpg', // Gambar ilustrasi
    complexity: 'Menengah',
    estimatedTime: '15 Menit',
    detailedDescription: 'Simulasi ini memungkinkan Anda untuk memahami prinsip dasar iradiasi benih. Anda dapat mengatur parameter seperti jenis benih, dosis radiasi, dan durasi paparan. Hasilnya akan menunjukkan potensi perubahan pada pertumbuhan benih, ketahanan terhadap hama, atau induksi mutasi. Ini adalah alat visual yang membantu Anda memvisualisasikan konsep abstrak dari teknologi nuklir dalam pertanian.'
    // Nanti di sini bisa ditambahkan property 'component' untuk menampung komponen simulasi React
  },
  {
    id: 'simulasi-pengawetan-makanan',
    title: 'Simulasi Pengawetan Makanan',
    shortDescription: 'Simulasikan proses iradiasi untuk memperpanjang masa simpan makanan.',
    image: '/assets/images/simulations/food-preservation-sim.jpg', // Gambar ilustrasi
    complexity: 'Dasar',
    estimatedTime: '10 Menit',
    detailedDescription: 'Pelajari bagaimana iradiasi dapat memperlambat pembusukan makanan dan menghilangkan patogen. Dalam simulasi ini, Anda akan "mengiradiasi" berbagai jenis makanan (buah, sayur, daging) dan mengamati bagaimana masa simpannya bertambah. Ini menunjukkan potensi besar teknologi nuklir dalam mengurangi limbah pangan.'
  },
  // Tambahkan simulasi lain jika ada, misalnya "Simulasi Deteksi Nutrisi Tanah dengan Isotop"
];

export default simulations;