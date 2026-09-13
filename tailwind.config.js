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
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        ink: '#0F172A',
        muted: '#475569',
        surface: '#F8FAFC',
      },
    },
  },
  plugins: [],
}