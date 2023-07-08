/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {
        },
        fontFamily: {
            sans: ["Noto Sans JP", "sans-serif"],
        },
    },
    daisyui: {
        themes: [
            "light",
        ],
    },
    content: [
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./nuxt.config.{js,ts}",
    ],
    plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
