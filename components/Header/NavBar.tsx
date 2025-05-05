'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Container, Group, UnstyledButton, Text, Stack, createStyles } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useNavigationStore, Category } from '@/store/navigation-store';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  navBar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  
  navInner: {
    height: 42,
  },
  
  desktopNav: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  
  categoryContainer: {
    position: 'relative',
    height: 42,
    display: 'flex',
    alignItems: 'center',
  },
  
  categoryButton: {
    height: '100%',
    padding: `0 ${theme.spacing.md}`,
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 150ms ease',
    
    '&:hover, &:focus': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],
      outline: 'none',
    },
  },
  
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 10,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    borderRadius: theme.radius.sm,
    boxShadow: theme.shadows.md,
    minWidth: 200,
    padding: theme.spacing.sm,
  },
  
  subcategoryButton: {
    width: '100%',
    textAlign: 'left',
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 150ms ease',
    
    '&:hover, &:focus': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      outline: 'none',
    },
  },
}));

export function NavBar() {
  const { classes } = useStyles();
  const { categories, activeCategory, setActiveCategory } = useNavigationStore();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, category: Category) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpenDropdown(openDropdown === category.id ? null : category.id);
    } else if (e.key === 'Escape') {
      setOpenDropdown(null);
    }
  };

  // Handle mouse events with delay to prevent flickering
  const handleMouseEnter = (categoryId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpenDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 100);
  };

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Box className={classes.navBar} role="navigation" aria-label="Main navigation">
      <Container size="xl">
        <Group className={classes.navInner}>
          <nav className={classes.desktopNav}>
            <Group gap={0}>
              {categories.map((category) => (
                <Box 
                  key={category.id}
                  className={classes.categoryContainer}
                  onMouseEnter={() => handleMouseEnter(category.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <UnstyledButton 
                    className={classes.categoryButton}
                    aria-haspopup="true"
                    aria-expanded={openDropdown === category.id}
                    aria-controls={`dropdown-${category.id}`}
                    onKeyDown={(e) => handleKeyDown(e, category)}
                    tabIndex={0}
                  >
                    <Group gap={4}>
                      <Text size="sm">{category.label}</Text>
                      <IconChevronDown size={16} stroke={1.5} aria-hidden="true" />
                    </Group>
                  </UnstyledButton>
                  
                  {openDropdown === category.id && (
                    <div 
                      className={classes.dropdown}
                      role="menu"
                      id={`dropdown-${category.id}`}
                      aria-label={`${category.label} submenu`}
                    >
                      <Stack gap={8}>
                        {category.subcategories.map((subcategory) => (
                          <Link 
                            key={subcategory.id} 
                            href={subcategory.href}
                            passHref
                            legacyBehavior
                          >
                            <UnstyledButton 
                              className={classes.subcategoryButton}
                              role="menuitem"
                              tabIndex={0}
                            >
                              {subcategory.label}
                            </UnstyledButton>
                          </Link>
                        ))}
                      </Stack>
                    </div>
                  )}
                </Box>
              ))}
            </Group>
          </nav>
        </Group>
      </Container>
    </Box>
  );
}
