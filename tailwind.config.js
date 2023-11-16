const colors = require('tailwindcss/colors');
/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: colors.slate,
      red: colors.red,
      transparent: 'transparent',
      current: 'currentColor',
      'tmdb-blue': '#01b4e4',
      'tmdb-green': '#90cea1',
    },
    borderColor: { primary: colors.slate },
    extend: {
      fontSize: {
        base: '1.1rem',
      },
      fontFamily: {
        helvetica: ['helvetica', 'system-ui'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
