/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      custom: '#b591c0',
      'custom-2': '#b085bd',
      'custom-3': '#ab78bb',
      'custom-4': '#693d7a',
    },
    extend: {
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(180deg, #693d7a, #b085bd9c 50%, #693d7a)',
        'gradient-custom-2':
          'linear-gradient(180deg, #ab78bb, #b085bd 61%, #ab78bb)',
        'gradient-custom-3':
          'linear-gradient(0deg, #693d7acc, #693d7a, #693d7acc)',
        'gradient-custom-4':
          'linear-gradient(0deg, #b085bd, #b085bd9c, #b085bd)',
      },
    },
  },
  plugins: [],
};
