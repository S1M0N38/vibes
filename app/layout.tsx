import type { Metadata, Viewport } from 'next'
import Navigation from './components/Navigation'
import InstallPrompt from './components/InstallPrompt'
import TouchGestures from './components/TouchGestures'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vibes - Feel the Energy',
  description: 'A simple and beautiful website showcasing good vibes',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vibes',
  },
  icons: {
    icon: '/icons/icon-192x192.svg',
    apple: '/icons/icon-192x192.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#4F46E5',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5, // Allow some zoom for accessibility
  userScalable: true, // Allow zoom for accessibility
  viewportFit: 'cover',
  colorScheme: 'light dark', // Support both light and dark themes
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content="Vibes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vibes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href="/icons/icon-152x152.svg" />
        <link rel="icon" type="image/svg+xml" href="/icons/icon-192x192.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/icons/icon-192x192.svg" />
      </head>
      <body>
        <TouchGestures />
        <Navigation />
        <div style={{ paddingTop: '80px' }}>
          {children}
        </div>
        <InstallPrompt />
      </body>
    </html>
  )
} 