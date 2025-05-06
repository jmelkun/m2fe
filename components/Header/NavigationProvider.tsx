'use client';

import { ReactNode, useEffect } from 'react';
import { Category, useNavigationStore } from '@/store/navigation-store';

interface NavigationProviderProps {
  children: ReactNode;
  initialCategories: Category[];
}

export function NavigationProvider({ children, initialCategories }: NavigationProviderProps) {
  const { setCategories } = useNavigationStore();
  
  // Initialize the store with server-fetched categories
  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories, setCategories]);
  
  return <>{children}</>;
}
