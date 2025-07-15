// src/pages/ContactPage.jsx
import React from 'react';

function ContactPage() {
  return (
    <div className="container mx-auto p-8 py-12 min-h-[calc(100vh-160px)] pt-24">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Hubungi Kami</h1>

      <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl mx-auto">
        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
          Kami siap membantu Anda. Jangan ragu untuk menghubungi kami jika Anda memiliki pertanyaan, saran, atau masukan.
        </p>

        <div className="space-y-6 mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <div>
              <p className="text-gray-800 font-semibold">Email:</p>
              <p className="text-green-600 hover:underline"><a href="mailto:info@agrinuklir.com">info@agrinuklir.com</a></p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            <div>
              <p className="text-gray-800 font-semibold">Telepon:</p>
              <p className="text-gray-700">+62 123 4567 890 (Dummy)</p>
            </div>
          </div>

          <div className="flex items-center">
            <svg className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <div>
              <p className="text-gray-800 font-semibold">Alamat:</p>
              <p className="text-gray-700">Jl. Inovasi Pertanian No. 123, Jakarta, Indonesia (Dummy)</p>
            </div>
          </div>
        </div>

        {/* Form Kontak Dummy (opsional, bisa diimplementasikan nanti dengan backend) */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kirim Pesan</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nama Anda:</label>
            <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500" placeholder="Nama Lengkap" />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Anda:</label>
            <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500" placeholder="email@contoh.com" />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Pesan Anda:</label>
            <textarea id="message" name="message" rows="5" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-green-500" placeholder="Tulis pesan Anda di sini..."></textarea>
          </div>
          <button
            type="submit"
            onClick={(e) => { e.preventDefault(); alert('Fitur kirim pesan akan segera diaktifkan!'); }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;