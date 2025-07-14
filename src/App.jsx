// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

import HomePage from '~/pages/HomePage';
import AboutPage from '~/pages/AboutPage';
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
import ModuleAdminPage from '~/pages/admin/ModuleAdminPage';
import ModuleDataAdminPage from '~/pages/admin/ModuleDataAdminPage';
import ModuleDetailAdminPage from '~/pages/admin/ModuleDetailAdminPage';
import ModuleDataQuizzAdminPage from '~/pages/admin/ModuleDataQuizzAdminPage';
import ModuleDetailQuizzAdminPage from '~/pages/admin/ModuleDetailQuizzAdminPage';

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
          <Route path="/about" element={<AboutPage />} />
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
          <Route index element={<ModuleAdminPage />} />
          <Route path="module-detail" element={<ModuleDataAdminPage />} />
          <Route path="module-detail/:moduleId" element={<ModuleDetailAdminPage />} />
          <Route path="quizzes" element={<ModuleDataQuizzAdminPage />} />
          <Route path="quizzes/:moduleId" element={<ModuleDetailQuizzAdminPage />} />
        </Route>
      </Routes>
    </Router>

  );
  
}