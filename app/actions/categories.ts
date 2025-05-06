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
             children {
              name
              url_key
            }
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
    const subcategories: Subcategory[] = [];
    
    // Process second level categories
    child.children.forEach((subcat: any, subIndex: number) => {
      // Add the second level category
      const subcategoryId = `${index}-${subIndex}`;
      const level1Item: Subcategory = {
        id: subcategoryId,
        label: subcat.name,
        href: `/${child.url_key}/${subcat.url_key}`,
        level: 1,
        children: []
      };
      
      // Process third level categories if they exist
      if (subcat.children && subcat.children.length > 0) {
        subcat.children.forEach((thirdLevel: any, thirdIndex: number) => {
          const level2Id = `${subcategoryId}-${thirdIndex}`;
          const level2Item: Subcategory = {
            id: level2Id,
            label: thirdLevel.name,
            href: `/${child.url_key}/${subcat.url_key}/${thirdLevel.url_key}`,
            parentId: subcategoryId,
            level: 2,
            children: []
          };
          
          // Process fourth level categories if they exist
          if (thirdLevel.children && thirdLevel.children.length > 0) {
            thirdLevel.children.forEach((fourthLevel: any, fourthIndex: number) => {
              level2Item.children?.push({
                id: `${level2Id}-${fourthIndex}`,
                label: fourthLevel.name,
                href: `/${child.url_key}/${subcat.url_key}/${thirdLevel.url_key}/${fourthLevel.url_key}`,
                parentId: level2Id,
                level: 3
              });
            });
          }
          
          subcategories.push(level2Item);
        });
      }
      
      subcategories.push(level1Item);
    });

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
