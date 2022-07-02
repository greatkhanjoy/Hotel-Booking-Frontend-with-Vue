/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    screens: {
      sm: { min: '1px', max: '576px' },
      // => @media (min-width: 576px) { ... }

      md: '578px',
      // => @media (min-width: 960px) { ... }

      lg: '1024px',
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
