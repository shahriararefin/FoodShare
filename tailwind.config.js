/** @type {import('tailwindcss').Config} */
export default {
  // This 'content' array tells Tailwind to scan all .jsx and .html files for class names.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  // This 'plugins' array is where we add extra functionality.
  // We are adding daisyUI, which provides pre-styled components like buttons and inputs.
  plugins: [
    require('daisyui'),
  ],
}
