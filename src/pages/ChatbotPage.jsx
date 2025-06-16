// src/pages/ChatbotPage.jsx
import React, { useState, useEffect, useRef } from 'react';

function ChatbotPage() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null); // Ref untuk auto-scroll

  // Scroll ke bawah setiap kali pesan baru ditambahkan
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const newUserMessage = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInputMessage('');

    // Simulasikan respons bot
    const botResponse = await getBotResponse(inputMessage);
    const newBotMessage = { text: botResponse, sender: 'bot' };

    // Delay sedikit agar terlihat seperti bot sedang mengetik
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    }, 700);
  };

  const getBotResponse = async (userMessage) => {
    // Logika chatbot sederhana berdasarkan rule-based
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes('halo') || lowerCaseMessage.includes('hai')) {
      return 'Halo! Ada yang bisa saya bantu terkait agrinuklir?';
    } else if (lowerCaseMessage.includes('iradiasi benih')) {
      return 'Iradiasi benih adalah proses penyinaran benih dengan dosis radiasi terkontrol untuk meningkatkan mutu genetik, daya tumbuh, dan ketahanan terhadap hama/penyakit. Ini aman dan tidak membuat benih radioaktif.';
    } else if (lowerCaseMessage.includes('pengawetan makanan')) {
      return 'Teknologi nuklir, seperti iradiasi pangan, dapat memperpanjang masa simpan makanan dengan membunuh mikroorganisme penyebab pembusukan atau penyakit tanpa mengubah nutrisi atau rasa secara signifikan. Ini aman dan sudah disetujui banyak negara.';
    } else if (lowerCaseMessage.includes('analisis tanah') || lowerCaseMessage.includes('kesuburan tanah')) {
      return 'Isotop, baik stabil maupun radioaktif, digunakan dalam analisis tanah untuk melacak pergerakan nutrisi, air, dan polutan. Ini membantu petani mengoptimalkan pemupukan dan memahami kesehatan tanah.';
    } else if (lowerCaseMessage.includes('aman tidak') || lowerCaseMessage.includes('bahaya')) {
        return 'Teknologi nuklir di bidang pertanian, jika diterapkan sesuai standar internasional (seperti IAEA dan FAO), sangat aman. Produk yang diolah tidak menjadi radioaktif dan tidak membahayakan konsumen atau lingkungan.';
    } else if (lowerCaseMessage.includes('terima kasih') || lowerCaseMessage.includes('makasih')) {
      return 'Sama-sama! Senang bisa membantu.';
    } else {
      return 'Maaf, saya belum mengerti pertanyaan Anda. Bisakah Anda bertanya dengan lebih spesifik terkait agrinuklir?';
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="container py-8 min-h-content">
      <h1 className="page-title">Chatbot AgriNuklir AI</h1>

      <div className="chatbot-container">
        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="initial-message">
              <p>Selamat datang! Saya adalah Chatbot AgriNuklir. Ajukan pertanyaan Anda tentang pemanfaatan teknologi nuklir di bidang pertanian.</p>
            </div>
          )}
          {messages.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.sender}-message`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} /> {/* Elemen kosong untuk scroll */}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="form-input chat-input"
            placeholder="Ketik pertanyaan Anda tentang agrinuklir..."
          />
          <button
            onClick={handleSendMessage}
            className="button button-primary chat-send-button"
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;