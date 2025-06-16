// src/data/quizzes.js

const quizzes = [
  {
    id: 'quiz-iradiasi-benih',
    title: 'Kuis: Pengantar Iradiasi Benih',
    // PASTIKAN INI 'module-iradiasi-benih'
    moduleRef: 'module-iradiasi-benih', // Referensi ke ID modul terkait
    questions: [
      {
        id: 'q1',
        text: 'Apa tujuan utama dari iradiasi benih dalam pertanian?',
        options: [
          'Membuat benih bercahaya di malam hari',
          'Meningkatkan daya tumbuh dan ketahanan benih',
          'Mengubah rasa benih',
          'Mempercepat proses panen tanpa efek samping',
        ],
        correctAnswer: 1, // Indeks dari 'Meningkatkan daya tumbuh dan ketahanan benih'
      },
      {
        id: 'q2',
        text: 'Apakah benih yang telah diiradiasi menjadi radioaktif?',
        options: [
          'Ya, selalu',
          'Tidak, ini adalah mitos',
          'Hanya jika dosis radiasinya sangat tinggi',
          'Tergantung jenis benihnya',
        ],
        correctAnswer: 1, // Indeks dari 'Tidak, ini adalah mitos'
      },
      {
        id: 'q3',
        text: 'Lembaga internasional mana yang sering merekomendasikan penggunaan teknologi iradiasi untuk pangan dan pertanian?',
        options: [
          'NASA',
          'UNICEF',
          'IAEA (International Atomic Energy Agency)',
          'WHO (World Health Organization)',
        ],
        correctAnswer: 2, // Indeks dari 'IAEA (International Atomic Energy Agency)'
      },
      {
        id: 'q4',
        text: 'Salah satu manfaat iradiasi benih adalah peningkatan ketahanan terhadap?',
        options: [
          'Warna benih',
          'Ukuran benih',
          'Hama dan penyakit',
          'Bau benih',
        ],
        correctAnswer: 2, // Indeks dari 'Hama dan penyakit'
      },
      {
        id: 'q5',
        text: 'Radiasi yang digunakan untuk iradiasi benih umumnya adalah jenis?',
        options: [
          'Sinar X',
          'Sinar gamma atau berkas elektron',
          'Sinar ultraviolet',
          'Gelombang mikro',
        ],
        correctAnswer: 1, // Indeks dari 'Sinar gamma atau berkas elektron'
      },
    ],
  },
  {
    id: 'quiz-pengawetan-makanan',
    title: 'Kuis: Pengawetan Makanan dengan Nuklir',
    // GANTI INI: 'module-pengawetan-makanan' MENJADI 'module-pengawetan-makanan-iradiasi'
    moduleRef: 'module-pengawetan-makanan-iradiasi',
    questions: [
      {
        id: 'q6',
        text: 'Apa manfaat utama iradiasi dalam pengawetan makanan?',
        options: [
          'Membuat makanan lebih renyah',
          'Membunuh mikroorganisme penyebab pembusukan',
          'Menambah nutrisi pada makanan',
          'Mengubah rasa makanan menjadi lebih manis',
        ],
        correctAnswer: 1,
      },
      {
        id: 'q7',
        text: 'Apakah proses iradiasi membuat makanan menjadi radioaktif?',
        options: [
          'Ya, sedikit',
          'Tidak sama sekali',
          'Tergantung pada jenis makanan',
          'Hanya jika disimpan terlalu lama',
        ],
        correctAnswer: 1,
      },
      // Tambahkan pertanyaan lain untuk kuis ini
    ],
  },
];

export default quizzes;