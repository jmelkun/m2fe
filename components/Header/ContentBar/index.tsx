'use client';

import { useRef, useState } from 'react';
import { Box, Container, Group, TextInput, ActionIcon, Burger } from '@mantine/core';
import { IconSearch, IconShoppingCart } from '@tabler/icons-react';
import Logo from '../Logo/';
import { useAuth } from '@/hooks/useAuth'; 
import classes from './ContentBar.module.css';

interface ContentBarProps {
  isMobile: boolean;
  onOpenMobileNav: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
}

export function ContentBar({ 
  isMobile, 
  onOpenMobileNav, 
  onOpenSearch, 
  onOpenCart 
}: ContentBarProps) {
  const { cartItemCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle search form submission
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search functionality
    console.log('Search submitted:', searchQuery);
  };

  return (
    <Box className={classes.middleLayer}>
      <Container size="xl">
        <Group justify="space-between" className={classes.middleLayerInner}>
          {/* Mobile-only burger menu */}
          {isMobile && (
            <Burger
              opened={false}
              onClick={onOpenMobileNav}
              aria-label="Toggle navigation"
              size="sm"
            />
          )}

          {/* Logo - shown on both mobile and desktop */}
          <Logo height={40} />

          {/* Search - shown differently on mobile vs desktop */}
          {!isMobile ? (
            <form onSubmit={handleSearchSubmit} style={{ flexGrow: 1, maxWidth: '500px' }}>
              <TextInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                placeholder="Search Drainage Connect"
                className={classes.search}
                leftSection={<IconSearch size={16} stroke={1.5} />}
                ref={searchInputRef}
              />
            </form>
          ) : (
            <ActionIcon
              variant="subtle"
              onClick={onOpenSearch}
              aria-label="Search"
              size="lg"
            >
              <IconSearch size={20} stroke={1.5} />
            </ActionIcon>
          )}

          {/* Cart button - shown on both mobile and desktop */}
          <Box style={{ position: 'relative' }}>
            <ActionIcon
              variant="subtle"
              size="lg"
              className={classes.cartButton}
              aria-label="Shopping cart"
              onClick={onOpenCart}
            >
              <IconShoppingCart size={22} stroke={1.5} />
            </ActionIcon>
            {cartItemCount > 0 && (
              <Box className={classes.cartBadge}>{cartItemCount}</Box>
            )}
          </Box>
        </Group>
      </Container>
    </Box>
  );
}
