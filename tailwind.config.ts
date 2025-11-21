import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Branding Hospital Versalles (basado en logo)
        primary: {
          50: '#e8f2f8',
          100: '#c4dde9',
          200: '#9dc8db',
          300: '#76b3cc',
          400: '#5aa4c2',
          500: '#3d95b8', // Azul claro/aguamarina del logo
          600: '#378aad',
          700: '#2f7ca1',
          800: '#276e95',
          900: '#1a567f',
        },
        secondary: {
          50: '#e8eef5',
          100: '#c5d4e5',
          200: '#9eb8d4',
          300: '#779cc3',
          400: '#5987b6',
          500: '#3c72a9', // Azul medio
          600: '#366aa2',
          700: '#2e5f98',
          800: '#27558f',
          900: '#1a427e',
        },
        navy: {
          50: '#e7eaef',
          100: '#c4ccd8',
          200: '#9daabd',
          300: '#7688a2',
          400: '#586f8e',
          500: '#1e3a5f', // Azul oscuro/navy del logo (texto principal)
          600: '#1a3456',
          700: '#162c4b',
          800: '#122541',
          900: '#0a182f',
        },
        gold: {
          50: '#fdf8e8',
          100: '#faedc5',
          200: '#f7e19e',
          300: '#f4d577',
          400: '#f1cc59',
          500: '#d4af37', // Dorado del escudo
          600: '#c29f30',
          700: '#ad8d26',
          800: '#997b1d',
          900: '#755e0f',
        },
        medical: {
          bg: '#FFFFFF',
          text: '#1e3a5f',
          border: '#c4ccd8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'medical': '12px',
      },
      boxShadow: {
        'medical': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medical-hover': '0 4px 12px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}

export default config
