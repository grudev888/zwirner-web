const {theme} = require('@sanity/demo/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  content: [
    './src/pages/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/plugins/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    extend: {
      colors: {
        'accent-1': '#FAFAFA',
        'accent-2': '#EAEAEA',
        'accent-7': '#333',
        success: '#0070f3',
        cyan: '#79FFE1',
        'blue-500': '#2276FC',
        'yellow-100': '#fef7da',
        black: {
          10: '#F5F5F5',
          20: '#E8E8E8',
          40: '#CDCDCD',
          60: '#757575',
          80: '#4D4D4D',
          100: '#000000',
        },
        red: {
          100: '#C33022',
        },
        green: {
          100: '#3F5A3F',
        },
        white: {
          100: '#FFFFFF',
        },
      },
      spacing: {
        28: '7rem',
      },
      letterSpacing: {
        tighter: '-.04em',
      },
      lineHeight: {
        tight: 1.2,
      },
      fontFamily: {
        sans: [
          'avenir-medium',
          'avenir-medium-italic',
          'avenir-regular',
          'sans-serif',
        ],
      },
      fontSize: {
        xs: ['0.75rem', '1.125rem'],
        sm: ['0.875rem', '1.25rem'],
        md: ['1rem', '1.5rem'],
        lg: ['1.375rem', '1.75rem'],
        xl: ['1.875rem', '2.25rem'],
        xxl: ['2.75rem', '3.25rem'],
        xxxl: ['4.125rem', '4.625rem'],
        '5xl': '2.5rem',
        '6xl': '2.75rem',
        '7xl': '4.5rem',
        '8xl': '6.25rem',
      },
      boxShadow: {
        small: '0 5px 10px rgba(0, 0, 0, 0.12)',
        medium: '0 8px 30px rgba(0, 0, 0, 0.12)',
        drop: '0px 2px 18px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  // TODO check if needed
  plugins: [require('@tailwindcss/typography')],
}
