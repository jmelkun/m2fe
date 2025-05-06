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
  parentId?: string; // Optional reference to parent subcategory
  level?: number;    // Level in hierarchy (1 for direct child, 2 for grandchild, 3 for great-grandchild)
  children?: Subcategory[]; // Optional children for deeper nesting
}

interface NavigationState {
  categories: Category[];
  activeCategory: string | null;
  mobileDrawerOpen: boolean;
  setCategories: (categories: Category[]) => void;
  setActiveCategory: (categoryId: string | null) => void;
  toggleMobileDrawer: () => void;
  closeMobileDrawer: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  categories: [],
  activeCategory: null,
  mobileDrawerOpen: false,
  
  setCategories: (categories) => set({ categories }),
  setActiveCategory: (categoryId) => set({ activeCategory: categoryId }),
  toggleMobileDrawer: () => set((state) => ({ mobileDrawerOpen: !state.mobileDrawerOpen })),
  closeMobileDrawer: () => set({ mobileDrawerOpen: false }),
}));
