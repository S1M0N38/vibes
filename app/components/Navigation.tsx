'use client'

import Link from 'next/link'

export default function Navigation() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '1rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      // PWA safe area support
      paddingTop: 'max(1rem, env(safe-area-inset-top))',
      paddingLeft: 'env(safe-area-inset-left)',
      paddingRight: 'env(safe-area-inset-right)',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none',
          // Touch optimization
          minHeight: '44px',
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}>
          Vibes ✨
        </Link>
        <div style={{
          display: 'flex',
          gap: '1rem' // Reduced gap for mobile
        }}>
          <Link href="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            // Touch optimization
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 16px',
            borderRadius: '20px',
            userSelect: 'none',
          }}>
            Home
          </Link>
          <Link href="/about" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            // Touch optimization
            minHeight: '44px',
            minWidth: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 16px',
            borderRadius: '20px',
            userSelect: 'none',
          }}>
            About
          </Link>
        </div>
      </div>
    </nav>
  )
} 