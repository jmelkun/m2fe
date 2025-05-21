// components/Header/CartDrawer.tsx
'use client';

import { 
  Drawer, 
  Stack, 
  Text, 
  Group, 
  Button, 
  Image, 
  NumberInput,
  ActionIcon,
  Divider,
  Box
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useAuth } from '@/hooks/useAuth';
import classes from './CartDrawer.module.css';

interface CartDrawerProps {
  opened: boolean;
  onClose: () => void;
}

export function CartDrawer({ opened, onClose }: CartDrawerProps) {
  // Get cart data from our auth hook
  const { cartItems = [], updateCartItem, removeCartItem } = useAuth();
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 10 : 0; // Example shipping calculation
  const tax = subtotal * 0.08; // Example tax calculation
  const total = subtotal + shipping + tax;
  
  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Your Cart"
      padding="md"
      size="md"
      position="right"
      className={classes.cartDrawer}
    >
      <Stack h="100%" justify="space-between">
        <Stack gap="md">
          {cartItems.length === 0 ? (
            <Text ta="center" py="xl">Your cart is empty</Text>
          ) : (
            cartItems.map((item) => (
              <Box key={item.id} className={classes.cartItemContainer}>
                <Group wrap="nowrap" align="flex-start">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    fit="contain"
                    fallbackSrc="/placeholder-product.svg"
                    className={classes.cartItemImage}
                  />
                  
                  <Stack gap="xs" className={classes.cartItemDetails}>
                    <Text size="sm" className={classes.cartItemName}>{item.name}</Text>
                    <Text size="sm" c="dimmed" className={classes.cartItemPrice}>${item.price.toFixed(2)}</Text>
                    
                    <Group>
                      <NumberInput
                        value={item.quantity}
                        onChange={(value) => updateCartItem(item.id, Number(value))}
                        min={1}
                        max={99}
                        className={classes.cartItemQuantity}
                        size="xs"
                      />
                      
                      <ActionIcon
                        color="red"
                        variant="subtle"
                        onClick={() => removeCartItem(item.id)}
                        aria-label="Remove item"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Stack>
                  
                  <Text className={classes.cartItemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </Group>
                <Divider my="sm" />
              </Box>
            ))
          )}
        </Stack>
        
        {cartItems.length > 0 && (
          <Stack gap="md" className={classes.cartSummary}>
            <Stack gap="xs">
              <Group justify="space-between">
                <Text size="sm">Subtotal</Text>
                <Text size="sm">${subtotal.toFixed(2)}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Shipping</Text>
                <Text size="sm">${shipping.toFixed(2)}</Text>
              </Group>
              
              <Group justify="space-between">
                <Text size="sm">Tax</Text>
                <Text size="sm">${tax.toFixed(2)}</Text>
              </Group>
              
              <Divider my="xs" />
              
              <Group justify="space-between">
                <Text className={classes.cartTotal}>Total</Text>
                <Text className={classes.cartTotal}>${total.toFixed(2)}</Text>
              </Group>
            </Stack>
            
            <Button
              size="lg"
              fullWidth
              onClick={() => {
                console.log('Proceeding to checkout');
                // Navigate to checkout page
                window.location.href = '/checkout';
              }}
            >
              Proceed to Checkout
            </Button>
            
            <Button variant="subtle" fullWidth onClick={onClose}>
              Continue Shopping
            </Button>
          </Stack>
        )}
      </Stack>
    </Drawer>
  );
}
