/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5',
          dark: '#4338CA',
          light: '#EEF2FF',
        },
        secondary: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        surface: '#FFFFFF',
        'bg-gray': '#F9FAFB',
        'text-dark': '#111827',
        'text-gray': '#6B7280',
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'card': '8px',
        'btn': '12px',
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0,0,0,0.1)',
        'card': '0 4px 6px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}