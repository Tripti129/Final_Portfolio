/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      colors: {
        night: '#07070f',
        surface: '#0f0f1c',
        line: 'rgba(255,255,255,0.08)',
        accent: '#8b5cf6',
        accent2: '#22d3ee',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(139,92,246,0.55)',
      },
    },
  },
  plugins: [],
}
