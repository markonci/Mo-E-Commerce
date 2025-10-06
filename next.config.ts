import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/Route-Academy-products/**", // ممكن تسيبها "/**" لو عايز تسمح بكل الصور
      },
    ],
  },
};

export default nextConfig;
