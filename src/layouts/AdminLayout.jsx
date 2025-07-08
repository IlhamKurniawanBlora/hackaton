import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  HelpCircle,
  User
} from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleGoHome = () => {
    navigate('/');
  };

  const toggleCollapse = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  // Navigation items
  const navItems = [
    { path: '/admin/', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/module-detail', label: 'Kelola Modul Detail', icon: BookOpen },
    { path: '/admin/quizzes', label: 'Kelola Quiz', icon: HelpCircle },
  ];

  const isActive = (path) => {
    if (path === '/admin/' && location.pathname === '/admin/') return true;
    if (path !== '/admin/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleNavigate = (path) => {
    navigate(path);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* Mobile overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={toggleMobile} 
      />

      {/* Mobile menu button */}
      <button 
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 bg-white shadow-md hover:shadow-lg rounded-lg transition-all duration-200"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 bg-white shadow-lg z-40 border-r border-gray-200
        transform ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-all duration-300 ease-in-out
        flex flex-col ${collapsed ? 'w-16' : 'w-64'}
      `}>
        
        {/* Header */}
        <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-gray-100`}>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg flex-shrink-0">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
                <p className="text-xs text-gray-500">Learning Management</p>
              </div>
            )}
          </div>
          
          {/* Desktop expand/collapse button */}
          {!collapsed && (
            <button
              onClick={toggleCollapse}
              className="hidden lg:flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
          )}

          {/* Mobile close button */}
          <button 
            className="lg:hidden flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors" 
            onClick={toggleMobile}
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <div className="px-2 py-2 border-b border-gray-100">
            <button
              onClick={toggleCollapse}
              className="w-full flex items-center justify-center h-8 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {/* Home button */}
          <button
            onClick={handleGoHome}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-gray-50 rounded-lg transition-all duration-200 group relative ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors flex-shrink-0">
              <Home className="w-4 h-4 text-gray-600" />
            </div>
            {!collapsed && <span className="text-sm font-medium text-gray-700">Ke Beranda</span>}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                Ke Beranda
              </div>
            )}
          </button>

          <div className="border-t border-gray-100 my-3"></div>

          {/* Navigation items */}
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => handleNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-lg transition-all duration-200 group relative ${
                  collapsed ? 'justify-center' : ''
                } ${
                  active 
                    ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-500' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg transition-colors flex-shrink-0 ${
                  active 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : 'bg-gray-100 group-hover:bg-gray-200 text-gray-600'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
       
      </aside>

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-2'}`}>
        <main className="p-6 lg:p-8 pt-16 lg:pt-6">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}