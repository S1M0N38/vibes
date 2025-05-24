import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>Welcome to Vibes</h1>
          <p>Feel the energy, embrace the moment, share the vibes</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#features" className="cta-button">
              Explore the Vibes
            </a>
            <Link href="/about" className="cta-button">
              Learn About Us
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2>Good Vibes Only</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🌟 Positive Energy</h3>
              <p>
                Surround yourself with positivity and watch how it transforms
                your daily experience. Every moment is a chance to create
                beautiful memories.
              </p>
            </div>
            <div className="feature-card">
              <h3>🎵 Music & Rhythm</h3>
              <p>
                Let the rhythm guide you through life. Music has the power to
                heal, inspire, and bring people together in perfect harmony.
              </p>
            </div>
            <div className="feature-card">
              <h3>🌈 Colorful Life</h3>
              <p>
                Life is meant to be lived in full color. Embrace diversity,
                celebrate differences, and paint your world with vibrant
                experiences.
              </p>
            </div>
            <div className="feature-card">
              <h3>🤝 Community</h3>
              <p>
                Together we're stronger. Build meaningful connections, support
                each other, and create a community that lifts everyone up.
              </p>
            </div>
            <div className="feature-card">
              <h3>🌱 Growth</h3>
              <p>
                Never stop growing and learning. Every challenge is an
                opportunity to become a better version of yourself.
              </p>
            </div>
            <div className="feature-card">
              <h3>✨ Inspiration</h3>
              <p>
                Be the spark that ignites positive change. Your energy and
                passion can inspire others to pursue their dreams.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Vibes. Spreading good energy everywhere. 🌟</p>
        </div>
      </footer>
    </main>
  )
} 