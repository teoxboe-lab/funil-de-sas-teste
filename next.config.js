/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  serverExternalPackages: ['@prisma/client', 'prisma'],
}
module.exports = nextConfig
