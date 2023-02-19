/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [["next-superjson-plugin", {}]],
	},
	reactStrictMode: true,
}

module.exports = nextConfig

