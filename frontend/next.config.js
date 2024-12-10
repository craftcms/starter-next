/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_CRAFT_URL || 'api.starter-next.ddev.site',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
    CRAFT_URL: process.env.NEXT_PUBLIC_CRAFT_URL,
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    GRAPHQL_TOKEN: process.env.NEXT_PUBLIC_CRAFT_API_TOKEN
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
