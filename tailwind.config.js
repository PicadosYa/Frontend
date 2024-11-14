/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                "orange-light": "#ff47ff",
                "white": "#ffffff",
                "whatsapp": "#25D366",
                "facebook": "#4267B2",
                "twitter": "#1DA1F2"
            },
            backgroundImage: {
                'custom-gradient': 'linear-gradient(90deg, #ff0000, #ff7f00, #00ff00, #0000ff)',
              },
        },
    },
    plugins: [],
}