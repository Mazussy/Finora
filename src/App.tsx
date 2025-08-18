import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default Route -> Home */}
        <Route path="/" element={<Home />} />

        {/* Auth Route -> Login */}
        <Route path="/login" element={<Login />} />


        {/* Main app route → Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirect unknown routes back home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}