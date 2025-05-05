'use client';

import { Box, Burger, createStyles } from '@mantine/core';
import { TopBar } from './TopBar';
import { MiddleBar } from './MiddleBar';
import { NavBar } from './NavBar';
import { MobileNav } from './MobileNav';
import { useNavigationStore } from '@/store/navigation-store';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    boxShadow: theme.shadows.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  
  burger: {
    [theme.fn.largerThan('md')]: {
      display: 'none',
    },
  },
}));

export function Header() {
  const { classes } = useStyles();
  const { mobileDrawerOpen, toggleMobileDrawer } = useNavigationStore();

  return (
    <header className={classes.header}>
      <TopBar />
      <MiddleBar />
      
      {/* Mobile burger menu */}
      <Burger
        opened={mobileDrawerOpen}
        onClick={toggleMobileDrawer}
        className={classes.burger}
        size="sm"
        aria-label="Toggle navigation"
        mx="md"
        my="sm"
      />
      
      <NavBar />
      <MobileNav />
    </header>
  );
}

export default Header;
