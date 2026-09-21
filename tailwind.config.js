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
        // Status marker: fast expanding ring + the chip itself breathing.
        'status-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.9' },
          '70%': { transform: 'scale(3.2)', opacity: '0' },
          '100%': { transform: 'scale(3.2)', opacity: '0' },
        },
        'status-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(255, 199, 0, 0.75)' },
          '50%': { transform: 'scale(1.035)', boxShadow: '0 0 0 16px rgba(255, 199, 0, 0)' },
        },
      },
      animation: {
        marquee: 'scroll 30s linear infinite',
        'status-ring': 'status-ring 1.1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'status-pulse': 'status-pulse 1.6s ease-in-out infinite',
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