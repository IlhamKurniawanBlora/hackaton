// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from './pages/HomePage';
import ModuleListPage from './pages/ModuleListPage';
import ModuleDetailPage from './pages/ModuleDetailPage';
import SimulationPage from './pages/SimulationPage';
import SimulationDetailPage from './pages/SimulationDetailPage';
import CertificatesPage from './pages/CertificatesPage';
import ForumPage from './pages/ForumTopicPage';
import QuizDetailPage from './pages/QuizDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Admin pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth layout routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Main layout routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<ModuleListPage />} />
          <Route path="/modules/:slug" element={<ModuleDetailPage />} />            
          <Route path="/simulations" element={<SimulationPage />} />
          <Route path="/simulations/:simulationId" element={<SimulationDetailPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:topicId" element={<ForumPage />} />
          <Route path="/quiz/:quizId" element={<QuizDetailPage />} />
        </Route>

        {/* Admin layout routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
