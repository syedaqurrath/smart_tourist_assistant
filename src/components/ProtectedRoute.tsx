import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { session, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-amber-50">
        <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-8 shadow-lg">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
          <p className="text-sm text-amber-800">Preparing your tour...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

