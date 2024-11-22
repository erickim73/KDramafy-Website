/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        height: {
            '98': '24.5rem',
        },
        fontFamily: {
            sans: ["Manrope", "Montserrat", "sans-serif"],
            montserrat: ["Montserrat", "sans-serif"],
        },
    },
  },
  plugins: [],
}