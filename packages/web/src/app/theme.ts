import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html {
          overflow-y:scroll;
        },
        html, body {
          height: 100%;
          background: #cfd8dc;
        }
        #root {
          min-height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `
    },
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
