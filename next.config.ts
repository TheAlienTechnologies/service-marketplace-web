import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a self-contained server build (.next/standalone/server.js) for Docker.
  output: "standalone",
  // Don't fail the production build on lint errors — run lint in CI/dev instead.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pavodahdb.s3.us-east-1.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
