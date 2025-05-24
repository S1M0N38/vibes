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
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <a href="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none'
        }}>
          Vibes ✨
        </a>
        <div style={{
          display: 'flex',
          gap: '2rem'
        }}>
          <a href="/" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'opacity 0.3s ease'
          }}>
            Home
          </a>
          <a href="/about/" style={{
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'opacity 0.3s ease'
          }}>
            About
          </a>
        </div>
      </div>
    </nav>
  )
} 