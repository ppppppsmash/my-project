/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
    serverComponentsExternalPackages: ['mysql2', '@tremor/react'],
    outputStandalone: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', 'ca.slack-edge.com']
  },
}

module.exports = nextConfig
