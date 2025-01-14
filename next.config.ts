import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "geektrust.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**" // Matches all paths under the hostname
      }
    ]
  }
};

export default nextConfig;
