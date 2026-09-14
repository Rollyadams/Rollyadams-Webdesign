/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'serif'],
      },
      colors: {
        ink: '#15130F',
        paper: '#F4F1E8',
        gold: {
          DEFAULT: '#B8842E',
          dark: '#93691F',
        },
        moss: '#2F5B47',
        line: '#DCD5C2',
        muted: '#6B6455',
      },
    },
  },
  plugins: [],
}
