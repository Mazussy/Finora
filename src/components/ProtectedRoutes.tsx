import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"
import { Wallet } from "lucide-react";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #222831 0%, #393E46 100%)' }}>
        <div className="text-center">
          <div className="p-4 rounded-2xl mb-4 mx-auto w-fit" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
            <Wallet className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p style={{ color: '#EEEEEE' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
