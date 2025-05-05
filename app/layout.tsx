import '@mantine/core/styles.css';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Header } from '@/components/Header/Header';
import { AuthProvider } from '@/components/Header/AuthProvider';
import { theme } from '@/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="auto">
          <AuthProvider>
            <Header />
            <main>{children}</main>
          </AuthProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
