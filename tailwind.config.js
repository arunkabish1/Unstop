/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgbase: '#f4f7fa',
        unstop:'#6258dc',
        form:'#f4f4f4'
      },
    },
  },
  plugins: [],
}
