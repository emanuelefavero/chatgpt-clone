/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xxs: '240px',
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },

    extend: {
      boxShadow: {
        custom: '0 0 7px 3px rgba(11, 11, 13, 0.15)',
      },
      scrollbar: ['rounded-lg'],
      colors: {
        primaryBackground: '#0f1622',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
