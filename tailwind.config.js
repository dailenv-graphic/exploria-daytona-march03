/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#eef7fb',
          100: '#d4ecf5',
          200: '#a8d8eb',
          300: '#6bbcd9',
          400: '#3a9dc4',
          500: '#1e7ea8',
          600: '#1A6489',
          700: '#15516f',
          800: '#103d54',
          900: '#0c2d3f',
        },
        ice: {
          100: '#d4f0ee',
          200: '#a8e0dc',
          300: '#6dccc7',
          400: '#41b8b2',
          500: '#35a29c',
          600: '#2a8a85',
          700: '#227470',
          900: '#1a5753',
          950: '#0f3633',
        },
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
