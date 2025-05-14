'use client';

import { useState, useEffect } from 'react';
import { CategoryNode, headerCategories } from '@/lib/actions/categories/HeaderCategories';

// Fallback categories data in case fetch fails
const fallbackCategories: CategoryNode[] = [
  {
    name: 'Products',
    url_key: 'products',
    children: [
      { name: 'Pipes', url_key: 'pipes' },
      { name: 'Fittings', url_key: 'fittings' }
    ]
  },
  {
    name: 'Resources',
    url_key: 'resources'
  }
];

export function useCategories() {
  const [categories, setCategories] = useState<CategoryNode[]>(fallbackCategories);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);
        // Call the server action to fetch categories
        const fetchedCategories = await headerCategories();
        
        if (fetchedCategories && fetchedCategories.length > 0) {
          setCategories(fetchedCategories);
        }
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
        // Keep using fallback categories in case of error
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);
  
  return {
    categories,
    loading,
    error
  };
}