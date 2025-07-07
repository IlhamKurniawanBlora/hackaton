// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from '~/pages/HomePage';
import ModuleListPage from '~/pages/ModuleListPage';
import ModuleDetailPage from '~/pages/ModuleDetailPage';
import SimulationPage from '~/pages/SimulationPage';
import SimulationDetailPage from '~/pages/SimulationDetailPage';
import CertificatePage from '~/pages/CertificatePage';
import ForumPage from '~/pages/ForumTopicPage';
import LoginPage from '~/pages/LoginPage';
import RegisterPage from '~/pages/RegisterPage';
import ProfilePage from '~/pages/ProfilePage';
import EducationModulePage from '~/pages/EducationModulePage';
import QuizzPage from '~/pages/QuizzModulePage';

// Admin pages
import AdminDashboardPage from '~/pages/admin/AdminDashboardPage';
import AdminUsersPage from '~/pages/admin/AdminUsersPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes (public) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* User routes (protected) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/modules" element={<ModuleListPage />} />
          <Route path="/modules/:slug" element={<ModuleDetailPage />} />
          <Route path="/simulations" element={<SimulationPage />} />
          <Route path="/simulations/:slug" element={<SimulationDetailPage />} />
          <Route path="/certificate/:moduleId" element={<CertificatePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/:topicId" element={<ForumPage />} />
          <Route path="/educations/:moduleId" element={<EducationModulePage />} />
          <Route path="/quizzes/:moduleId" element={<QuizzPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Admin routes (protected + admin role) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </Router>

  );
}
