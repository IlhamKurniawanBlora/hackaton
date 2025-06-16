// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary-green': '#28A745',
        'accent-green': '#4CAF50',
        'light-green': '#D4EDDA',
        'dark-blue': '#1F2937',
        'light-blue': '#E0F2F7',
        'gray-text': '#4A5568',
        'lighter-gray': '#F7FAFC',
      },
      // Tambahkan atau sesuaikan border radius
      borderRadius: {
        'xl': '1rem', // Misalnya, radius xl lebih besar
        '2xl': '1.5rem',
        '3xl': '2rem',
        'full': '9999px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}