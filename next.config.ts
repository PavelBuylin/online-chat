import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	allowedDevOrigins: ['192.168.1.99:3000', '192.168.1.99'],
	reactStrictMode: true
}

export default nextConfig
