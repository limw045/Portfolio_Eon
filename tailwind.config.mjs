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
      },
    },
  },
  plugins: [],
};
