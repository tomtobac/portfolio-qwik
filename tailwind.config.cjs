/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ['"font-sans"'],
      },
      colors: {
        body: '#0f0f0f',
      },
      keyframes: {
        typing: {
          from: { width: '0' },
          to: { width: 'var(--characters)' },
        },
        blink: {
          from: { 'border-right-color': 'currentColor' },
          to: { 'border-right-color': 'transparent' },
        },
        'live-box-shadow': {
          '0%': {
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 red',
          },
          '50%': {
            transform: 'scale(1.02)',
            'box-shadow': '0 0 5px 2px red',
          },
          '100%': {
            transform: 'scale(1)',
            'box-shadow': '0 0 0 0 red',
          },
        },
      },
      animation: {
        typing: 'typing 0.5s steps(5) forwards, blink 0.1s step-end forwards',
        'live-image': 'live-box-shadow 1.5s infinite',
      },
    },
  },
  plugins: [],
};
