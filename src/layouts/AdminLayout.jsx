// src/layouts/AdminLayout.jsx
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Sidebar / Header khusus admin */}
      <aside className="w-64 bg-gray-800 text-white">Admin Sidebar</aside>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
