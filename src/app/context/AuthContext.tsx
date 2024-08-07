"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;  
}

interface AuthContextType {
  user: User | null;
  handleLoginSuccess: (userData: User) => void;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userSession = JSON.parse(localStorage.getItem('userSession') || 'null');
    if (userSession) {
      setUser(userSession);
    }
  }, []);

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('userSession', JSON.stringify(userData));
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userSession');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLoginSuccess, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
