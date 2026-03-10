// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'scroll 30s linear infinite',
      },
      colors: {
        'husky-purple': '#32006e',
        'spirit-purple': '#4b2e83',
        'spirit-gold': '#ffc700',
        'web-gold': '#e8e3d3',
        'accent-green': '#aadb1e',
        'accent-teal': '#2ad2c9',
        'accent-pink': '#e93cac',
        'accent-lavender': '#c5b4e3',
      },
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        slab: ['"Roboto Slab"', 'serif'],
        // Bookmania as primary display serif; use font-display or .display / .h2
        display: ['Bookmania', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      }
    },
  },
  plugins: [],
}