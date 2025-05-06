'use server';

import { Category, Subcategory } from '@/store/navigation-store';

// GraphQL query for categories
const CATEGORY_QUERY = `
  query {
    category(id: 2) {
      name
      children {
        name
        url_key
        children {
          name
          url_key
          children {
            name
            url_key
          }
        }
      }
    }
  }
`;

// Function to transform the GraphQL response into our Category format
function transformCategories(categoryData: any): Category[] {
  if (!categoryData?.category?.children) {
    return [];
  }

  return categoryData.category.children.map((child: any, index: number) => {
    const subcategories: Subcategory[] = child.children.map((subcat: any, subIndex: number) => ({
      id: `${index}-${subIndex}`,
      label: subcat.name,
      href: `/${child.url_key}/${subcat.url_key}`
    }));

    return {
      id: `category-${index}`,
      label: child.name,
      subcategories
    };
  });
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch('https://www.drainageconnect.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any authorization headers here if needed
      },
      body: JSON.stringify({
        query: CATEGORY_QUERY
      }),
      cache: 'force-cache', // Use Next.js cache
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return transformCategories(data.data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
