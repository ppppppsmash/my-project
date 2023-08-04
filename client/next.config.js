/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['mysql2', '@tremor/react'],
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh']
  },
}

module.exports = nextConfig
