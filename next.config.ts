import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn1.matadornetwork.com",
        // pathname: '/**', // opcional, para permitir todos los paths
      },
      // otros dominios que uses para imágenes
    ],
  },
};

export default nextConfig;
