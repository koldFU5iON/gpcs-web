import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx"],
  experimental: {
    outputFileTracingRoot: path.join(__dirname),
  },
};

export default nextConfig;
