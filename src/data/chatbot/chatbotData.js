// src/data/chatbot/chatbotData.js

const faqResponses = [
  {
    question: "apa itu iradiasi benih?",
    response: "Iradiasi benih adalah proses pemaparan benih terhadap radiasi ionisasi untuk memicu mutasi genetik yang menguntungkan, meningkatkan daya tumbuh, dan ketahanan terhadap hama penyakit."
  },
  {
    question: "bagaimana cara kerja iradiasi benih?",
    response: "Radiasi akan menyebabkan perubahan pada materi genetik benih (DNA). Perubahan ini bisa menghasilkan sifat-sifat baru yang diinginkan, seperti pertumbuhan lebih cepat, hasil panen lebih tinggi, atau ketahanan terhadap penyakit."
  },
  {
    question: "apa manfaat iradiasi benih?",
    response: "Manfaatnya meliputi peningkatan vigor, induksi mutasi untuk varietas unggul, peningkatan ketahanan terhadap stres lingkungan, dan peningkatan ketahanan terhadap hama penyakit."
  },
  {
    question: "apakah iradiasi benih aman?",
    response: "Ya, iradiasi benih yang dilakukan dengan dosis terkontrol dan sesuai standar keamanan internasional sangat aman dan telah diteliti ekstensif."
  },
  {
    question: "apa itu uji tanah isotop?",
    response: "Uji tanah dengan isotop adalah teknik menggunakan isotop stabil atau radioaktif sebagai 'pelacak' untuk memahami siklus nutrisi di dalam tanah dan tanaman, serta untuk mengidentifikasi kebutuhan nutrisi tanah."
  },
  {
    question: "bagaimana isotop membantu uji tanah?",
    response: "Isotop seperti Nitrogen-15 (N-15) digunakan untuk melacak penyerapan nitrogen oleh tanaman dan efisiensi pemupukan, memberikan informasi yang lebih akurat daripada metode konvensional."
  },
  {
    question: "apa manfaat pengawetan makanan dengan iradiasi?",
    response: "Iradiasi makanan dapat memperpanjang masa simpan, mengurangi risiko penyakit bawaan makanan, serta mengurangi kebutuhan bahan pengawet kimia dengan membunuh bakteri dan mikroorganisme penyebab pembusukan."
  },
  {
    question: "apakah makanan yang diiradiasi radioaktif?",
    response: "Tidak, makanan yang diiradiasi tidak menjadi radioaktif. Proses ini hanya melibatkan energi yang cukup untuk membunuh mikroorganisme, bukan untuk membuat makanan radioaktif."
  },
  {
    question: "siapa yang bisa menggunakan platform ini?",
    response: "Platform AgriNuklir ini ditujukan untuk pelajar, petani muda, dan komunitas pertanian yang tertarik mempelajari aplikasi teknologi nuklir di bidang pertanian."
  },
  {
    question: "bagaimana cara mendapatkan sertifikat?",
    response: "Sertifikat akan diberikan secara otomatis setelah Anda menyelesaikan modul edukasi tertentu dan berhasil melewati kuis akhir modul."
  },
  {
    question: "apa saja fitur simulasi?",
    response: "Kami menyediakan simulasi interaktif seperti iradiasi benih dan pengawetan makanan untuk memberikan pengalaman belajar yang lebih mendalam."
  },
  {
    question: "selain itu?", // Contoh pertanyaan yang tidak ada jawabannya spesifik, akan mengarah ke default
    response: "Saya adalah chatbot edukasi AgriNuklir. Saya dirancang untuk menjawab pertanyaan umum terkait teknologi nuklir di bidang pertanian. Silakan ajukan pertanyaan lain."
  },
   {
    question: "siapa nama kamu?",
    response: "Saya adalah AgriNuklir Bot, asisten virtualmu!"
  },
   {
    question: "halo",
    response: "Halo! Ada yang bisa saya bantu terkait agrinuklir?"
  },
   {
    question: "terima kasih",
    response: "Sama-sama! Jika ada pertanyaan lain, jangan ragu bertanya."
  },
  {
    question: "bisakah kamu membantu saya?",
    response: "Tentu, saya di sini untuk membantumu memahami lebih lanjut tentang agrinuklir. Ajukan pertanyaanmu!"
  }
];

const defaultResponse = "Maaf, saya tidak mengerti pertanyaanmu. Coba tanyakan hal lain atau kunjungi bagian Modul Edukasi untuk informasi lebih lanjut.";

export { faqResponses, defaultResponse };