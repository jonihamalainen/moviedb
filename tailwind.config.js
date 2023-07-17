/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{tsx,ts}",
    "./components/**/*.{tsx,ts}"
  ],
  theme: {
    extend:{
      colors:{
        red:{
          600: '#d91d25'
        }
      },
      width: {
      'paluunappiDesktop' : '23.25rem'
    },
    fontFamily: {
      RobotoC : ["'Roboto Condensed'", "sans-serif"]
    }
  },
  },
  plugins: [require("daisyui")],
}

