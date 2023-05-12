/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1CA69A',
        },
        secondary: {
          10: '#EDEDED',
          30: '#C8C8C8',
          50: '#A3A3A3',
          66: '#868686',
          DEFAULT: '#484848',
        },
        gray: {
          light: '#F5F5F8',
          dark: '#D4D4D7',
        },
        green: {
          accent: {
            10: '#EBFCFA',
            DEFAULT: '#37DDC9',
          },
        },
        yellow: {
          accent: '#FF9D21',
        },
        white: {
          87: 'rgba(255, 255, 255, 0.87)',
          DEFAULT: '#FFFFFF',
        },
        error: '#E44461',
      },
    },
  },
  plugins: [],
};
