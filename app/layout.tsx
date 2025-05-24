import type { Metadata, Viewport } from 'next'
import Navigation from './components/Navigation'
import InstallPrompt from './components/InstallPrompt'
import TouchGestures from './components/TouchGestures'
import './globals.css'

// Conditional manifest path for GitHub Pages
const manifestPath = process.env.GITHUB_PAGES === 'true' ? '/vibes/manifest.json' : '/manifest.json'
const iconBasePath = process.env.GITHUB_PAGES === 'true' ? '/vibes' : ''

export const metadata: Metadata = {
  title: 'Vibes - Feel the Energy',
  description: 'A simple and beautiful website showcasing good vibes',
  // Only include manifest for non-GitHub Pages builds
  ...(process.env.GITHUB_PAGES !== 'true' && { manifest: manifestPath }),
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vibes',
  },
  icons: {
    icon: `${iconBasePath}/icons/icon-192x192.svg`,
    apple: `${iconBasePath}/icons/icon-192x192.svg`,
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
        <meta name="msapplication-config" content={`${iconBasePath}/icons/browserconfig.xml`} />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        <link rel="apple-touch-icon" href={`${iconBasePath}/icons/icon-152x152.svg`} />
        <link rel="icon" type="image/svg+xml" href={`${iconBasePath}/icons/icon-192x192.svg`} />
        {/* Only include manifest link for non-GitHub Pages builds */}
        {process.env.GITHUB_PAGES !== 'true' && (
          <link rel="manifest" href={manifestPath} />
        )}
        <link rel="shortcut icon" href={`${iconBasePath}/icons/icon-192x192.svg`} />
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