require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'loremflickr.com',
      'picsum.photos',
      'example.com',
      'dummyimage.com',
      'storage.googleapis.com',
      'images.unsplash.com',
      'fastly.picsum.photos',
      'loremflickr.com',
      'plus.unsplash.com',
      'assets.zeczec.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
