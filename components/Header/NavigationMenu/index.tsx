//NavigationMenu.tsx
'use client';

import React, { useState } from 'react';
import { Menu, Group, UnstyledButton, Text, Box } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

export interface CategoryNode {
  name: string;
  url_key: string;
  children?: CategoryNode[];
}

interface NavigationMenuProps {
  categories: CategoryNode[];
}

function buildHref(path: CategoryNode[]): string {
  return '/' + path.map((cat) => cat.url_key).join('/');
}

// Recursive submenu renderer - memoize for performance
const SubMenu = React.memo(({ categories, parentPath }: { categories: CategoryNode[]; parentPath: CategoryNode[] }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <>
      {categories.map((category) => {
        const newPath = [...parentPath, category];
        const href = buildHref(newPath);
        const hasChildren = (category.children?.length ?? 0) > 0;
        const isHovered = hoveredItem === href;

        return hasChildren ? (
          <Menu.Item key={href} closeMenuOnClick={false} style={{ padding: 0 }}>
            <Menu
              trigger="hover"
              openDelay={100}
              closeDelay={150}
              withArrow
              withinPortal
              position="right-start"
              transitionProps={{ transition: 'pop', duration: 150 }}
              styles={{
                dropdown: {
                  padding: '4px 0'
                },
                item: {
                  padding: 0
                }
              }}
              onOpen={() => setHoveredItem(href)}
              onClose={() => setHoveredItem(null)}
            >
              <Menu.Target>
                <UnstyledButton
                  component="a"
                  href={href}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: '8px 12px',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <Text size="sm">{category.name}</Text>
                  <IconChevronRight 
                    size={14} 
                    style={{
                      transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <SubMenu categories={category.children ?? []} parentPath={newPath} />
              </Menu.Dropdown>
            </Menu>
          </Menu.Item>
        ) : (
          <Menu.Item key={href} component="a" href={href} style={{ padding: '8px 12px' }}>
            <Text size="sm">{category.name}</Text>
          </Menu.Item>
        );
      })}
    </>
  );
});

// Add display name for better debugging
SubMenu.displayName = 'SubMenu';

// Top-level navigation renderer
export function NavigationMenu({ categories }: NavigationMenuProps) {
  const [hoveredTopItem, setHoveredTopItem] = useState<string | null>(null);
  
  return (
    <nav aria-label="Main navigation">
      <Group component="ul" gap="lg" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {categories.map((category) => {
          const href = `/${category.url_key}`;
          const hasChildren = (category.children?.length ?? 0) > 0;
          const isHovered = hoveredTopItem === href;

          return (
            <Box key={href} component="li" style={{ position: 'relative' }}>
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={150}
                withArrow
                withinPortal
                position="bottom-start"
                transitionProps={{ transition: 'pop-top-left', duration: 150 }}
                styles={{
                  dropdown: {
                    padding: '4px 0'
                  },
                  item: {
                    padding: 0
                  }
                }}
                onOpen={() => setHoveredTopItem(href)}
                onClose={() => setHoveredTopItem(null)}
              >
                <Menu.Target>
                  <UnstyledButton
                    component="a"
                    href={href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 12px',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-expanded="false"
                  >
                    <Text size="sm" fw={600}>{category.name}</Text>
                    {hasChildren && (
                      <IconChevronDown 
                        size={16} 
                        style={{
                          transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease'
                        }}
                      />
                    )}
                  </UnstyledButton>
                </Menu.Target>

                {hasChildren && (
                  <Menu.Dropdown>
                    <SubMenu categories={category.children ?? []} parentPath={[category]} />
                  </Menu.Dropdown>
                )}
              </Menu>
            </Box>
          );
        })}
      </Group>
    </nav>
  );
}