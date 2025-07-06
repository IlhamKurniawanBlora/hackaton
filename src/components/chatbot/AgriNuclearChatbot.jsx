import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Leaf, Zap, User, Bot, Loader2, ChevronDown, ChevronUp, Maximize2, Minimize2 } from 'lucide-react';

const AgriNuclearChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState(new Set());
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Halo! Saya adalah asisten AI untuk teknologi agri-nuklir. Saya dapat membantu Anda dengan informasi tentang aplikasi teknologi nuklir dalam pertanian, radiasi untuk sterilisasi, pemuliaan tanaman, dan banyak lagi. Ada yang ingin Anda tanyakan?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Ganti dengan API key Gemini Anda
  const GEMINI_API_KEY = 'AIzaSyAC0xA57zDkNWgxrIufGg9y1S5cUC1G5Rg';
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessageToGemini = async (message) => {
    try {
      const systemPrompt = `Anda adalah asisten AI khusus untuk bidang teknologi agri-nuklir. Tugas Anda adalah memberikan penjelasan yang jelas, akurat, dan mudah dipahami dalam bahasa Indonesia.

      Topik yang Anda kuasai meliputi:
      - Aplikasi teknologi nuklir dalam pertanian
      - Pemuliaan tanaman menggunakan radiasi
      - Sterilisasi serangga dengan radiasi
      - Iradiasi makanan untuk pengawetan
      - Teknik isotop dalam penelitian pertanian
      - Keamanan radiasi dalam aplikasi pertanian
      - Manfaat dan risiko teknologi nuklir di bidang agrikultur
      - Pangan, tanah, nuklir, dan pertanian secara umum

      Instruksi penting:
      - Jawablah dengan bahasa Indonesia yang mudah dipahami oleh petani, pelajar, atau masyarakat umum.
      - Fokus pada aspek praktis dan manfaat teknologi ini untuk pertanian modern.
      - Batasi jawaban maksimal 5 kalimat.
      - Jika pertanyaan di luar ruang lingkup teknologi agri-nuklir, tolak dengan sopan atau katakan bahwa Anda tidak memiliki informasi yang relevan.
      - Jangan membuat asumsi yang salah atau menebak jika tidak tahu jawabannya.

      Pertanyaan: ${message}`;

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: systemPrompt }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Gagal menghubungi API Gemini');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error:', error);
      return 'Maaf, terjadi kesalahan saat memproses permintaan Anda. Pastikan API key Gemini sudah diatur dengan benar.';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const botResponse = await sendMessageToGemini(inputMessage);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi nanti.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const toggleMessageExpansion = (messageId) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const truncateText = (text, maxLength = 70) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const toggleChatExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 group"
          aria-label="Buka chatbot agri-nuklir"
        >
          <div className="relative">
            <MessageCircle size={24} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Tanya tentang Agri-Nuklir
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 ${
          isExpanded ? 'w-96 h-[600px]' : 'w-80 h-96'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-white/20 rounded-full">
                <Leaf size={20} />
              </div>
              <div>
                <h3 className="font-semibold">Agri-Nuclear AI</h3>
                <p className="text-xs text-emerald-100">Asisten Teknologi Nuklir</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleChatExpansion}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                aria-label={isExpanded ? "Perkecil chat" : "Perbesar chat"}
              >
                {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded-full transition-colors"
                aria-label="Tutup chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((message) => {
              const isMessageExpanded = expandedMessages.has(message.id);
              const shouldShowExpandButton = message.text.length > 100;
              
              return (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`${isExpanded ? 'max-w-md' : 'max-w-xs'} px-4 py-2 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-emerald-500 text-white ml-4'
                        : 'bg-white text-gray-800 mr-4 shadow-sm border'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                            <Bot size={12} className="text-white" />
                          </div>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {shouldShowExpandButton && !isMessageExpanded 
                            ? truncateText(message.text) 
                            : message.text
                          }
                        </p>
                        
                        {/* Expand/Collapse button untuk pesan */}
                        {shouldShowExpandButton && (
                          <button
                            onClick={() => toggleMessageExpansion(message.id)}
                            className={`mt-1 flex items-center space-x-1 text-xs ${
                              message.type === 'user' 
                                ? 'text-emerald-100 hover:text-white' 
                                : 'text-gray-500 hover:text-gray-700'
                            } transition-colors`}
                          >
                            {isMessageExpanded ? (
                              <>
                                <ChevronUp size={12} />
                                <span>Tutup</span>
                              </>
                            ) : (
                              <>
                                <ChevronDown size={12} />
                                <span>Baca selengkapnya</span>
                              </>
                            )}
                          </button>
                        )}
                        
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' 
                            ? 'text-emerald-100' 
                            : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.type === 'user' && (
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                            <User size={12} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className={`${isExpanded ? 'max-w-md' : 'max-w-xs'} px-4 py-2 rounded-lg bg-white text-gray-800 mr-4 shadow-sm border`}>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center">
                      <Bot size={12} className="text-white" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Loader2 size={16} className="animate-spin text-emerald-500" />
                      <span className="text-sm text-gray-500">Sedang mengetik...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(e)}
                placeholder="Tanya tentang teknologi agri-nuklir..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors duration-200"
                aria-label="Kirim pesan"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgriNuclearChatbot;