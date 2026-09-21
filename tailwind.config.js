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
        // Status marker: one slow, quiet fade on the dot. Nothing moves.
        'status-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        marquee: 'scroll 30s linear infinite',
        'status-dot': 'status-dot 2.8s ease-in-out infinite',
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
      // Two families only:
      //   font-display -> Encode Sans, the Lavin logo typeface (headings + labels)
      //   font-sans    -> Open Sans (body copy)
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Encode Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}