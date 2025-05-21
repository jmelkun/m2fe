'use client';

import { Box, Container, Group } from '@mantine/core';
import { NavigationMenu } from '../NavigationMenu/'; 
import { CategoryNode } from '@/lib/actions/categories/HeaderCategories';
import classes from './NavigationBar.module.css';

interface NavigationBarProps {
  categories: CategoryNode[];
}

export function NavigationBar({ categories }: NavigationBarProps) {
  return (
    <Box className={classes.navLayer}>
      <Container size="xl">
        <Group className={classes.navInner}>
          <NavigationMenu categories={categories ?? []} />
        </Group>
      </Container>
    </Box>
  );
}
