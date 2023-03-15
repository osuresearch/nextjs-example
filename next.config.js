/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  compiler: {
    styledComponents: true,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
