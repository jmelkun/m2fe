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
  Container
} from '@mantine/core';
import { 
  IconPhone, 
  IconMail, 
  IconSearch, 
  IconShoppingCart, 
  IconChevronDown,
  IconSun,
  IconMoon
} from '@tabler/icons-react';
import { useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Logo from './Logo'; // You'll need to create this component
import classes from './Header.module.css';
import { useAuth } from '@/components/Header/AuthProvider';

// Define your categories
const categories = [
  { label: 'Electronics', subcategories: ['Phones', 'Laptops', 'Accessories'] },
  { label: 'Clothing', subcategories: ['Men', 'Women', 'Kids'] },
  { label: 'Home', subcategories: ['Kitchen', 'Furniture', 'Decor'] },
  { label: 'Books', subcategories: ['Fiction', 'Non-fiction', 'Academic'] },
  { label: 'Sports', subcategories: ['Equipment', 'Clothing', 'Accessories'] },
];

export function Header() {
  const { isLoggedIn, cartItemCount, login, signup, logout } = useAuth();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  // Function to handle category hover
  const handleCategoryHover = (category: string) => {
    setActiveCategory(category);
  };

  // Function to handle category leave
  const handleCategoryLeave = () => {
    setActiveCategory(null);
  };

  return (
    <header className={classes.header}>
      {/* Top Layer */}
      <Box className={classes.topLayer}>
        <Container size="xl">
          <Group justify="space-between" className={classes.topLayerInner}>
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
      
      {/* Middle Layer */}
      <Box className={classes.middleLayer}>
        <Container size="xl">
          <Group justify="space-between" className={classes.middleLayerInner}>
            <Logo height={40} />
            
            <TextInput
              placeholder="Search products..."
              className={classes.search}
              leftSection={<IconSearch size={16} stroke={1.5} />}
              rightSectionWidth={32}
            />
            
            <Group gap="md">
              <ActionIcon 
                variant="subtle" 
                radius="md"
                className={classes.cartButton}
                aria-label="Shopping cart"
              >
                <Group gap={6}>
                  <IconShoppingCart size={22} stroke={1.5} />
                  {cartItemCount > 0 && (
                    <Box className={classes.cartBadge}>{cartItemCount}</Box>
                  )}
                </Group>
              </ActionIcon>
              
              <ActionIcon
                variant="subtle"
                radius="md"
                onClick={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle color scheme"
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={22} stroke={1.5} />
                ) : (
                  <IconMoon size={22} stroke={1.5} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </Box>
      
      {/* Bottom Layer - Navigation */}
      <Box className={classes.navLayer}>
        <Container size="xl">
          <Group className={classes.navInner}>
            {/* Mobile burger menu */}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.burger}
              size="sm"
              aria-label="Toggle navigation"
            />
            
            {/* Desktop navigation */}
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
      
      {/* Mobile Navigation Drawer */}
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
          
          <Box className={classes.mobileSearch}>
            <TextInput
              placeholder="Search products..."
              leftSection={<IconSearch size={16} stroke={1.5} />}
              size="md"
              w="100%"
            />
          </Box>
          
          <Group className={classes.mobileContactInfo}>
            <Group gap={8}>
              <IconPhone size={16} stroke={1.5} />
              <Text size="sm">+1 (555) 123-4567</Text>
            </Group>
            <Group gap={8}>
              <IconMail size={16} stroke={1.5} />
              <Text size="sm">support@example.com</Text>
            </Group>
          </Group>
        </Stack>
      </Drawer>
    </header>
  );
}

export default Header;
