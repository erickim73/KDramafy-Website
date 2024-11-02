/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            sans: ["Manrope", "Montserrat", "sans-serif"],
            montserrat: ["Montserrat", "sans-serif"],
        },
    },
  },
  plugins: [],
}