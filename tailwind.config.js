/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Inter"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"Inter"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['monospace'],
      },
      colors: {
        yellow: {
          500: '#E9E343',
        },
      },
    },
  },
  plugins: [],
}
