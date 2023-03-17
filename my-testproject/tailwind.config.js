function withOpacity(variableName) {
  return({opacityValue}) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}


module.exports = {
  mode:"jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        }
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
      },
      screens: {
        '2xl': { 'raw': '(min-width: 1920px)' },
        // => @media (min-height: 800px) { ... }
      },
      zIndex: {
        'max': '1001',
        'umax': '1002',
        "max2":"1003",
      },
      colors: {
        skin:{
          "primary": withOpacity("--color-primary"),
          "secondary": withOpacity("--color-secondary"),
          "widget-text": withOpacity("--color-widget-text"),
          "accent": withOpacity("--color-accent"),
          "backdrop": withOpacity("--color-backdrop"),
        },
        cyan: {
          200: "#016398"
        }
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
  ],
}