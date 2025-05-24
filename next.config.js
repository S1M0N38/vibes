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
  const baseConfig = {
    ...nextConfig,
    output: 'export',
    trailingSlash: true,
    distDir: 'out',
    env: {
      NEXT_PUBLIC_BASE_PATH: isGitHubPages ? `/${repoName}` : '',
    },
  }
  
  // Configure base path for GitHub Pages if needed
  if (isGitHubPages) {
    baseConfig.basePath = `/${repoName}`
    baseConfig.assetPrefix = `/${repoName}/`
  }
  
  module.exports = baseConfig
} else {
  module.exports = nextConfig
} 