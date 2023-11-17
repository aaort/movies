/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  env: {
    appUrl: process.env.APP_URL,
    apiReadAccessKey: process.env.API_READ_ACCESS_KEY,
    apiKey: process.env.API_KEY,
    apiBaseUrl: process.env.API_BASE_URL,
    baseUrl: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.themoviedb.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
