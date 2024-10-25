/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['framer-motion'],
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "fs": false,
        "path": false,
      };
      return config;
    },
  };
  
  export default nextConfig;