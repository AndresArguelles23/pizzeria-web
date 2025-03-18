import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#d32f2f", // Rojo intenso
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff9800", // Naranja vibrante
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5", // Gris claro
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      letterSpacing: "0.02em",
      marginBottom: "1rem", // Consistencia en el espaciado
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
      marginBottom: "0.75rem",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8, // Bordes redondeados
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: "background-color 0.3s ease, transform 0.3s ease",
          borderRadius: 8,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          textTransform: "none", // Evita convertir a mayúsculas
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;
