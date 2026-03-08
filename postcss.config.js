// PostCSS is the tool that processes CSS before the browser sees it.
// Tailwind runs as a PostCSS plugin, so this file wires them together.
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},   // adds vendor prefixes (-webkit-, etc.) automatically
  },
}
