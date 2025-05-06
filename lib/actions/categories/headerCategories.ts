'use server';

// GraphQL query for categories
const CATEGORY_QUERY = `
  query {
    category(id: 2) {
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

interface CategoryNode {
  name: string;
  url_key: string;
  children?: CategoryNode[];
}

export async function headerCategories(): Promise<CategoryNode[]> {
  try {
    const response = await fetch('https://www.drainageconnect.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: CATEGORY_QUERY }),
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.category.children || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
