'use client';

import { Button, Group, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Only enable client-side features after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render buttons until client-side to avoid hydration mismatch
  if (!mounted) {
    return <Group justify="center" mt="xl" style={{ height: '36px' }}></Group>;
  }

  return (
    <Group justify="center" mt="xl">
      <Button 
        onClick={() => setColorScheme('light')}
        variant={colorScheme === 'light' ? 'filled' : 'outline'}
      >
        Light
      </Button>
      <Button 
        onClick={() => setColorScheme('dark')}
        variant={colorScheme === 'dark' ? 'filled' : 'outline'}
      >
        Dark
      </Button>
      <Button 
        onClick={() => setColorScheme('auto')}
        variant={colorScheme === 'auto' ? 'filled' : 'outline'}
      >
        Auto
      </Button>
    </Group>
  );
}
