import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isLoggedIn: boolean;
  cartItemCount: number;
  login: () => void;
  signup: () => void;
  logout: () => void;
  updateCartCount: (count: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      cartItemCount: 3, // Default cart count
      
      login: () => set({ isLoggedIn: true }),
      signup: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false }),
      updateCartCount: (count: number) => set({ cartItemCount: count }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
