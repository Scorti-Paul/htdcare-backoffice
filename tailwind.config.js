/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.875rem",
        sm: "1rem",
        base: "1.125rem",
        xl: "1.375rem",
        "2xl": "1.5rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      colors: {
        primary: {
          100: "#d8dff9",
          200: "#b1bff4",
          300: "#89a0ee",
          400: "#6280e9",
          500: "#3b60e3",
          600: "#2f4db6",
          700: "#233a88",
          800: "#18265b",
          900: "#0c132d",
        },
        secondary: {
          100: "#d5fce7",
          200: "#abf9cf",
          300: "#82f7b8",
          400: "#58f4a0",
          500: "#2ef188",
          600: "#25c16d",
          700: "#1c9152",
          800: "#126036",
          900: "#09301b",
        },
        darkBlue: "#333E64",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
});
