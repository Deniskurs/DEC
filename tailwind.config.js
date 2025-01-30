/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rich-blue': {
          50: '#E6F0FF',
          100: '#CCE0FF',
          200: '#99C2FF',
          300: '#66A3FF',
          400: '#3385FF',
          500: '#0066FF',
          600: '#0052CC',
          700: '#003D99',
          800: '#002966',
          900: '#001433',
        },
        'cream': {
          50: '#fcf9f0',
          100: '#f7f3e3',
          200: '#f2ecd6',
          300: '#ede6c9',
          400: '#e8dfbc',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "infinite-scroll-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        }
      },
      animation: {
        "infinite-scroll": "infinite-scroll var(--animation-duration) linear infinite",
        "infinite-scroll-reverse": "infinite-scroll-reverse var(--animation-duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};