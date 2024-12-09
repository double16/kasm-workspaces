/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    name: 'bramblethorn',
    description: 'Workspaces for cybersecurity work.',
    icon: 'logo.jpg',
    listUrl: 'https://double16.github.io/kasm-workspaces/',
    contactUrl: 'https://github.com/double16/kasm-workspaces/issues',
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath: '/kasm-workspaces/1.0',
  trailingSlash: true,
  images: {
    unoptimized: true,
  }
}

module.exports = nextConfig
