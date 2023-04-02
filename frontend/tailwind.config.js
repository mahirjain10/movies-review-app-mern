/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        primary:'#171717',
        secondary:'#272727',
        lightWhite:"rgba(255, 255, 255, 0.5)",
        lightBlack:'rgba(39,39,39,0.5)',
        red:"#FF0000"
      },
      fontFamily:{
        "poppins":['Poppins','sans-serif'],
      }
    },
  },
  plugins: [],
}