/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Lexend: ['Lexend', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        'purple-dark': "#6633EE",
        'purple-bg': "#F4F4FF",
        "purple-border": "#DFE1F4"
      }
    },
  },
  plugins: [],
}