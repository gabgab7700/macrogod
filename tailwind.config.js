/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#a855f7', // A mystical purple
        secondary: '#374151', // A dark gray
        neutral: '#e5e7eb', // A light gray
        dark: '#111827', // A darker gray
        textPrimary: '#d1d5db', // Light text
        textSecondary: '#9ca3af', // Lighter text
        glow: 'rgba(168, 85, 247, 0.3)', // Glow color
      },
      fontFamily: {
        'sans': ['"Exo 2"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px -5px theme("colors.glow")',
        'soft': '0 2px 5px rgba(0, 0, 0, 0.1)',
      },
      textShadow: {
        'sm': '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'rotate(-45deg) translate(-500px, 0)' },
          '100%': { transform: 'rotate(45deg) translate(500px, 0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}
