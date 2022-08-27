/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['page.tsx', 'api.ts'],
  reactStrictMode: false,
  swcMinify: true,
  env: {
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    SERVER_STORAGE_DOMAIN: process.env.SERVER_STORAGE_DOMAIN,
    SERVER_HOSTNAME: process.env.SERVER_HOSTNAME,
  },
  images: {
    domains: [process.env.SERVER_HOSTNAME],
    minimumCacheTTL: 31536000,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
