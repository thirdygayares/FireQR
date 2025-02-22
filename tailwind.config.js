/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}" // Add this line
  ],
  presets: [require("nativewind/preset")],
  theme: {},
  plugins: [],
};
