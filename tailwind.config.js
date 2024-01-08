import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#F87608",
            secondary: "#FCB215",
            accent: "#FCEBCF",
            neuter:{
              black: "#1A1303",
              white: "#fffffE",
              gray: "#797979",
            },
          },
          linearGradientColors: {
            primary: ["#F87608", "#FCB215"],
            secondary: ["#FCB215", "#F87608"],
            accent: ["#FCEBCF", "#FCEBCF"],
          },
          // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
      },
    }),
  ],
};
