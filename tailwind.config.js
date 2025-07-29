// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Orbitron', 'sans-serif'], // Adding Orbitron
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'float': 'float 3s ease-in-out infinite', // It's Optional used for robot which i add on the loginpage.jsx
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
};
