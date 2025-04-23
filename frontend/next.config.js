/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.CRAFT_DOMAIN],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CRAFT_DOMAIN,
        pathname: '/uploads/**',
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
  compress: true,
  logging: process.env.NODE_ENV === 'development' ? {
    fetches: {
      fullUrl: true,
    },
  } : undefined,
  turbopack: {
    rules: {
      '*.css': ['style-loader', 'css-loader']
    }
  }
}

module.exports = nextConfig
