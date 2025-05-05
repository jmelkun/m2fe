'use client';

import { Box, Text, useMantineColorScheme } from '@mantine/core';

interface LogoProps {
  height?: number;
}

export function Logo({ height = 30 }: LogoProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Box
      style={{
        height,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Text
        fw={700}
        size="xl"
        style={{
          fontSize: height * 0.6,
          letterSpacing: -0.5,
        }}
      >
        <span style={{ color: 'var(--mantine-color-blue-6)' }}>Drainage</span>
        <span style={{ color: isDark ? 'var(--mantine-color-gray-4)' : 'var(--mantine-color-dark-4)' }}>Connect</span>
      </Text>
    </Box>
  );
}

export default Logo;
