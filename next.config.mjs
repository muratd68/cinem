/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize packages
  transpilePackages: ['primereact', 'primeicons'],

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['primereact', 'lucide-react'],
  },
}

export default nextConfig
