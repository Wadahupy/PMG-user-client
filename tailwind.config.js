/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#175F93",
        secondary: "#FAC8FF",
        tertiary: "#FFE16B",
      },
      fontFamily: {
        quattrocento: ["Quattrocento", "sans-serif"],
        dm_sans: ["DM Sans", "sans"]
      },
      // fontSize: {
      //   'responsive-hours': 'clamp(1rem, 50vw, 2.25rem)',
      // },
    },
  },
  plugins: [],
});

