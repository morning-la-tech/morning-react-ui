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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.morning.fr',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
  sassOptions: {
    additionalData: `$cdn-url: '${process.env.NEXT_PUBLIC_MORNING_CDN_URL}';`,
  },
};

module.exports = nextConfig;
