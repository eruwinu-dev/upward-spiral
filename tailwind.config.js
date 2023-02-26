const { fontFamily } = require("tailwindcss/defaultTheme")
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        themes: [
            {
                spiral: {
                    primary: "#a78bfa",
                    secondary: "#38bdf8",
                    accent: "#bae6fd",
                    neutral: "#2D2631",
                    "base-100": "#F7F7F8",
                    info: "#6582F6",
                    success: "#26DFB0",
                    warning: "#F4952F",
                    error: "#F33C2B",
                },
            },
        ],
    },
}
