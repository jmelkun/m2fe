'use client';

import { Box, Container, Group, Text, Button, createStyles } from '@mantine/core';
import { IconPhone, IconMail } from '@tabler/icons-react';
import { useAuthStore } from '@/store/auth-store';

const useStyles = createStyles((theme) => ({
  topBar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    padding: `${theme.spacing.xs} 0`,
  },
  
  topBarInner: {
    minHeight: 28,
    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
  },
  
  contactInfo: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  },
}));

export function TopBar() {
  const { classes } = useStyles();
  const { isLoggedIn, login, signup, logout } = useAuthStore();

  return (
    <Box className={classes.topBar}>
      <Container size="xl">
        <Group justify="space-between" className={classes.topBarInner}>
          <Group gap={20}>
            <Group gap={8}>
              <IconPhone size={16} stroke={1.5} />
              <Text size="sm" className={classes.contactInfo}>+1 (555) 123-4567</Text>
            </Group>
            <Group gap={8}>
              <IconMail size={16} stroke={1.5} />
              <Text size="sm" className={classes.contactInfo}>support@example.com</Text>
            </Group>
          </Group>
          
          <Group>
            {isLoggedIn ? (
              <Button variant="subtle" size="sm" onClick={logout}>
                Log Out
              </Button>
            ) : (
              <Group gap={12}>
                <Button variant="subtle" size="sm" onClick={login}>
                  Log In
                </Button>
                <Button size="sm" onClick={signup}>
                  Sign Up
                </Button>
              </Group>
            )}
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
