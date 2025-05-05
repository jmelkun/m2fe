'use client';

import { MantineProvider } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { AuthProvider } from '@/components/Header/AuthProvider';
import { theme } from '@/theme';

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AuthProvider>
        <Header />
        <main>{children}</main>
      </AuthProvider>
    </MantineProvider>
  );
}
