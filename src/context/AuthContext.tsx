import React, { createContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { subscribeToAuth, logout as firebaseLogout, login as firebaseLogin, signup as firebaseSignup } from "../services/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    console.log("Attempting to login with:", email);
    try {
      const user = await firebaseLogin(email, password);
      console.log("Login successful:", user);
      setUser(user);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    console.log("Attempting to signup with:", email);
    try {
      const user = await firebaseSignup(email, password);
      console.log("Signup successful:", user);
      setUser(user);
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    try {
      await firebaseLogout();
      setUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// export context for useAuth
export default AuthContext;
