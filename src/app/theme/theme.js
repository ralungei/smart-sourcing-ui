import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#E1DFDD",
    light: "#FFFFF",
    dark: "#A7A8A9",
    contrastText: "#000",
  },
  secondary: {
    main: "#33302A",
    light: "#4F4B42",
    dark: "#1D1B17",
    contrastText: "#ffffff",
  },
  error: {
    main: "#AA443B",
    light: "#C35F56",
    dark: "#873227",
  },
  warning: {
    main: "#FDCC71",
    light: "#FEDD9A",
    dark: "#E6B858",
  },
  info: {
    main: "#00688C",
    light: "#3390A4",
    dark: "#00425C",
  },
  success: {
    main: "#5F7D4E",
    light: "#789868",
    dark: "#3E5734",
  },
  grey: {
    50: "#F5F5F5",
    100: "#E0E0E0",
    200: "#C9D5DC",
    300: "#A9B8BC",
    400: "#67777B",
    500: "#6F707B",
    600: "#4A4A4A",
    700: "#333333",
    800: "#212121",
    900: "#161515",
  },
  background: {
    default: "#ffffff",
    paper: "#ffffff",
    light: "#f5f5f5",
  },
  link: {
    main: "#00688C",
  },
};

const theme = createTheme({
  palette: {
    mode: "dark",
    ...colors,
  },
  typography: {
    fontFamily: '"Oracle Sans", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: "8px 16px",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 4,
        },
        elevation1: {
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderBottom: "1px solid #e0e0e0",
        },
        head: {
          fontWeight: 600,
          backgroundColor: colors.background.light,
        },
      },
    },
  },
});

export default theme;
