/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        slideUp: 'slideUp 0.3s ease-out forwards',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '45': '0.45',
        '55': '0.55',
        '65': '0.65',
        '85': '0.85',
      },
    },
  },
  // Tailwind CSS v4 specific configuration
  future: {
    hoverOnlyWhenSupported: true,
    disableColorOpacityUtilitiesByDefault: false,
  },
  // Customize scrollbar appearance
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.scrollbar-thin': {
          '@media (min-width: 640px)': {
            '&::-webkit-scrollbar': {
              width: '6px',
              height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#0037C1',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#002da1',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#2A2A2A',
              borderRadius: '3px',
            },
          },
          scrollbarWidth: 'thin',
          scrollbarColor: '#0037C1 #2A2A2A',
        },
      });
    },
  ],
}; 