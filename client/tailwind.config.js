/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FC4747",
        onPrimary: "#FFFFFF",
        secondary: "#161D2F",
        onSecondary: "#FFFFFF",
        tertiary: "#5A698F",
        onTertiary: "#FFFFFF",
        surface: "#10141E",
        onSurface: "#FFFFFF",
        muted: "#d1d1d1",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        medium: 500,
      },
      fontSize: {
        "heading-lg": ["2rem", { fontWeight: 300 }],
        "heading-md": ["1.5rem", { fontWeight: 300 }],
        "body-md": ["0.938rem", { fontWeight: 300 }],
        "body-sm": ["0.813rem", { fontWeight: 300 }],
        "heading-sm": ["1.5rem", { fontWeight: 500 }],
        "heading-xs": ["1.125rem", { fontWeight: 500 }],
      },
    },
  },
  plugins: [],
};
