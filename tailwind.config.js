/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(180deg, #693d7a, #b085bd9c 50%, #693d7a)',
        'gradient-custom-2':
          'linear-gradient(180deg, #ab78bb, #b085bd 61%, #ab78bb)',
      },
    },
  },
  plugins: [],
};
