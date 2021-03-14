const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/components/**/*.vue", "./src/views/**/*.vue"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        brand: ["Kaushan Script", ...defaultTheme.fontFamily.sans],
        "brand-hotel": ["Roboto Slab", ...defaultTheme.fontFamily.serif],
        sans: ["Open Sans", ...defaultTheme.fontFamily.sans]
      },

      colors: {
        brand: "hsla(140, 33%, 43%, 1)",
        "brand-hotel": "#e2b007",
        "brand-white": "#ddeee3",
        "brand-opaque": "hsla(140, 33%, 43%, 0.5)",
        brandlight: "#55aa70",
        branddark: "#3c774f",
        softblack: "#121212",
        gray: {
          "050": "#F7F7F7",
          "100": "#E1E1E1",
          "200": "#CFCFCF",
          "300": "#B1B1B1",
          "400": "#9E9E9E",
          "500": "#7E7E7E",
          "600": "#626262",
          "700": "#515151",
          "800": "#3B3B3B",
          "900": "#222222",
          "950": "#121212"
        }
      },
      rotate: {
        "10": "10deg",
        "-10": "-10deg"
      }
    }
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled"
  ],
  plugins: []
};
