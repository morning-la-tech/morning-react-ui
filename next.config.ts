import { NextConfig } from 'next';

const nextConfig: NextConfig = {
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
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  sassOptions: {
    additionalData: `$cdn-url: '${process.env.NEXT_PUBLIC_MORNING_CDN_URL}';`,
  },
};

export default nextConfig;
