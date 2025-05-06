import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { AuthProvider } from '@/components/Header/AuthProvider';
import { Header } from '@/components/Header/Header';
import { headerCategories } from '@/lib/actions/categories/headerCategories';

export const metadata = {
  title: 'Drainage Connect',
  description: 'Your one-stop shop for drainage solutions',
};

export default async function RootLayout({ children }: { children: any }) {
  const categories = await headerCategories();
  
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
            <Header categories={categories} />
            {children}
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
