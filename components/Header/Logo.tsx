'use client';

import { Box, Text } from '@mantine/core';
import classes from './Logo.module.css';

interface LogoProps {
  height?: number;
}

export function Logo({ height = 30 }: LogoProps) {
  return (
    <Box className={classes.logoContainer} style={{ height }}>
      <Text
        className={classes.logoText}
        size="xl"
        style={{ fontSize: height * 0.6 }}
      >
        <span className={classes.logoFirstPart}>Drainage</span>
        <span className={classes.logoSecondPart}>Connect</span>
      </Text>
    </Box>
  );
}

export default Logo;
