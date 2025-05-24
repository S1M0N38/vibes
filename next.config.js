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
    disable: process.env.NODE_ENV === 'development',
    register: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
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