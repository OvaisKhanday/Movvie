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
        muted: "#A1A1A1",
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
      },
      fontWeight: {
        light: 300,
        medium: 500,
      },
      fontSize: {
        // "heading-lg": ["32px", { fontWeight: 300 }],
        // "heading-md": ["24px", { fontWeight: 300 }],
        // "body-lg": ["15px", { fontWeight: 500 }],
        // "body-md": ["15px", { fontWeight: 300 }],
        // "body-sm": ["13px", { fontWeight: 300 }],
        // "heading-sm": ["24px", { fontWeight: 500 }],
        // "heading-xs": ["18px", { fontWeight: 500 }],
        "heading-lg": ["2rem", { fontWeight: 300 }],
        "heading-md": ["1.5rem", { fontWeight: 300 }],
        "body-lg": ["0.938rem", { fontWeight: 500 }],
        "body-md": ["0.938rem", { fontWeight: 300 }],
        "body-sm": ["0.813rem", { fontWeight: 300 }],
        "heading-sm": ["1.5rem", { fontWeight: 500 }],
        "heading-xs": ["1.125rem", { fontWeight: 500 }],
      },
    },
  },
  plugins: [],
};
