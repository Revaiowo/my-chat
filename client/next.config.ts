import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/:path*`,
			},
		];
	},

	/* config options here */
	images: {
		// domains: ["res.cloudinary.com"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
		],
	},

	eslint: {
		// This disables ESLint checking during build
		ignoreDuringBuilds: true,
	},
	typescript: {
		// This allows the build to continue even with TypeScript errors
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
