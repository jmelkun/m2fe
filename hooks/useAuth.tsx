'use client';

import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AuthStoreState {
  isAuthenticated: boolean;
  user: null | { id: string; name: string; email: string };
  cartItems: CartItem[];
  cartItemCount: number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateCartItem: (id: string, quantity: number) => void;
  removeCartItem: (id: string) => void;
  clearCart: () => void;
}

// Create a Zustand store for auth state
export const useAuthStore = create<AuthStoreState>((set) => ({
  isAuthenticated: false,
  user: null,
  cartItems: [],
  cartItemCount: 0,
  
  login: async (email, password) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, validate with backend
      const user = { id: '1', name: 'John Doe', email };
      
      set({ isAuthenticated: true, user });
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
  
  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
  
  updateCartItem: (id, quantity) => {
    set((state) => {
      const updatedCartItems = state.cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      
      const cartItemCount = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { cartItems: updatedCartItems, cartItemCount };
    });
  },
  
  removeCartItem: (id) => {
    set((state) => {
      const updatedCartItems = state.cartItems.filter(item => item.id !== id);
      const cartItemCount = updatedCartItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { cartItems: updatedCartItems, cartItemCount };
    });
  },
  
  clearCart: () => {
    set({ cartItems: [], cartItemCount: 0 });
  }
}));

// For compatibility with React context pattern from AuthProvider
export function useAuth() {
  return useAuthStore();
}