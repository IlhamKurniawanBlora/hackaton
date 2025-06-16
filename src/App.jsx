// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModuleListPage from './pages/ModuleListPage'; // Pastikan nama filenya ModuleListPage.jsx
import ModuleDetailPage from './pages/ModuleDetailPage';
import SimulationPage from './pages/SimulationPage';
import SimulationDetailPage from './pages/SimulationDetailPage';
import ChatbotPage from './pages/ChatbotPage';
import CertificatesPage from './pages/CertificatesPage'; // Pastikan nama filenya CertificatesPage.jsx
import ForumPage from './pages/ForumPage';
import ForumTopicPage from './pages/ForumTopicPage';
import QuizDetailPage from './pages/QuizDetailPage';

// Perubahan di sini: Mengarahkan ke lokasi komponen di 'common'
import Navbar from './components/common/Header'; // Menggunakan Header.jsx sebagai Navbar
import Footer from './components/common/Footer'; // Mengarahkan ke Footer.jsx

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/modules" element={<ModuleListPage />} />
            <Route path="/modules/:moduleId" element={<ModuleDetailPage />} />
            <Route path="/simulations" element={<SimulationPage />} />
            <Route path="/simulations/:simulationId" element={<SimulationDetailPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/certificates" element={<CertificatesPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/forum/:topicId" element={<ForumTopicPage />} />
            <Route path="/quiz/:quizId" element={<QuizDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;