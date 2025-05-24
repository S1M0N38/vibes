/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
}

// Only apply PWA when not doing static export (GitHub Pages)
const isStaticExport = process.env.BUILD_STATIC || process.env.GITHUB_ACTIONS

if (!isStaticExport) {
  // Development and local production with PWA
  const withPWA = require('next-pwa')({
    dest: 'public',
    disable: false, // Enable PWA in development for native app testing
    register: true,
    skipWaiting: true,
    sw: '/sw.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'pages-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 24 * 60 * 60, // 24 hours
          },
        },
      },
      {
        urlPattern: /\.(js|css|html)$/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        urlPattern: /\.(png|jpg|jpeg|svg|gif|webp|avif)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
  })
  
  module.exports = withPWA(nextConfig)
} else {
  // For static export (GitHub Pages)
  // Based on insights from https://github.com/codepo8/github-page-pwa
  const isGitHubPages = process.env.GITHUB_ACTIONS
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'vibes'
  
  module.exports = {
    ...nextConfig,
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
    // Configure base path for GitHub Pages if needed
    ...(isGitHubPages && {
      basePath: `/${repoName}`,
      assetPrefix: `/${repoName}/`,
    }),
  }
} 