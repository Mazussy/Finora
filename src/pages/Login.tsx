import { useAuth } from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet, User, ArrowLeft } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      login(username);
      navigate("/dashboard");
    }
  };

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
            <CardTitle className="text-xl text-center" style={{ color: '#EEEEEE' }}>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" style={{ color: '#EEEEEE' }}>
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: '#00ADB5' }} />
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
              
              <Button 
                type="submit" 
                className="w-full text-white font-medium py-2.5"
                style={{ background: 'linear-gradient(135deg, #00ADB5 0%, #00d4dd 100%)' }}
              >
                Sign In
              </Button>
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
