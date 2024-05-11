import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A4D2E",
      dark: "#388023",
    },
    secondary: {
      main: "#f9f9f9",
    },
    background: {
      default: "#F5EFE6",
    },
    error: {
      main: "#960909",
      dark: "#700404",
    },
    success: {
      main: '#28a745',
      light: '#34d058',
      dark: '#22863a'
    },
    info: {
      main: '#17a2b8',
      light: '#007bff',
      dark: '#003d7f'
    },
  },
  typography: {
    fontFamily: '"Century Gothic", "Roboto", sans-serif',
  },
});

export default theme;
