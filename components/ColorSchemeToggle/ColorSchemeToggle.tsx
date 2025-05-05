'use client';

import { Button, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useMantineColorScheme } from '@mantine/core';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  // Only enable client-side features after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render buttons until client-side to avoid hydration mismatch
  if (!mounted) {
    return <div className={classes.placeholder}></div>;
  }

  return (
    <div className={classes.toggleContainer}>
      <Group>
        <Button 
          onClick={() => setColorScheme('light')}
          className={`${classes.toggleButton} ${colorScheme === 'light' ? classes.active : classes.inactive}`}
        >
          Light
        </Button>
        <Button 
          onClick={() => setColorScheme('dark')}
          className={`${classes.toggleButton} ${colorScheme === 'dark' ? classes.active : classes.inactive}`}
        >
          Dark
        </Button>
        <Button 
          onClick={() => setColorScheme('auto')}
          className={`${classes.toggleButton} ${colorScheme === 'auto' ? classes.active : classes.inactive}`}
        >
          Auto
        </Button>
      </Group>
    </div>
  );
}
