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
  Anchor,
} from '@mantine/core';
import { 
  IconPhone, 
  IconMail, 
  IconSearch, 
  IconShoppingCart, 
  IconChevronDown,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Logo from './Logo';
import classes from './Header.module.css';
import { useAuth } from '@/components/Header/AuthProvider';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { useNavigationStore } from '@/store/navigation-store';

export function Header() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { cartItemCount } = useAuth();
  const { categories } = useNavigationStore();

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

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
            <Box style={{ position: 'relative', marginRight: '5px' }}>
              <ActionIcon 
                variant="subtle" 
                size="lg"
                className={classes.cartButton}
                aria-label="Shopping cart"
              >
                <IconShoppingCart size={22} stroke={1.5} />
              </ActionIcon>
              {cartItemCount > 0 && (
                <Box className={classes.cartBadge}>{cartItemCount}</Box>
              )}
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
                    key={category.id}
                    className={classes.categoryContainer}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <UnstyledButton 
                      className={classes.categoryButton}
                      aria-haspopup="true"
                      aria-expanded={activeCategory === category.id}
                    >
                      <Group gap={4}>
                        <Text size="sm">{category.label}</Text>
                        <IconChevronDown size={16} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                    
                    {activeCategory === category.id && (
                      <div 
                        className={classes.dropdown}
                        role="menu"
                        aria-label={`${category.label} submenu`}
                      >
                        <Stack gap={8}>
                          {category.subcategories.map((subcategory) => (
                            <UnstyledButton 
                              key={subcategory.id}
                              className={classes.subcategoryButton}
                              role="menuitem"
                              component="a"
                              href={subcategory.href}
                              style={subcategory.level === 2 ? { paddingLeft: '24px', fontSize: '0.9em' } : {}}
                            >
                              {subcategory.label}
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
              key={category.id}
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
                  <Menu.Item 
                    key={subcategory.id}
                    component="a"
                    href={subcategory.href}
                    style={subcategory.level === 2 ? { paddingLeft: '24px', fontSize: '0.9em' } : {}}
                  >
                    {subcategory.label}
                  </Menu.Item>
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
