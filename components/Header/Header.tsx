'use client';

import { useState, useRef } from 'react';
import {
  Box,
  Group,
  Container,
  Text,
  TextInput,
  ActionIcon,
  UnstyledButton,
} from '@mantine/core';
import { IconPhone, IconMail, IconSearch, IconShoppingCart } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import Logo from './Logo';
import { NavigationMenu, CategoryNode } from '@/components/Header/NavigationMenu'; 
import { useAuth } from '@/components/Header/AuthProvider'; 
import classes from './Header.module.css';

interface HeaderProps {
  categories?: CategoryNode[];
}

export function Header({ categories }: HeaderProps) {
  const { cartItemCount } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <header className={classes.header}>
      {/* --- Top Layer --- */}
      <Box className={classes.topLayer}>
        <Container size="xl">
          <Group justify="space-between" className={classes.topLayerInner}>
            <Group gap={20}>
              <Group gap={8}>
                <IconPhone size={16} stroke={1.5} />
                <Text size="sm" className={classes.contactInfo}>
                  <a href="tel:+18033243225">+1 (803) 324-3225</a>
                </Text>
              </Group>
              <Group gap={8}>
                <IconMail size={16} stroke={1.5} />
                <Text size="sm" className={classes.contactInfo}>
                  <a href="mailto:mail@drainageconnect.com">mail@drainageconnect.com</a>
                </Text>
              </Group>
            </Group>

            <Group>
              <ColorSchemeToggle />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* --- Middle Layer --- */}
      <Box className={classes.middleLayer}>
        <Container size="xl">
          <Group justify="space-between" className={classes.middleLayerInner}>
            <Logo height={40} />

            <TextInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.currentTarget.value)}
              placeholder="Search Drainage Connect"
              className={classes.search}
              leftSection={<IconSearch size={16} stroke={1.5} />}
              ref={searchInputRef}
              rightSectionWidth={32}
            />

            <Box style={{ position: 'relative', marginRight: '5px' }}>
              <ActionIcon
                variant="subtle"
                size="lg"
                className={classes.cartButton}
                aria-label="Shopping cart"
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

      {/* --- Bottom Layer (Navigation) --- */}
      <Box className={classes.navLayer}>
        <Container size="xl">
          <Group className={classes.navInner}>
            {/* Here is the Premium Navigation Menu */}
            <NavigationMenu categories={categories ?? []} />
          </Group>
        </Container>
      </Box>
    </header>
  );
}

export default Header;
