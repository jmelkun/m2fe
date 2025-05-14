import '@mantine/core/styles.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { theme } from '../theme';
import { Header } from '@/components/Header/Header';
import { headerCategories } from '@/lib/actions/categories/HeaderCategories';

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
            <Header categories={categories} />
            {children}
        </MantineProvider>
      </body>
    </html>
  );
}
