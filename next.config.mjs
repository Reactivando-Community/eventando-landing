/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Configurações para AWS Amplify
  output: 'standalone',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
