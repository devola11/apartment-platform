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
        fadeIn: {
          "0%":   { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateX(-50%) translateY(12px)" },
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(0)"    },
        },
        // Toast: slides down from top, holds, then fades out — all in one animation.
        // Using translateX(-50%) inside the keyframe so the centered position is
        // stable throughout the animation without conflicting with Tailwind's
        // CSS-var-based transform utilities.
        toastShow: {
          "0%":  { opacity: "0", transform: "translateX(-50%) translateY(-20px)" },
          "8%":  { opacity: "1", transform: "translateX(-50%) translateY(0)"     },
          "78%": { opacity: "1", transform: "translateX(-50%) translateY(0)"     },
          "100%":{ opacity: "0", transform: "translateX(-50%) translateY(0)"     },
        },
      },
      animation: {
        slideDown: "slideDown 0.18s ease-out",
        fadeIn:    "fadeIn 0.3s ease-out both",
        slideUp:   "slideUp 0.22s ease-out both",
        // `both` = apply 0% before start (prevents flash) + keep 100% after end
        // (element stays invisible while React unmounts it after the timer).
        toastShow: "toastShow 5s ease-out both",
      },
    },
  },
  plugins: [],
}
