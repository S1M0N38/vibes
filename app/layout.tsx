import type { Metadata } from 'next'
import Navigation from './components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vibes - Feel the Energy',
  description: 'A simple and beautiful website showcasing good vibes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <div style={{ paddingTop: '80px' }}>
          {children}
        </div>
      </body>
    </html>
  )
} 