/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['cdn.morning.fr'],
  },
};

module.exports = nextConfig;
