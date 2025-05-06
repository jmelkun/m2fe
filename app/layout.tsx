import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { AuthProvider } from '@/components/Header/AuthProvider';
import { Header } from '@/components/Header/Header';
import { getCategories } from './actions/categories';
import { NavigationProvider } from '@/components/Header/NavigationProvider';

export const metadata = {
  title: 'Drainage Connect',
  description: 'Your one-stop shop for drainage solutions',
};

export default async function RootLayout({ children }: { children: any }) {
  // Fetch categories on the server
  const categories = await getCategories();
  
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AuthProvider>
            <NavigationProvider initialCategories={categories}>
              <Header />
              {children}
            </NavigationProvider>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
