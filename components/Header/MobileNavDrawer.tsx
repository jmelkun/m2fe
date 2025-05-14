'use client';

import { useState } from 'react';
import { 
  Drawer, 
  Stack, 
  NavLink, 
  Divider, 
  Group, 
  Text,
  UnstyledButton,
  Collapse,
  Loader,
  Center
} from '@mantine/core';
import { CategoryNode } from '@/lib/actions/categories/HeaderCategories';
import { IconChevronDown, IconPhone, IconMail } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import classes from './Header.module.css';

interface MobileNavDrawerProps {
  opened: boolean;
  onClose: () => void;
  categories: CategoryNode[];
  loading?: boolean;
}

export function MobileNavDrawer({ opened, onClose, categories, loading = false }: MobileNavDrawerProps) {
  // Store state of which category is expanded
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  // Toggle category expansion
  const toggleCategory = (catKey: string) => {
    setExpandedCategory(expandedCategory === catKey ? null : catKey);
  };

  // Recursive function to render categories and their children
  const renderCategoryTree = (category: CategoryNode, level = 0) => {
    const hasChildren = (category.children?.length ?? 0) > 0;
    const isExpanded = expandedCategory === category.url_key;
    const url = `/${category.url_key}`;
    
    return (
      <div key={category.url_key}>
        <NavLink
          component={hasChildren ? 'div' : 'a'}
          href={hasChildren ? undefined : url}
          onClick={hasChildren ? () => toggleCategory(category.url_key) : onClose}
          label={
            <Group justify="space-between" wrap="nowrap">
              <Text>{category.name}</Text>
              {hasChildren && (
                <IconChevronDown 
                  size={16} 
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease'
                  }}
                />
              )}
            </Group>
          }
          style={{ paddingLeft: `${level * 16}px` }}
        />
        
        {hasChildren && (
          <Collapse in={isExpanded}>
            <div>
              {category.children?.map(child => renderCategoryTree(child, level + 1))}
            </div>
          </Collapse>
        )}
      </div>
    );
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Menu"
      padding="md"
      size="xs"
      position="left"
    >
      <Stack>
        {/* User account section - placeholder */}
        <NavLink
          label="My Account"
          onClick={onClose}
          component="a"
          href="/account"
        />
        
        <Divider my="sm" />
        
        {/* Settings section */}
        <Group p="xs">
          <Text size="sm" fw={500}>Theme</Text>
          <ColorSchemeToggle />
        </Group>
        
        {/* Language toggle placeholder */}
        <UnstyledButton className={classes.languageButton} p="xs">
          <Text size="sm">Language: English</Text>
        </UnstyledButton>
        
        <Divider my="sm" />
        
        {/* Categories navigation */}
        <Text size="sm" fw={700} p="xs">Categories</Text>
        
        {loading ? (
          <Center p="xl">
            <Loader size="sm" />
          </Center>
        ) : (
          categories.map(category => renderCategoryTree(category))
        )}
        
        <Divider my="sm" />
        
        {/* Contact information */}
        <Stack gap="xs" p="xs">
          <Text size="sm" fw={700}>Contact Us</Text>
          
          <Group gap={8} wrap="nowrap">
            <IconPhone size={16} stroke={1.5} />
            <Text size="sm" component="a" href="tel:+18033243225">
              +1 (803) 324-3225
            </Text>
          </Group>
          
          <Group gap={8} wrap="nowrap">
            <IconMail size={16} stroke={1.5} />
            <Text size="sm" component="a" href="mailto:mail@drainageconnect.com">
              mail@drainageconnect.com
            </Text>
          </Group>
        </Stack>
      </Stack>
    </Drawer>
  );
}