import { create } from 'zustand';

export interface Category {
  id: string;
  label: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  label: string;
  href: string;
}

interface NavigationState {
  categories: Category[];
  activeCategory: string | null;
  mobileDrawerOpen: boolean;
  setActiveCategory: (categoryId: string | null) => void;
  toggleMobileDrawer: () => void;
  closeMobileDrawer: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  categories: [
    { 
      id: 'electronics', 
      label: 'Electronics', 
      subcategories: [
        { id: 'phones', label: 'Phones', href: '/category/electronics/phones' },
        { id: 'laptops', label: 'Laptops', href: '/category/electronics/laptops' },
        { id: 'accessories', label: 'Accessories', href: '/category/electronics/accessories' },
      ] 
    },
    { 
      id: 'clothing', 
      label: 'Clothing', 
      subcategories: [
        { id: 'men', label: 'Men', href: '/category/clothing/men' },
        { id: 'women', label: 'Women', href: '/category/clothing/women' },
        { id: 'kids', label: 'Kids', href: '/category/clothing/kids' },
      ] 
    },
    { 
      id: 'home', 
      label: 'Home', 
      subcategories: [
        { id: 'kitchen', label: 'Kitchen', href: '/category/home/kitchen' },
        { id: 'furniture', label: 'Furniture', href: '/category/home/furniture' },
        { id: 'decor', label: 'Decor', href: '/category/home/decor' },
      ] 
    },
    { 
      id: 'books', 
      label: 'Books', 
      subcategories: [
        { id: 'fiction', label: 'Fiction', href: '/category/books/fiction' },
        { id: 'non-fiction', label: 'Non-fiction', href: '/category/books/non-fiction' },
        { id: 'academic', label: 'Academic', href: '/category/books/academic' },
      ] 
    },
    { 
      id: 'sports', 
      label: 'Sports', 
      subcategories: [
        { id: 'equipment', label: 'Equipment', href: '/category/sports/equipment' },
        { id: 'clothing', label: 'Clothing', href: '/category/sports/clothing' },
        { id: 'accessories', label: 'Accessories', href: '/category/sports/accessories' },
      ] 
    },
  ],
  activeCategory: null,
  mobileDrawerOpen: false,
  
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  toggleMobileDrawer: () => set((state) => ({ mobileDrawerOpen: !state.mobileDrawerOpen })),
  closeMobileDrawer: () => set({ mobileDrawerOpen: false }),
}));
