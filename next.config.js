require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'loremflickr.com', 'picsum.photos', 'example.com', 'dummyimage.com'],
  },
};

module.exports = nextConfig;
