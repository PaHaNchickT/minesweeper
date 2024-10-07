import { nextui } from '@nextui-org/react';
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        steam: {
          '0%, 100%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '400% 0%' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      layout: {},
      themes: {
        light: {
          layout: {},
          colors: {
            background: 'white',
            primary: {
              DEFAULT: '#f6ad34',
            },
          },
        },
        dark: {
          layout: {},
          colors: {
            background: 'white',
            primary: {
              DEFAULT: '#f6ad34',
            },
          },
        },
      },
    }),
  ],
};
