/** @type {import('tailwindcss').Config} */
export default {
  // "content" tells Tailwind which files to scan for class names.
  // It removes any CSS classes you're NOT using from the final bundle (tree-shaking).
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // Custom colors for the ApartmentGuide brand
      colors: {
        brand: {
          50:  "#e8f0fe",
          100: "#d2e3fc",
          500: "#4285f4",
          600: "#1A73E8",
          700: "#1557b0",
          900: "#0d2d6e",
        },
      },
      // Custom font stack
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        slideDown: {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
      },
      animation: {
        slideDown: "slideDown 0.18s ease-out",
      },
    },
  },
  plugins: [],
}
