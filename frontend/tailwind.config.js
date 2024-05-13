/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom color here
        customColor: '#4f4f52',
        otherColor: '#202642',
        disabledColor:'#717175'
      },
      fontFamily: {
        // Add Montserrat to the font family list
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

