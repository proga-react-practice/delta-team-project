import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteOptions {
    quaternary?: {
      main?: string;
      dark?: string;
    };
    navbar?: {
      main?: string;
      dark?: string;
      light?: string;
    }
    orders?: {
      main?: string;
    }
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
      dark: "#388023",
      light: '#ffffff',
    },
    secondary: {
      main: "#eeeeee",
      dark: '#484542',
      light: '#ffffff',
    },
    background: {
      default: "#f3e9db",
    },
    quaternary: {
      main: '#bcbcbc',
      dark: '#636363',
    },
    navbar: {
      main: '#c19f7b',
      dark: '#d3c5b6',
      light: '#5d3f1f',
    },
    orders: {
      main: '#484542',
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

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#183D3D",
      dark: "#388023",
      light: "#93B1A6",
    },
    secondary: {
      main: "#183D3D",
      dark: '#484542',
      light: '#ffffff',
    },
    background: {
      default: "#040D12",
    },
    quaternary: {
      main: '#bcbcbc',
      dark: '#636363',
    },
    navbar: {
      main: '#183D3D',
      dark: '#5C8374',
      light: '#F5E8C7',
    },
    error: {
      main: '#c84238',
      light: '#dc3545',
      dark: '#9a000f'
    },
    success: {
      main: '#126525',
      light: '#34d058',
      dark: '#22863a'
    },
    info: {
      main: '#17a2b8',
      light: '#007bff',
      dark: '#003d7f'
    },
    text: {
      primary: '#93B1A6',
    },
    action: {
      disabled: '#183D3D',
    },
  },
  typography: {
    fontFamily: 'Goudy Bookletter 1911',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#183D3D',
          },
        },
      },
    },
  },
});