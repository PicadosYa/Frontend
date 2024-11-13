/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
        exo: ['Exo', 'sans-serif'], // Define la fuente 'Exo' con 'sans-serif' como respaldo
      },
            colors: {
                "orange-light": "#FF6341",
                "orange-dark": "#ED3C16",
                "white": "#ffffff",
                "whatsapp": "#25D366",
                "facebook": "#4267B2",
                "twitter": "#1DA1F2",
                "main-blue": "#1A39D2",
                "dark-blue": "#111F65",
                "main-blue-opacity": "#1A39D285",
                "dark-blue-opacity": "#111F6585",
            },
        },
    },
    plugins: [],
}