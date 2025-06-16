// src/data/modules/modulesData.js

const modules = [
  {
    // PASTIKAN ID INI 'module-iradiasi-benih'
    id: 'module-iradiasi-benih',
    title: 'Iradiasi Benih: Meningkatkan Kualitas Tanaman',
    shortDescription: 'Pelajari dasar-dasar, proses, dan manfaat iradiasi benih untuk pertanian modern.',
    image: '/assets/images/modules/seed-irradiation.jpg', // Gambar ilustrasi
    category: 'Teknologi Benih',
    level: 'Dasar',
    duration: '30 Menit',
    content: [
      {
        type: 'heading',
        text: 'Apa Itu Iradiasi Benih?'
      },
      {
        type: 'paragraph',
        text: 'Iradiasi benih adalah proses pemaparan benih terhadap radiasi ionisasi (seperti sinar gamma) dengan dosis terkontrol. Tujuannya adalah untuk memicu mutasi genetik yang menguntungkan, meningkatkan daya tumbuh, dan ketahanan terhadap hama penyakit.'
      },
      {
        type: 'image',
        src: '/assets/images/modules/seed-irradiation-process.jpg',
        alt: 'Proses Iradiasi Benih',
        caption: 'Ilustrasi proses iradiasi benih.'
      },
      {
        type: 'heading',
        text: 'Manfaat Iradiasi Benih'
      },
      {
        type: 'list',
        items: [
          'Peningkatan vigor dan perkecambahan',
          'Induksi mutasi genetik untuk varietas unggul',
          'Peningkatan ketahanan terhadap stres lingkungan (kekeringan, salinitas)',
          'Peningkatan ketahanan terhadap hama dan penyakit',
          'Masa simpan benih yang lebih panjang'
        ]
      },
      {
        type: 'paragraph',
        text: 'Penting untuk dicatat bahwa proses ini dilakukan dengan sangat hati-hati dan sesuai standar keamanan internasional oleh lembaga seperti BRIN (Badan Riset dan Inovasi Nasional).'
      }
    ]
  },
  {
    // PASTIKAN ID INI 'module-uji-tanah-isotop'
    id: 'module-uji-tanah-isotop',
    title: 'Uji Tanah dengan Isotop: Memahami Kesuburan Lahan',
    shortDescription: 'Bagaimana teknologi isotop membantu petani dalam mengidentifikasi kebutuhan nutrisi tanah.',
    image: '/assets/images/modules/soil-testing.jpg', // Gambar ilustrasi
    category: 'Analisis Tanah',
    level: 'Menengah',
    duration: '45 Menit',
    content: [
      {
        type: 'heading',
        text: 'Peran Isotop dalam Analisis Tanah'
      },
      {
        type: 'paragraph',
        text: 'Isotop stabil atau radioaktif digunakan sebagai "pelacak" untuk memahami siklus nutrisi di dalam tanah dan tanaman. Misalnya, isotop Nitrogen-15 (N-15) dapat digunakan untuk melacak penyerapan nitrogen oleh tanaman dan efisiensi pemupukan.'
      },
      {
        type: 'list',
        items: [
          'Menentukan ketersediaan hara makro dan mikro',
          'Mengukur efisiensi pemanfaatan pupuk',
          'Mendeteksi polutan dalam tanah',
          'Memahami dinamika air di dalam tanah'
        ]
      },
      {
        type: 'image',
        src: '/assets/images/modules/n15-isotope.jpg',
        alt: 'Isotop N-15',
        caption: 'Penggunaan isotop N-15 untuk melacak nutrisi.'
      },
      {
        type: 'paragraph',
        text: 'Teknik ini memberikan informasi yang lebih akurat dibandingkan metode konvensional, membantu petani membuat keputusan pemupukan yang lebih tepat dan berkelanjutan.'
      }
    ]
  },
  {
    // PASTIKAN ID INI 'module-pengawetan-makanan-iradiasi'
    id: 'module-pengawetan-makanan-iradiasi',
    title: 'Pengawetan Makanan dengan Iradiasi',
    shortDescription: 'Memahami bagaimana iradiasi dapat memperpanjang masa simpan makanan dan menjaga kualitasnya.',
    image: '/assets/images/modules/food-preservation.jpg', // Gambar ilustrasi
    category: 'Konservasi Pangan',
    level: 'Dasar',
    duration: '30 Menit',
    content: [
      {
        type: 'heading',
        text: 'Apa Itu Iradiasi Makanan?'
      },
      {
        type: 'paragraph',
        text: 'Iradiasi makanan adalah proses pemaparan makanan terhadap dosis radiasi ionisasi terkontrol untuk membunuh bakteri, serangga, dan mikroorganisme lain yang menyebabkan pembusukan atau penyakit.'
      },
      {
        type: 'list',
        items: [
          'Memperpanjang masa simpan produk pangan',
          'Mengurangi risiko penyakit bawaan makanan',
          'Mengurangi kebutuhan bahan pengawet kimia',
          'Mencegah perkecambahan pada umbi-umbian'
        ]
      },
      {
        type: 'image',
        src: '/assets/images/modules/irradiated-fruits.jpg',
        alt: 'Buah-buahan Teriradiasi',
        caption: 'Buah-buahan yang diawetkan dengan iradiasi.'
      },
      {
        type: 'paragraph',
        text: 'Proses ini aman dan telah diakui oleh berbagai organisasi kesehatan dunia, termasuk WHO dan FAO. Makanan yang diiradiasi tidak menjadi radioaktif.'
      }
    ]
  }
];

export default modules;