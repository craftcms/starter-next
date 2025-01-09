/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [process.env.CRAFT_URL],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.CRAFT_URL,
        port: '',
        pathname: '/**'
      }
    ]
  },
  env: {
    // We want variables from the `.env` file to be included in the built app:
    // https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser
    SITE_NAME: process.env.SITE_NAME,
    CRAFT_URL: process.env.CRAFT_URL,
    BASE_URL: process.env.BASE_URL,
    GRAPHQL_TOKEN: process.env.GRAPHQL_TOKEN
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig
