module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        'xs': '500px'
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))'
      },
      colors: {
        'very-light-pink': '#EDECED',
        'light-grey': '#E8E3E7'
      },
      fontSize: {
        'xxs': '.50rem'
      }
    },
  },
  plugins: [],
}
