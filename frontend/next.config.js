/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CRAFT_DOMAIN,
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: process.env.CRAFT_DOMAIN,
        pathname: '/**',
      }
    ]
  },
  env: {
    SITE_NAME: process.env.SITE_NAME,
    CRAFT_URL: process.env.CRAFT_URL,
    BASE_URL: process.env.BASE_URL,
    GRAPHQL_TOKEN: process.env.GRAPHQL_TOKEN
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
