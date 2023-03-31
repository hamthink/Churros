/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts, tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cooper: ["cooper-black-std", "serif"],
      },
      spacing: {
        "10vh": "10vh",
        "10%": "10%",
        "20%": "20%",
        "25%": "25%",
        "128": "28rem",
        "108px": "108px",
        "1080px": "1080px",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};