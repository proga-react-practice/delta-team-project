import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      dark: "#388023",
    },
    secondary: {
      main: "#eeeeee",
      dark: '#484542',
      light: '#ffffff',
    },
    background: {
      default: "#f3e9db",
    },
    error: {
      main: '#c84238',
      light: '#dc3545',
      dark: '#9a000f'
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
    fontFamily: 'Goudy Bookletter 1911',
  },
});

export default theme;
