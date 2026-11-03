import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/map",
        destination: "/events",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
