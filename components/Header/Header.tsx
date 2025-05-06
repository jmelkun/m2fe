'use client';

import { Box, Group, Container } from '@mantine/core';
import Logo from './Logo';
import { AuthProvider } from '@/components/Header/AuthProvider';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { NavigationMenu } from '@/components/Header/NavigationMenu'; 

interface CategoryNode {
  name: string;
  url_key: string;
  children?: CategoryNode[];
}

export function Header({ categories }: { categories: CategoryNode[] }) {
  return (
    <header>
      {/* Top layer with contact info, color scheme toggle */}
      <Box>
        <Container size="xl">
          <Group justify="space-between">
            <Group gap={20}>
              {/* Phone and Email icons */}
            </Group>
            <ColorSchemeToggle />
          </Group>
        </Container>
      </Box>

      {/* Middle layer with logo, search bar, cart */}
      <Box>
        <Container size="xl">
          <Group justify="space-between">
            <Logo height={40} />
            {/* Search bar */}
            {/* Cart button */}
          </Group>
        </Container>
      </Box>

      {/* Bottom layer — Navigation */}
      <Box>
        <Container size="xl">
          <NavigationMenu categories={categories ?? []} />
        </Container>
      </Box>
    </header>
  );
}

export default Header;
