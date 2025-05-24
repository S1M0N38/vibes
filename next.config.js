const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Only use basePath and assetPrefix for GitHub Pages deployment
  // For local testing, these should be empty
  basePath: process.env.GITHUB_PAGES === 'true' ? '/vibes' : '',
  assetPrefix: process.env.GITHUB_PAGES === 'true' ? '/vibes/' : '',
}

module.exports = withPWA(nextConfig) 