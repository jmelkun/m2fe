import { Box, Text } from '@mantine/core';

interface LogoProps {
  height?: number;
}

export function Logo({ height = 30 }: LogoProps) {
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
        <span style={{ color: 'var(--mantine-color-dark-4)' }}>Connect</span>
      </Text>
    </Box>
  );
}

export default Logo;