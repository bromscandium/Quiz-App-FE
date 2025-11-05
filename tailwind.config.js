/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#dcf4f3",
                paper: "#ffffff",
                "text-primary": "#000000",
                "text-secondary": "#555555",
                primary: {
                    DEFAULT: "#06cdaf",
                    light: "#5fffd2",
                    dark: "#13b89f",
                },
                secondary: "#1976d2",
                error: "#f44336",
                success: "#4caf50",
            },
            fontFamily: {
                sans: ["Montserrat", "Arial", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "8px",
            },
        },
    },
    fontFamily: {
        sans: ["var(--font-montserrat)"],
    },
    plugins: [],
};
