// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
    'src/**/*.tsx',
    'index.html',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  daisyui: {
    logs: false,
    themes: [
      // 'lofi',
      {
        modernista: {
          'color-scheme': 'light',
          primary: '#0D0D0D',
          'primary-content': '#ffffff',
          secondary: '#1A1919',
          'secondary-content': '#ffffff',
          accent: '#262626',
          'accent-content': '#ffffff',
          neutral: '#000000',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#F2F2F2',
          'base-300': '#E6E5E5',
          'base-content': '#000000',
          info: '#0070F3',
          'info-content': '#ffffff',
          success: '#21CC51',
          'success-content': '#ffffff',
          warning: '#FF6154',
          'warning-content': '#ffffff',
          error: '#DE1C8D',
          'error-content': '#ffffff',
          '--animation-btn': '0',
          '--animation-input': '0',
          '--border-btn': '2px',
          // '--rounded-box': '0.25rem',
          // '--rounded-btn': '0.125rem',
          // '--rounded-badge': '0.125rem',
          // '--animation-btn': '0',
          // '--animation-input': '0',
          // '--btn-focus-scale': '1',
          // '--tab-radius': '0',
          // '--card-radius': '4rem',
          // '--card-border-width': '2rem'
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}
