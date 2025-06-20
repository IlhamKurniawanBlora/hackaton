import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  FireIcon,
  PlusIcon, 
  UserIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

// Data dummy untuk topik forum
const dummyForumTopics = [
  {
    id: '1',
    title: 'Diskusi: Manfaat Iradiasi Benih untuk Padi Lokal',
    author: 'Petani_Maju',
    comments: 12,
    date: '10 Juni 2025',
    lastActivity: '12 Juni 2025, 10:30',
    category: 'Diskusi',
    isHot: true,
  },
  {
    id: '2',
    title: 'Tanya Jawab: Keamanan Pangan Iradiasi, Apakah Aman Dikonsumsi?',
    author: 'IbuRumahTangga',
    comments: 25,
    date: '08 Juni 2025',
    lastActivity: '11 Juni 2025, 15:00',
    category: 'Tanya Jawab',
    isHot: true,
  },
  {
    id: '3',
    title: 'Berbagi Pengalaman: Penggunaan Isotop untuk Analisis Hara Tanah',
    author: 'Agronom_Muda',
    comments: 8,
    date: '05 Juni 2025',
    lastActivity: '09 Juni 2025, 09:00',
    category: 'Pengalaman',
    isHot: false,
  },
  {
    id: '4',
    title: 'Ide: Bagaimana Jika Kita Buat Grup Belajar AgriNuklir?',
    author: 'Mahasiswa_Pertanian',
    comments: 18,
    date: '03 Juni 2025',
    lastActivity: '07 Juni 2025, 18:00',
    category: 'Ide',
    isHot: false,
  },
  {
    id: '5',
    title: 'Masukan Fitur: Simulasi Pengelolaan Limbah Nuklir Pertanian',
    author: 'PemerhatiLingkungan',
    comments: 5,
    date: '01 Juni 2025',
    lastActivity: '06 Juni 2025, 11:00',
    category: 'Masukan',
    isHot: false,
  },
];

const categoryColors = {
  'Diskusi': 'bg-green-100 text-green-800 border-green-200',
  'Tanya Jawab': 'bg-orange-100 text-orange-800 border-orange-200',
  'Pengalaman': 'bg-blue-100 text-blue-800 border-blue-200',
  'Ide': 'bg-purple-100 text-purple-800 border-purple-200',
  'Masukan': 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

function ForumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Forum Diskusi AgriNuklir
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bergabunglah dalam diskusi seputar teknologi nuklir untuk pertanian. 
            Berbagi pengalaman, tanya jawab, dan dapatkan wawasan baru bersama komunitas.
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">
              {dummyForumTopics.length} Topik Aktif
            </span>
            <div className="flex items-center gap-2 text-orange-600">
              <FireIcon className="w-5 h-5" />
              <span className="text-sm font-medium">
                {dummyForumTopics.filter(topic => topic.isHot).length} Topik Populer
              </span>
            </div>
          </div>
          
          <Link 
            to="/forum/new" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusIcon className="w-5 h-5" />
            Buat Topik Baru
          </Link>
        </div>

        {/* Forum Topics */}
        <div className="space-y-4">
          {dummyForumTopics.map((topic) => (
            <div 
              key={topic.id} 
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200 group"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[topic.category] || categoryColors['Diskusi']}`}>
                        {topic.category}
                      </span>
                      {topic.isHot && (
                        <div className="flex items-center gap-1 text-orange-500">
                          <FireIcon className="w-4 h-4" />
                          <span className="text-xs font-medium">Hot</span>
                        </div>
                      )}
                    </div>
                    
                    <Link 
                      to={`/forum/${topic.id}`} 
                      className="block group-hover:text-green-600 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600">
                        {topic.title}
                      </h3>
                    </Link>
                    
                    {/* Mobile Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 lg:hidden">
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        <span>{topic.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-4 h-4" />
                        <span>{topic.comments} komentar</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{topic.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Stats */}
                  <div className="hidden lg:flex items-center gap-8">
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-gray-600 mb-1">
                        <UserIcon className="w-4 h-4" />
                        <span className="text-sm">{topic.author}</span>
                      </div>
                      <div className="text-xs text-gray-500">{topic.date}</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-orange-600 mb-1">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
                        <span className="font-semibold text-lg">{topic.comments}</span>
                      </div>
                      <div className="text-xs text-gray-500">komentar</div>
                    </div>
                    
                    <div className="text-center min-w-0">
                      <div className="flex items-center gap-1 text-green-600 mb-1">
                        <ClockIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Terakhir</span>
                      </div>
                      <div className="text-xs text-gray-500 truncate max-w-32">
                        {topic.lastActivity}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Last Activity */}
                <div className="mt-4 pt-4 border-t border-gray-100 lg:hidden">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <ClockIcon className="w-4 h-4" />
                    <span className="font-medium">Aktivitas terakhir:</span>
                    <span className="text-gray-600">{topic.lastActivity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Muat Lebih Banyak
          </button>
        </div>

        {/* Footer Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-gradient-to-br from-green-100 to-green-50 p-6 rounded-xl">
              <div className="text-2xl font-bold text-green-600 mb-2">245</div>
              <div className="text-gray-700">Total Topik</div>
            </div>
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-6 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 mb-2">1,024</div>
              <div className="text-gray-700">Total Komentar</div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-6 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 mb-2">156</div>
              <div className="text-gray-700">Anggota Aktif</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForumPage;