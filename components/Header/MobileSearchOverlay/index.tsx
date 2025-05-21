// components/Header/MobileSearchOverlay.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Overlay, TextInput, ActionIcon, Box } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import classes from '../styles.module.css';

interface MobileSearchOverlayProps {
  opened: boolean;
  onClose: () => void;
}

export function MobileSearchOverlay({ opened, onClose }: MobileSearchOverlayProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when the overlay opens
  useEffect(() => {
    if (opened && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [opened]);
  
  // Handle search form submission
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement search functionality
    console.log('Search submitted:', searchQuery);
    onClose();
  };
  
  if (!opened) return null;
  
  return (
    <Box className={classes.searchOverlay}>
      <Overlay opacity={0.85} color="#000" zIndex={100} onClick={onClose} />
      <Box className={classes.searchOverlayInner}>
        <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '600px' }}>
          <TextInput
            placeholder="Search Drainage Connect"
            size="md"
            ref={searchInputRef}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            rightSection={
              <ActionIcon onClick={onClose} variant="transparent" aria-label="Close search">
                <IconX size={18} />
              </ActionIcon>
            }
            leftSection={<IconSearch size={18} />}
            styles={{
              input: { fontSize: '16px' }, // Prevents zoom on iOS
              root: { width: '100%' }
            }}
          />
        </form>
      </Box>
    </Box>
  );
}