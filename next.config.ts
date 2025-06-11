import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-1b6611ed726848ab9429e4d885b9bd05.r2.dev",
      },
    ],
  },
};

export default nextConfig;
