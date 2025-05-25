/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/vibes',
  assetPrefix: '/vibes/',
}

module.exports = nextConfig 