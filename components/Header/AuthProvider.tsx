'use client';

import React, { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // This component is now just a wrapper for the children
  // The actual state is managed by Zustand
  return <>{children}</>;
}
