/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content:  [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Nunito', ...defaultTheme.fontFamily.sans],
        'framer': ['"Instrument Serif"', '"Instrument Serif Placeholder"', 'serif'],
      },
      colors: {
        'theme-dark': 'rgb(0, 0, 0)',
        'theme-white': 'rgb(255, 255, 255)',
        'theme-white-2': 'rgba(255, 255, 255, .7)',
        'theme-white-3': 'rgba(255, 255, 255, .08)',
        'theme-black-2': 'rgb(8, 8, 8)',
        'theme-dark-1': 'rgb(13, 13, 13)',
        'theme-dark-2': 'rgb(23, 23, 23)',
        'theme-blue-1': 'rgb(0, 85, 255)',
        'theme-main-pink':'rgb(236, 15, 61)',
      },
    },
  },
  plugins: [],
}

