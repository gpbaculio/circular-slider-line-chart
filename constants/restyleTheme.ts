import { createTheme } from "@shopify/restyle";

const theme = createTheme({
  colors: {
    primary: "#328FCE",
    secondary: "#292D32",
    dark: "#222222",
    success: "#36775F",
    danger: "#FC163F",
    light: "#F5F5F5",
    white: "#FFFFFF",
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
    header: {
      fontWeight: "bold",
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      // We can define a default text variant here.
    },
  },
  containerVariants: {
    defaults: {},
    rowAlignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    rowCenterBetween: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    centerItems: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

// for dark mode create another theme

export type Theme = typeof theme;

export default theme;
