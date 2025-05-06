'use client';

import { useState } from 'react';
import { 
  Box, 
  Group,
  Text,
  Button,
  TextInput,
  Menu,
  ActionIcon,
  Burger,
  Drawer,
  Stack,
  UnstyledButton,
  Container,
  Anchor
} from '@mantine/core';
import { 
  IconPhone, 
  IconMail, 
  IconSearch, 
  IconShoppingCart, 
  IconChevronDown,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Logo from './Logo'; // You'll need to create this component
import classes from './Header.module.css';
import { useAuth } from '@/components/Header/AuthProvider';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

// Define your categories
const categories = [
  { label: 'Electronics', subcategories: ['Phones', 'Laptops', 'Accessories'] },
  { label: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { label: 'Home', subcategories: ['Kitchen', 'Furniture', 'Decor'] },
  { label: 'Books', subcategories: ['Fiction', 'Non-fiction', 'Academic'] },
  { label: 'Sports', subcategories: ['Equipment', 'Clothing', 'Accessories'] },
];

export function Header() {

  return (
    <header className={classes.header}>
      {/* Top Layer */}
      <Box className={classes.topLayer}>
        <Container size="xl">
          <Group justify="space-between" className={classes.topLayerInner}>
            <Group gap={20}>
              <Group gap={8}>
                <IconPhone size={16} stroke={1.5} />
                <Text size="sm" className={classes.contactInfo}><Anchor href="tel:+18033243225" size="md">+1 (803) 324-3225</Anchor></Text>
              </Group>
              <Group gap={8}>
                <IconMail size={16} stroke={1.5} />
                <Text size="sm" className={classes.contactInfo}><Anchor href="mailto:mail@drainageconnect.com" size="md">mail@drainageconnect.com</Anchor></Text>
              </Group>
            </Group>

            <Group>
              {/* Add the ColorSchemeToggle to the top bar */}
              <ColorSchemeToggle />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Middle Layer */}
      <Box className={classes.middleLayer}>
        <Container size="xl">
          <Group justify="space-between" className={classes.middleLayerInner}>
            <Logo height={40} />
            <TextInput
              placeholder="Search Drainage Connect"
              className={classes.search}
              leftSection={<IconSearch size={16} stroke={1.5} />}
              rightSectionWidth={32}
            />
            <Box style={{ position: 'relative' }}>
              <ActionIcon variant="subtle" size="lg" className={classes.cartButton} aria-label="Shopping cart">
                <IconShoppingCart size={22} stroke={1.5} />
              </ActionIcon>
            </Box>
          </Group>
        </Container>
      </Box>

      {/* Bottom Layer */}
      <Box className={classes.navLayer}>
        <Container size="xl">
          <Group className={classes.navInner}>
            <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.burger} size="sm" aria-label="Toggle navigation" />
            <nav className={classes.desktopNav}>
              <Group gap={0}>
                {categories.map((category) => (
                  <Box 
                    key={category.label}
                    className={classes.categoryContainer}
                    onMouseEnter={() => handleCategoryHover(category.label)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <UnstyledButton 
                      className={classes.categoryButton}
                      aria-haspopup="true"
                      aria-expanded={activeCategory === category.label}
                    >
                      <Group gap={4}>
                        <Text size="sm">{category.label}</Text>
                        <IconChevronDown size={16} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                    
                    {activeCategory === category.label && (
                      <div 
                        className={classes.dropdown}
                        role="menu"
                        aria-label={`${category.label} submenu`}
                      >
                        <Stack gap={8}>
                          {category.subcategories.map((subcategory) => (
                            <UnstyledButton 
                              key={subcategory}
                              className={classes.subcategoryButton}
                              role="menuitem"
                            >
                              {subcategory}
                            </UnstyledButton>
                          ))}
                        </Stack>
                      </div>
                    )}
                  </Box>
                ))}
              </Group>
            </nav>
          </Group>
        </Container>
      </Box>

      {/* Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        title="Navigation"
        size="100%"
        padding="md"
        className={classes.mobileDrawer}
        zIndex={1000}
      >
        <Stack gap="md">
          {categories.map((category) => (
            <Menu 
              key={category.label}
              position="bottom-start"
              offset={4}
              withArrow
              trigger="hover"
              openDelay={0}
              closeDelay={200}
            >
              <Menu.Target>
                <Button variant="subtle" fullWidth justify="space-between">
                  {category.label}
                  <IconChevronDown size={16} stroke={1.5} />
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                {category.subcategories.map((subcategory) => (
                  <Menu.Item key={subcategory}>{subcategory}</Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}

export default Header;
