/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        custom: '#b591c0',
        'custom-2': '#b085bd',
        'custom-3': '#ab78bb',
        'custom-4': '#693d7a',
      },
      backgroundImage: {
        'gradient-custom':
          'linear-gradient(180deg, #693d7a, #b085bd9c 50%, #693d7a)',
        'gradient-custom-2':
          'linear-gradient(180deg, #ab78bb, #b085bd 61%, #ab78bb)',
        'gradient-custom-3':
          'linear-gradient(0deg, #693d7acc, #693d7a, #693d7acc)',
        'gradient-custom-4':
          'linear-gradient(0deg, #b085bd, #b085bd9c, #b085bd)',
        landing:
          '"url(https://static.wixstatic.com/media/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg/v1/fill/w_1419,h_485,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/8d96af_23eb09f032ec4ee68e39e861a5a66412~mv2.jpg)"',
      },
    },
  },
  plugins: [],
};
