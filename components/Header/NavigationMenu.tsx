'use client';

import { Menu, Group, Box, Anchor, Text, UnstyledButton } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';

interface CategoryNode {
  name: string;
  url_key: string;
  children?: CategoryNode[];
}

interface NavigationProps {
  categories: CategoryNode[];
}

// Recursive submenu renderer
function SubMenu({ categories }: { categories: CategoryNode[] }) {
  return (
    <>
      {categories.map((category) => {
        const hasChildren = category.children && category.children.length > 0;
        const href = `/${category.url_key}`;

        if (!hasChildren) {
          return (
            <Menu.Item key={href} component="a" href={href}>
              {category.name}
            </Menu.Item>
          );
        }

        return (
          <Menu.Item key={href} closeMenuOnClick={false}>
            <Menu
              trigger="hover"
              openDelay={100}
              closeDelay={200}
              withArrow
              withinPortal
              transitionProps={{ transition: 'pop', duration: 150 }}
              position="right-start"
            >
              <Menu.Target>
                <UnstyledButton
                  component="a"
                  href={href}
                  style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
                >
                  <Text>{category.name}</Text>
                  <IconChevronRight size={14} />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <SubMenu categories={category.children} />
              </Menu.Dropdown>
            </Menu>
          </Menu.Item>
        );
      })}
    </>
  );
}

// Main nav renderer
export function NavigationMenu({ categories }: NavigationProps) {
  return (
    <nav aria-label="Main navigation">
      <Group gap="lg" component="ul" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {categories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          const href = `/${category.url_key}`;

          return (
            <li key={href}>
              <Menu
                trigger="hover"
                openDelay={100}
                closeDelay={200}
                withArrow
                withinPortal
                transitionProps={{ transition: 'pop-top-left', duration: 150 }}
                position="bottom-start"
              >
                <Menu.Target>
                  <UnstyledButton
                    component="a"
                    href={href}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px' }}
                  >
                    <Text fw={600}>{category.name}</Text>
                    {hasChildren && <IconChevronDown size={16} />}
                  </UnstyledButton>
                </Menu.Target>

                {hasChildren && (
                  <Menu.Dropdown>
                    <SubMenu categories={category.children} />
                  </Menu.Dropdown>
                )}
              </Menu>
            </li>
          );
        })}
      </Group>
    </nav>
  );
}
