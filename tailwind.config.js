/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Two families only:
      //   font-display -> Encode Sans, the Lavin logo typeface (headings + labels)
      //   font-sans    -> Open Sans (body copy)
      fontFamily: {
        sans: ['"Open Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Encode Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // Status marker: one slow, quiet fade on the dot. Nothing moves.
        'status-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
      },
      animation: {
        'status-dot': 'status-dot 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
