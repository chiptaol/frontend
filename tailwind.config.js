/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
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
        sliderContent: 'linear-gradient(180deg, rgba(28, 32, 42, 0) 8.33%, #161924 100%)',
        backdrop:
          'linear-gradient(177.38deg, #1E1F29 -16.12%, rgba(23, 27, 39, 0) 19.76%), linear-gradient(359.17deg, #1E1F29 2.85%, rgba(23, 27, 39, 0) 81.36%), linear-gradient(90.18deg, rgba(23, 27, 39, 0) 46.06%, #1E1F29 98.93%), linear-gradient(270deg, rgba(23, 27, 39, 0) 53.92%, #1E1F29 95.9%)',
      },
      colors: {
        yellow: {
          500: '#E9E343',
        },
        violet: {
          100: '#817F95',
        },
        blue: {
          100: '#6776DE',
        },
        black: {
          500: '#252932',
        },
        darkBlue: {
          400: '#353441',
          500: '#1E1F29',
          600: '#2A2937',
        },
      },
    },
  },
  plugins: [],
}
