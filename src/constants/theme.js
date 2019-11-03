import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiToolbar: {
      root: {
        height: '48px',
      },
    },
  },
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#d500f9',
    },
  },
  typography: {
    fontFamily: [
      '"Open Sans"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});
