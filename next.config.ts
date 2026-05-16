import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/UniMate',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
