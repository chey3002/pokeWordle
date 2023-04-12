/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      textShadow: {
        textBlorderBlue: `-3px -3px 0 blue, 
     3px -3px 0 blue, 
    -3px  3px 0 blue,
     3px  3px 0 blue`

      },
      fontFamily: {
        pokeFont: ['Pokemon Solid', 'sans-serif']
      },
      animation: {
        shake: 'shake 0.5s',
        'slow-bounce': 'bounce 3s infinite'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
        }
      }
    }
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value
          })
        },
        { values: theme('textShadow') }
      )
    })
  ]
}
