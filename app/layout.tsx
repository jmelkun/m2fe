import '@mantine/core/styles.css';
import { ColorSchemeScript } from '@mantine/core';
import { ClientLayout } from './client-layout';

export const metadata = {
  title: 'DrainageConnect',
  description: 'Your drainage solutions marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript defaultColorScheme="auto" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
