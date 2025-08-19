import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import { TransactionProvider } from "./context/TransactionsContext"
import { AuthProvider } from "./context/AuthContext"
import { ProtectedRoute } from "./components/ProtectedRoutes"

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <AuthProvider>
        <TransactionProvider>
          <Router>
            <Routes>
              {/* Default Route -> Home */}
              <Route path="/" element={<Home />} />

              {/* Auth Route -> Login */}
              <Route path="/login" element={<Login />} />

              {/* Main app route → Dashboard */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />

              {/* Redirect unknown routes back home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </TransactionProvider>
      </AuthProvider>
    </div>
  );
}