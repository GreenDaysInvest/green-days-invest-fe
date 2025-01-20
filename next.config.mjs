import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'gruenebluete.de',
            port: '',
            pathname: '/cdn/shop/files/**',
          },
        ],
    },
};
 
export default withNextIntl(nextConfig);