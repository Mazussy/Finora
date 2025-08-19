import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login, signup, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (isSignUp) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Auth error:", error);
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        setError("Invalid email or password");
      } else if (error.code === "auth/email-already-in-use") {
        setError("Email is already registered");
      } else if (error.code === "auth/weak-password") {
        setError("Password is too weak");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address");
      } else {
        setError(error.message || "Authentication failed");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #222831 0%, #393E46 100%)' }}>
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl" style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}>
              <Wallet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ 
            background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Welcome to Finora
          </h1>
          <p style={{ color: '#EEEEEE' }}>Sign in to manage your finances</p>
        </div>

        {/* Login Card */}
        <Card style={{ backgroundColor: '#393E46', borderColor: '#393E46' }}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center" style={{ color: '#EEEEEE' }}>
              {isSignUp ? "Create Account" : "Sign In"}
            </CardTitle>
            <p className="text-center text-sm" style={{ color: '#EEEEEE' }}>
              {isSignUp ? "Join Finora to start tracking your finances" : "Welcome back to Finora"}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-md p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" style={{ color: '#EEEEEE' }}>
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#00ADB5' }} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ 
                      backgroundColor: '#222831', 
                      borderColor: '#222831', 
                      color: '#EEEEEE',
                      paddingLeft: '2.5rem'
                    }}
                    className="placeholder:text-gray-400 focus:border-cyan-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" style={{ color: '#EEEEEE' }}>
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#00ADB5' }} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ 
                      backgroundColor: '#222831', 
                      borderColor: '#222831', 
                      color: '#EEEEEE',
                      paddingLeft: '2.5rem',
                      paddingRight: '2.5rem'
                    }}
                    className="placeholder:text-gray-400 focus:border-cyan-500"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full text-white font-medium py-2.5"
                style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}
              >
                {isSubmitting ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setError("");
                  }}
                  className="text-sm hover:underline"
                  style={{ color: '#00ADB5' }}
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/">
            <Button 
              variant="ghost" 
              style={{ color: '#EEEEEE' }}
              className="hover:bg-black/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
