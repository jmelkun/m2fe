'use client';

import { Box, Container, Group, TextInput, ActionIcon, createStyles } from '@mantine/core';
import { IconSearch, IconShoppingCart } from '@tabler/icons-react';
import { useAuthStore } from '@/store/auth-store';
import Logo from './Logo';

const useStyles = createStyles((theme) => ({
  middleBar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    padding: `${theme.spacing.md} 0`,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  
  middleBarInner: {
    minHeight: 40,
    [theme.fn.smallerThan('md')]: {
      justifyContent: 'space-between',
    },
  },
  
  search: {
    width: '100%',
    maxWidth: 400,
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },
  
  cartButton: {
    position: 'relative',
  },
  
  cartBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 18,
    height: 18,
    borderRadius: '50%',
    backgroundColor: theme.colors.red[6],
    color: theme.white,
    fontSize: 10,
    fontWeight: 700,
  },
}));

export function MiddleBar() {
  const { classes } = useStyles();
  const { cartItemCount } = useAuthStore();

  return (
    <Box className={classes.middleBar}>
      <Container size="xl">
        <Group justify="space-between" className={classes.middleBarInner}>
          <Logo height={40} />
          
          <TextInput
            placeholder="Search products..."
            className={classes.search}
            leftSection={<IconSearch size={16} stroke={1.5} />}
            rightSectionWidth={32}
            aria-label="Search products"
          />
          
          <ActionIcon 
            variant="subtle" 
            radius="xl"
            className={classes.cartButton}
            aria-label={`Shopping cart with ${cartItemCount} items`}
          >
            <Group gap={6}>
              <IconShoppingCart size={22} stroke={1.5} />
              {cartItemCount > 0 && (
                <Box className={classes.cartBadge} aria-hidden="true">{cartItemCount}</Box>
              )}
            </Group>
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
}
