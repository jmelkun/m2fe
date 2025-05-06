'use client';

import { useState, useRef } from 'react';
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
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [activeThirdLevel, setActiveThirdLevel] = useState<string | null>(null);
  const [expandedSubcategories, setExpandedSubcategories] = useState<Record<string, boolean>>({});
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { cartItemCount } = useAuth();
  const { categories } = useNavigationStore();

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
    setActiveThirdLevel(null);
  };

  const handleCategoryLeave = () => {
    setTimeout(() => {
      setActiveCategory(null);
      setActiveSubcategory(null);
      setActiveThirdLevel(null);
    }, 200);
  };
  
  const handleSubcategoryHover = (subcategoryId: string) => {
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }
    setActiveSubcategory(subcategoryId);
    setActiveThirdLevel(null);
  };
  
  const handleSubcategoryLeave = () => {
    flyoutTimeoutRef.current = setTimeout(() => {
      setActiveSubcategory(null);
    }, 300);
  };
  
  const handleThirdLevelHover = (itemId: string) => {
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }
    setActiveThirdLevel(itemId);
  };
  
  const handleThirdLevelLeave = () => {
    flyoutTimeoutRef.current = setTimeout(() => {
      setActiveThirdLevel(null);
    }, 300);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setExpandedSubcategories(prev => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId]
    }));
  };

  // Group subcategories by parent
  const getGroupedSubcategories = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return [];

    // Get all level 1 subcategories
    const parentSubcategories = category.subcategories.filter(sub => sub.level === 1);
    
    // Create groups
    return parentSubcategories.map(parent => {
      // Find all children of this parent
      const children = category.subcategories.filter(
        sub => sub.parentId === parent.id && sub.level === 2
      );
      
      return {
        parent,
        children
      };
    });
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
            <nav className={classes.desktopNav} aria-label="Main Navigation">
              <Group gap={0}>
                {categories.map((category) => (
                  <Box 
                    key={category.id}
                    className={classes.categoryContainer}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                    onMouseLeave={handleCategoryLeave}
                  >
                    <UnstyledButton 
                      className={`${classes.categoryButton} ${activeCategory === category.id ? classes.categoryButtonActive : ''}`}
                      aria-haspopup="true"
                      aria-expanded={activeCategory === category.id}
                      aria-controls={`dropdown-${category.id}`}
                    >
                      <Group gap={4}>
                        <Text size="md" fw={500}>{category.label}</Text>
                        <IconChevronDown size={16} stroke={1.5} />
                      </Group>
                    </UnstyledButton>
                    
                    {activeCategory === category.id && (
                      <div 
                        id={`dropdown-${category.id}`}
                        className={classes.dropdown}
                        role="menu"
                        aria-label={`${category.label} submenu`}
                      >
                        {getGroupedSubcategories(category.id).map(({ parent, children }) => (
                          <div key={parent.id} className={classes.subcategoryGroup}>
                            <Text className={classes.subcategoryHeading}>{parent.label}</Text>
                            
                            {/* Parent category is clickable */}
                            <UnstyledButton 
                              className={`${classes.subcategoryButton} ${children.length > 0 ? classes.hasChildren : ''}`}
                              role="menuitem"
                              component="a"
                              href={parent.href}
                              onMouseEnter={() => handleSubcategoryHover(parent.id)}
                              onMouseLeave={handleSubcategoryLeave}
                            >
                              <Text size="md">{parent.label}</Text>
                            </UnstyledButton>
                            
                            {/* Show flyout for second level categories */}
                            {activeSubcategory === parent.id && children.length > 0 && (
                              <div 
                                className={classes.flyout}
                                onMouseEnter={() => handleSubcategoryHover(parent.id)}
                                onMouseLeave={handleSubcategoryLeave}
                              >
                                {children.map(child => {
                                  // Check if this child has children (4th level)
                                  const hasChildren = child.children && child.children.length > 0;
                                  
                                  return (
                                    <UnstyledButton 
                                      key={child.id}
                                      className={`${classes.subcategoryButton} ${hasChildren ? classes.hasChildren : ''}`}
                                      role="menuitem"
                                      component="a"
                                      href={child.href}
                                      onMouseEnter={() => handleThirdLevelHover(child.id)}
                                      onMouseLeave={handleThirdLevelLeave}
                                    >
                                      <Text size="md">{child.label}</Text>
                                      
                                      {/* Show flyout for third level categories */}
                                      {activeThirdLevel === child.id && hasChildren && (
                                        <div 
                                          className={classes.nestedFlyout}
                                          onMouseEnter={() => handleThirdLevelHover(child.id)}
                                          onMouseLeave={handleThirdLevelLeave}
                                        >
                                          {child.children?.map(fourthLevel => (
                                            <UnstyledButton 
                                              key={fourthLevel.id}
                                              className={classes.subcategoryButton}
                                              role="menuitem"
                                              component="a"
                                              href={fourthLevel.href}
                                            >
                                              <Text size="md">{fourthLevel.label}</Text>
                                            </UnstyledButton>
                                          ))}
                                        </div>
                                      )}
                                    </UnstyledButton>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
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
        title={<Text fw={700} size="lg">Navigation</Text>}
        size="100%"
        padding="md"
        className={classes.mobileDrawer}
        zIndex={1000}
      >
        <Stack gap="md">
          {categories.map((category) => (
            <Box key={category.id}>
              <Button 
                variant="subtle" 
                fullWidth 
                justify="space-between"
                onClick={() => toggleSubcategory(category.id)}
                aria-expanded={!!expandedSubcategories[category.id]}
                aria-controls={`mobile-dropdown-${category.id}`}
              >
                <Text fw={600}>{category.label}</Text>
                <IconChevronDown 
                  size={16} 
                  stroke={1.5} 
                  style={{ 
                    transform: expandedSubcategories[category.id] ? 'rotate(180deg)' : 'none',
                    transition: 'transform 200ms ease'
                  }} 
                />
              </Button>
              
              {expandedSubcategories[category.id] && (
                <Box 
                  id={`mobile-dropdown-${category.id}`}
                  p="xs" 
                  pl="md"
                >
                  {getGroupedSubcategories(category.id).map(({ parent, children }) => (
                    <Box key={parent.id} mb="sm">
                      <Button
                        variant="subtle"
                        color="blue"
                        fullWidth
                        justify="space-between"
                        component="a"
                        href={parent.href}
                        mb={4}
                        onClick={(e) => {
                          if (children.length > 0) {
                            e.preventDefault();
                            toggleSubcategory(parent.id);
                          }
                        }}
                      >
                        <Text fw={500}>{parent.label}</Text>
                        {children.length > 0 && (
                          <IconChevronDown 
                            size={14} 
                            stroke={1.5} 
                            style={{ 
                              transform: expandedSubcategories[parent.id] ? 'rotate(180deg)' : 'none',
                              transition: 'transform 200ms ease'
                            }} 
                          />
                        )}
                      </Button>
                      
                      {expandedSubcategories[parent.id] && children.length > 0 && (
                        <Box pl="md" style={{ borderLeft: '2px solid var(--mantine-color-gray-3)' }}>
                          {children.map(child => (
                            <Button
                              key={child.id}
                              variant="subtle"
                              color="gray"
                              fullWidth
                              justify="flex-start"
                              component="a"
                              href={child.href}
                              mb={4}
                              leftSection={<Box w={8} h={8} style={{ backgroundColor: 'var(--mantine-color-blue-5)', borderRadius: '50%' }} />}
                            >
                              <Text size="sm">{child.label}</Text>
                            </Button>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Drawer>
    </header>
  );
}

export default Header;
