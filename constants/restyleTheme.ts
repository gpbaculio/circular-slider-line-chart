import { createTheme } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    primary: "#328FCE",
    secondary: "#292D32",
    dark: "#222222",
    success: "#36775F",
    danger: "#FC163F",
    light: "#F5F5F5",
    white: "white",
    purple: "purple",
  },
  spacing: {
    XS: 8,
    S: 12,
    M: 16,
    L: 20,
    XL: 24,
  },
  breakpoints: {},
  textVariants: {
    defaults: {
      // We can define a default text variant here.
    },
  },
  shadows: {
    none: {
      shadowColor: "transparent",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4.65,
      elevation: 8,
    },
  },
});

// for dark mode create another theme

export type Theme = typeof theme;

export default theme;
