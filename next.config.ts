import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        port: '',
        pathname: '/**', // ده يغطي كل المسارات، مهما كان عدد المجلدات
      },
    ],
  },
};

export default nextConfig;
