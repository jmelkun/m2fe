// components/Header/Header.tsx
'use client';

import { useState } from 'react';
import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AnnouncementBar } from './AnnouncementBar';
import { ContentBar } from './ContentBar';
import { NavigationBar } from './NavigationBar';
import { MobileNavDrawer } from './MobileNavDrawer';
import { MobileSearchOverlay } from './MobileSearchOverlay';
import { CartDrawer } from './CartDrawer';
import { CategoryNode } from '@/lib/actions/categories/HeaderCategories';
import classes from './styles.module.css';

interface HeaderProps {
  categories: CategoryNode[];
}

export function Header({ categories }: HeaderProps) {
  const theme = useMantineTheme();
  // Ensure isMobile is always a boolean with default value
  const isMobileQuery = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isMobile = isMobileQuery !== undefined ? isMobileQuery : false;
  
  // State for mobile interactions
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  
  return (
    <header className={classes.header}>
      {/* Announcement Bar - Shown on both desktop and mobile */}
      <AnnouncementBar />
      
      {/* Content Bar - Different layout for mobile vs desktop */}
      <ContentBar 
        isMobile={isMobile}
        onOpenMobileNav={() => setMobileNavOpen(true)}
        onOpenSearch={() => setSearchOverlayOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
      />
      
      {/* Navigation Bar - Only shown on desktop */}
      {!isMobile && <NavigationBar categories={categories} />}
      
      {/* Mobile-only components */}
      {isMobile && (
        <>
          <MobileNavDrawer 
            opened={mobileNavOpen} 
            onClose={() => setMobileNavOpen(false)}
            categories={categories}
          />
          
          <MobileSearchOverlay
            opened={searchOverlayOpen}
            onClose={() => setSearchOverlayOpen(false)}
          />
        </>
      )}
      
      {/* Cart Drawer - Used on both mobile and desktop */}
      <CartDrawer 
        opened={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
      />
    </header>
  );
}

export default Header;