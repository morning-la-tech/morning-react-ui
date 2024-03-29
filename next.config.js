/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    serverMinification: false,
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    domains: ['cdn.morning.fr'],
  },
};

module.exports = nextConfig;
