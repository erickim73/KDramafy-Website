/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ["Manrope", "Montserrat", "sans-serif"],
            montserrat: ["Montserrat", "sans-serif"],
        },
        animation: {
            rotate: 'rotate 8s linear infinite',
          },
        keyframes: {
            rotate: {
              '0%': { transform: 'rotate(0deg) scale(10)' },
              '100%': { transform: 'rotate(-360deg) scale(10)' },
            },
        },
    },
  },
  plugins: [],
}