'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of our auth context
interface AuthContextType {
  isLoggedIn: boolean;
  cartItemCount: number;
  login: () => void;
  signup: () => void;
  logout: () => void;
  updateCartCount: (count: number) => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Create the auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3); // Default cart count

  const login = () => {
    setIsLoggedIn(true);
  };

  const signup = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateCartCount = (count: number) => {
    setCartItemCount(count);
  };

  const value = {
    isLoggedIn,
    cartItemCount,
    login,
    signup,
    logout,
    updateCartCount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}