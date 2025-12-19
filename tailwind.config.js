/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'picton-blue': {
          '50': '#f0faff',
          '100': '#e0f5fe',
          '200': '#bae8fd',
          '300': '#7dd5fc',
          '400': '#38bcf8',
          '500': '#0ea5e9', 
          '600': '#028ac7',
          '700': '#0370a1',
          '800': '#075e85',
          '900': '#0c506e',
          '950': '#083549',
        },
        primary: '#0ea5e9', 
        contentText: '#334155',
        //title su dung text-slate-900
      },
      fontFamily: {
        sans: [
          'Inter var',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
        ],
      },
    },
    screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px', 
      },
  },
  plugins: [],
} 

