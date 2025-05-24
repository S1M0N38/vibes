export default function About() {
  return (
    <main>
      <section className="hero">
        <div className="container">
          <h1>About Vibes</h1>
          <p>Discover the story behind the good vibes movement</p>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Our Mission</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.8' }}>
              At Vibes, we believe that positive energy is contagious. Our mission is to create
              a digital space where people can come together, share inspiration, and spread
              good vibes throughout the world.
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.8' }}>
              We're not just a website; we're a community of dreamers, creators, and positive
              thinkers who believe that small acts of kindness and positivity can change the world.
            </p>
          </div>

          <div className="features-grid" style={{ marginTop: '4rem' }}>
            <div className="feature-card">
              <h3>🎯 Vision</h3>
              <p>
                To create a world where positive energy flows freely, connecting hearts
                and minds across all boundaries.
              </p>
            </div>
            <div className="feature-card">
              <h3>💎 Values</h3>
              <p>
                Authenticity, kindness, creativity, and the belief that everyone has
                the power to make a positive impact.
              </p>
            </div>
            <div className="feature-card">
              <h3>🚀 Future</h3>
              <p>
                Building a global network of positive change-makers who inspire
                and support each other every day.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a href="/" className="cta-button">
              Back to Home
            </a>
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