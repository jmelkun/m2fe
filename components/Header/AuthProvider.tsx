'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { useAuthStore } from '@/store/auth-store';

// Create a context to provide auth state to components
const AuthContext = createContext<ReturnType<typeof useAuthStore> | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Get auth state from Zustand store
  const authState = useAuthStore();
  
  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth state
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
