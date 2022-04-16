/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'storage.googleapis.com', 'lh3.googleusercontent.com'],
  },
  env: {
    AUTH0_BASE_URL: 'https://dev-5656765a.us.auth0.com',
  },
};

module.exports = nextConfig;
