/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'sayqal-gold': '#D4AF37',
        'sayqal-red': '#9B2335',
        'sayqal-blue': '#0F4C81',
        'sayqal-cream': '#F5F5DC',
        'sayqal-bg': '#B5B19F',
        'sayqal-light': '#F9F6EE',
        'sayqal-burgundy': '#7b031d',
      },
      backgroundImage: {
        'uzbek-pattern': "linear-gradient(to right, #B5B19F, #B5B19F)",
        'hero-bg': "url('./background/background(2).png')",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}