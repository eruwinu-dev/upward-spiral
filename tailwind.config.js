const { fontFamily } = require("tailwindcss/defaultTheme")
const themes = require("./src/themes/index")
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: ["class", '[data-theme="dark"]'],
    important: true,
    theme: {
        extend: {
            fontFamily: {
                primary: ["var(--main-font)", ...fontFamily.sans],
                logo: ["var(--logo-font)", ...fontFamily.sans],
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: [{ ...themes }],
    },
}
