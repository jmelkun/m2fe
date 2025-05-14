'use client';

import { Box, Container, Group, Text } from '@mantine/core';
import { IconPhone, IconMail } from '@tabler/icons-react';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import classes from './Header.module.css';

export function AnnouncementBar() {
  const theme = useMantineTheme();
  // Ensure isMobile is always a boolean with default value
  const isMobileQuery = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);
  const isMobile = isMobileQuery !== undefined ? isMobileQuery : false;

  return (
    <Box className={classes.topLayer}>
      <Container size="xl">
        <Group justify="space-between" className={classes.topLayerInner}>
          {/* Contact information - always visible */}
          <Group gap={isMobile ? 10 : 20} wrap="nowrap">
            <Group gap={8} wrap="nowrap">
              <IconPhone size={16} stroke={1.5} />
              <Text size="sm" className={classes.contactInfo}>
                <a href="tel:+18033243225">+1 (803) 324-3225</a>
              </Text>
            </Group>
            
            <Group gap={8} wrap="nowrap">
              <IconMail size={16} stroke={1.5} />
              <Text size="sm" className={classes.contactInfo}>
                <a href="mailto:mail@drainageconnect.com">mail@drainageconnect.com</a>
              </Text>
            </Group>
          </Group>
          
          {/* Only show these controls on desktop */}
          {!isMobile && (
            <Group>
              <ColorSchemeToggle />
              {/* You can add Account Login and Language Toggle here later */}
            </Group>
          )}
        </Group>
      </Container>
    </Box>
  );
}