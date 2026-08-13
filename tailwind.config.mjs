/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ide: {
          bg: '#000000',
          card: 'rgba(0, 18, 8, 0.65)',
          border: 'rgba(0, 255, 102, 0.35)',
          accent: '#00ff66',
          text: '#e0ffe8',
        },
        cinema: {
          bg: '#080807',
          surface: '#171512',
          border: '#4b463e',
          text: '#e9e4d8',
          muted: '#9f9a90',
          accent: '#a9332b',
          accentBright: '#c8473d',
          cream: '#d0c6b2',
          ink: '#17130f',
        },
      },
    },
  },
  plugins: [],
};
