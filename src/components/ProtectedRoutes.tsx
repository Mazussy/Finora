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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="p-4 bg-primary rounded-2xl mb-4 mx-auto w-fit">
            <Wallet className="h-8 w-8 text-primary-foreground animate-pulse" />
          </div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
