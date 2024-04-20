/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./templates/*.html", "./static/js/*.js"],
    theme: {
        extend: {
            colors: {
                "theme-gray": "#15212d",
                "theme-bronze": "#b38764",
                "theme-accent": "#4a6e8d"
            }
        }
    },
    plugins: [],
}