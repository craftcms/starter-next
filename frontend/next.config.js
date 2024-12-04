/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CRAFT_HOSTNAME || 'api.starter-next.ddev.site',
        port: '',
        pathname: '/**',
      },
    ],
  },
  env: {
    SITE_NAME: process.env.SITE_NAME || 'Next Starter',
    CRAFT_URL: process.env.CRAFT_URL || 'https://api.starter-next.ddev.site',
    BASE_URL: process.env.BASE_URL || 'https://starter-next.ddev.site'
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
