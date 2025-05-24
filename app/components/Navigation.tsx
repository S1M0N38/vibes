'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { triggerHaptic } from './HapticFeedback'

export default function Navigation() {
  const pathname = usePathname()

  const handleNavClick = (path: string) => {
    triggerHaptic('light')
  }

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      padding: '0.8rem 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      paddingTop: 'calc(0.8rem + env(safe-area-inset-top, 0px))',
      paddingLeft: 'calc(0.8rem + env(safe-area-inset-left, 0px))',
      paddingRight: 'calc(0.8rem + env(safe-area-inset-right, 0px))',
      transition: 'all 0.1s ease-out',
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
      }}>
        <Link 
          href="/" 
          onClick={() => handleNavClick('/')}
          style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            color: 'white',
            textDecoration: 'none',
            minHeight: '44px',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            padding: '6px 10px',
            borderRadius: '10px',
            transition: 'all 0.1s ease-out',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          Vibes ✨
        </Link>
        <div style={{
          display: 'flex',
          gap: '0.3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '3px',
          backdropFilter: 'blur(10px)',
        }}>
          <Link 
            href="/" 
            onClick={() => handleNavClick('/')}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.1s ease-out',
              minHeight: '40px',
              minWidth: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 14px',
              borderRadius: '16px',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              background: pathname === '/' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              transform: pathname === '/' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: pathname === '/' ? '0 1px 4px rgba(0, 0, 0, 0.1)' : 'none',
              fontSize: '0.9rem',
            }}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            onClick={() => handleNavClick('/about')}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              transition: 'all 0.1s ease-out',
              minHeight: '40px',
              minWidth: '55px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px 14px',
              borderRadius: '16px',
              userSelect: 'none',
              WebkitTapHighlightColor: 'transparent',
              background: pathname === '/about' ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
              transform: pathname === '/about' ? 'scale(1.02)' : 'scale(1)',
              boxShadow: pathname === '/about' ? '0 1px 4px rgba(0, 0, 0, 0.1)' : 'none',
              fontSize: '0.9rem',
            }}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
} 