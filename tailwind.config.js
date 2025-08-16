/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[class="p-dark"]'],
  content: [
    "./src/**/*.{html,ts,scss,css}",
  ],
  theme: {
    screens: {
      'max-991': { 'max': '991px' },
      xs: '320px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1920px'
    }
  },
}



