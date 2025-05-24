/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
}

// For static export (GitHub Pages)
const isGitHubPages = process.env.GITHUB_ACTIONS
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'vibes'

// Configure for static export when needed
if (process.env.BUILD_STATIC || process.env.GITHUB_ACTIONS) {
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
} else {
  module.exports = nextConfig
} 