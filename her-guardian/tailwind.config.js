/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: "#e91e8c",
          dark: "#b01068",
          light: "#fce4ec",
        },
      },
    },
  },
  plugins: [],
}