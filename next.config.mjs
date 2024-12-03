/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.pokeapi.co',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;