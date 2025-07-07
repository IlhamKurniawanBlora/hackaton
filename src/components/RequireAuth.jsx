import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '~/contexts/auth';

export default function RequireAuth({ children, requireAdmin }) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !profile?.is_admin) {
    // Non-admin tries to access admin page
    return <Navigate to="/" replace />;
  }

  return children;
}
