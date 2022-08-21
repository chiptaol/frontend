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
      backgroundImage: {
        header:
          'linear-gradient(288.85deg, rgba(23, 27, 39, 0) 55.87%, rgba(30, 31, 41, 0.77) 90.43%), linear-gradient(359.17deg, #1E1F29 2.85%, rgba(23, 27, 39, 0) 81.36%)',
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
