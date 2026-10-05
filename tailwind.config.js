/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'deep':      '#0d0a0b',
        'deep-2':    '#16101280',
        'gold':      '#c9a96e',
        'gold-light':'#e2c99a',
        'rose':      '#e8b4b8',
        'rose-dark': '#c4838a',
        'cream':     '#f5f0eb',
        'cream-dim': '#d4cec7',
        'bordeaux':  '#6b1630',
      },
      fontFamily: {
        display:   ['"Playfair Display"', 'Georgia', 'serif'],
        body:      ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script:    ['"Great Vibes"', 'cursive'],
        sans:      ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(ellipse at center, #c9a96e22 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, #0d0a0b 0%, #1a0a12 50%, #0d0a0b 100%)',
      },
      animation: {
        'float':    'float 6s ease-in-out infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in':  'fadeIn 1.2s ease-out forwards',
        'slide-up': 'slideUp 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
