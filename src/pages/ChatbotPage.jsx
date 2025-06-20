import React, { useState, useEffect, useRef } from 'react';

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll ke bawah setiap kali pesan baru ditambahkan
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = { text: inputMessage, sender: 'user', timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulasikan respons bot
    const botResponse = await getBotResponse(inputMessage);
    const newBotMessage = { text: botResponse, sender: 'bot', timestamp: new Date() };

    // Delay sedikit agar terlihat seperti bot sedang mengetik
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const getBotResponse = async (userMessage) => {
    // Logika chatbot sederhana berdasarkan rule-based
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('halo') || lowerCaseMessage.includes('hai')) {
      return 'Halo! Selamat datang di AgriNuklir AI. Ada yang bisa saya bantu terkait pemanfaatan teknologi nuklir untuk pertanian?';
    } else if (lowerCaseMessage.includes('iradiasi benih')) {
      return 'Iradiasi benih adalah proses penyinaran benih dengan dosis radiasi gamma terkontrol untuk meningkatkan mutu genetik, daya tumbuh, dan ketahanan terhadap hama/penyakit. Proses ini aman dan tidak membuat benih menjadi radioaktif. Hasilnya adalah varietas unggul yang lebih produktif.';
    } else if (lowerCaseMessage.includes('pengawetan makanan')) {
      return 'Teknologi iradiasi pangan menggunakan sinar gamma untuk memperpanjang masa simpan makanan dengan membunuh mikroorganisme penyebab pembusukan. Proses ini tidak mengubah nutrisi atau rasa secara signifikan dan telah disetujui WHO, FAO, dan IAEA sebagai teknologi yang aman.';
    } else if (lowerCaseMessage.includes('analisis tanah') || lowerCaseMessage.includes('kesuburan tanah')) {
      return 'Isotop radioaktif dan stabil digunakan untuk melacak pergerakan nutrisi (N, P, K), air, dan polutan dalam tanah. Teknik ini membantu petani mengoptimalkan pemupukan, mengurangi limbah, dan memahami dinamika kesuburan tanah secara real-time.';
    } else if (lowerCaseMessage.includes('pemuliaan tanaman')) {
      return 'Mutasi induksi dengan radiasi gamma menciptakan varietas tanaman baru dengan sifat unggul seperti tahan kekeringan, hasil tinggi, atau tahan penyakit. Teknik ini telah menghasilkan lebih dari 3.000 varietas tanaman di seluruh dunia.';
    } else if (lowerCaseMessage.includes('aman tidak') || lowerCaseMessage.includes('bahaya') || lowerCaseMessage.includes('radiasi')) {
      return 'Teknologi nuklir di bidang pertanian sangat aman jika diterapkan sesuai standar IAEA dan FAO. Produk hasil iradiasi tidak menjadi radioaktif dan tidak membahayakan konsumen atau lingkungan. Dosis yang digunakan jauh di bawah batas aman.';
    } else if (lowerCaseMessage.includes('pupuk') || lowerCaseMessage.includes('fertilizer')) {
      return 'Isotop nitrogen-15 digunakan untuk mempelajari efisiensi serapan pupuk oleh tanaman. Ini membantu mengoptimalkan dosis pupuk, mengurangi pencemaran lingkungan, dan meningkatkan produktivitas pertanian berkelanjutan.';
    } else if (lowerCaseMessage.includes('hama') || lowerCaseMessage.includes('pest')) {
      return 'Teknik Serangga Mandul (Sterile Insect Technique) menggunakan radiasi untuk mensterilkan serangga jantan yang kemudian dilepas untuk mengendalikan populasi hama secara biologis dan ramah lingkungan.';
    } else if (lowerCaseMessage.includes('terima kasih') || lowerCaseMessage.includes('makasih')) {
      return 'Sama-sama! Senang bisa membantu Anda memahami teknologi agrinuklir. Jangan ragu untuk bertanya lagi!';
    } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('sampai jumpa')) {
      return 'Sampai jumpa! Semoga informasi tentang agrinuklir bermanfaat untuk Anda.';
    } else {
      return 'Maaf, saya belum mengerti pertanyaan Anda. Bisakah Anda bertanya lebih spesifik tentang: iradiasi benih, pengawetan makanan, analisis tanah, pemuliaan tanaman, atau keamanan teknologi nuklir dalam pertanian?';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <div className="text-white text-xl font-bold">AN</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AgriNuklir AI</h1>
              <p className="text-gray-600">Konsultasi Teknologi Nuklir untuk Pertanian</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Area pesan */}
          <div className="h-96 overflow-y-auto p-6">
            {messages.length === 0 && (
              <div className="text-center p-8 bg-green-50 rounded-lg border border-green-100">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">⚛</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Selamat Datang di AgriNuklir AI</h3>
                <p className="text-gray-600 mb-6">Ajukan pertanyaan tentang teknologi nuklir dalam pertanian</p>
                <div className="flex flex-wrap gap-2 justify-center text-sm">
                  <span className="px-3 py-1 bg-white text-green-700 rounded-full border border-green-200">Iradiasi Benih</span>
                  <span className="px-3 py-1 bg-white text-green-700 rounded-full border border-green-200">Pengawetan Makanan</span>
                  <span className="px-3 py-1 bg-white text-green-700 rounded-full border border-green-200">Analisis Tanah</span>
                  <span className="px-3 py-1 bg-white text-green-700 rounded-full border border-green-200">Pemuliaan Tanaman</span>
                </div>
              </div>
            )}
            
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="leading-relaxed">{msg.text}</div>
                  <div className={`text-xs mt-2 ${
                    msg.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="mb-4 flex justify-start">
                <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-gray-100">
                  <div className="flex gap-1 items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                    <span className="ml-2 text-sm text-gray-600">Mengetik...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Area input */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Tanyakan tentang teknologi nuklir dalam pertanian..."
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isTyping || inputMessage.trim() === ''}
              >
                Kirim
              </button>
            </div>
            <div className="text-center mt-3">
              <small className="text-gray-500">AgriNuklir AI Assistant</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;