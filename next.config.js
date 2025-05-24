/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use basePath and assetPrefix for GitHub Pages deployment
  basePath: process.env.GITHUB_PAGES === 'true' ? '/vibes' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/vibes/' : '',
  // Disable PWA for static export builds (GitHub Pages)
  experimental: {
    // This helps with static export compatibility
    esmExternals: false,
  },
}

// Only apply PWA configuration for development and non-static builds
if (process.env.NODE_ENV === 'development' || process.env.GITHUB_PAGES !== 'true') {
  const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    // Disable PWA for static export
    buildExcludes: [/middleware-manifest\.json$/],
  })
  
  module.exports = withPWA(nextConfig)
} else {
  // For GitHub Pages static export, use config without PWA
  module.exports = nextConfig
} 