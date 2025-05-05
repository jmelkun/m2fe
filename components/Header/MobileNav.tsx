'use client';

import { Drawer, Stack, Menu, Button, TextInput, Group, Text, Box, createStyles } from '@mantine/core';
import { IconChevronDown, IconSearch, IconPhone, IconMail } from '@tabler/icons-react';
import { useNavigationStore } from '@/store/navigation-store';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  mobileSearch: {
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
  
  mobileContactInfo: {
    marginTop: theme.spacing.md,
    paddingTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

export function MobileNav() {
  const { classes } = useStyles();
  const { categories, mobileDrawerOpen, closeMobileDrawer } = useNavigationStore();

  return (
    <Drawer
      opened={mobileDrawerOpen}
      onClose={closeMobileDrawer}
      title="Navigation"
      size="100%"
      padding="md"
      zIndex={1000}
    >
      <Stack gap="md">
        {categories.map((category) => (
          <Menu 
            key={category.id}
            position="bottom-start"
            offset={4}
            withArrow
            trigger="click"
          >
            <Menu.Target>
              <Button variant="subtle" fullWidth justify="space-between">
                {category.label}
                <IconChevronDown size={16} stroke={1.5} aria-hidden="true" />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {category.subcategories.map((subcategory) => (
                <Menu.Item 
                  key={subcategory.id}
                  component={Link}
                  href={subcategory.href}
                  onClick={closeMobileDrawer}
                >
                  {subcategory.label}
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        ))}
        
        <Box className={classes.mobileSearch}>
          <TextInput
            placeholder="Search products..."
            leftSection={<IconSearch size={16} stroke={1.5} />}
            size="md"
            w="100%"
            aria-label="Search products"
          />
        </Box>
        
        <Group className={classes.mobileContactInfo}>
          <Group gap={8}>
            <IconPhone size={16} stroke={1.5} aria-hidden="true" />
            <Text size="sm">+1 (555) 123-4567</Text>
          </Group>
          <Group gap={8}>
            <IconMail size={16} stroke={1.5} aria-hidden="true" />
            <Text size="sm">support@example.com</Text>
          </Group>
        </Group>
      </Stack>
    </Drawer>
  );
}
