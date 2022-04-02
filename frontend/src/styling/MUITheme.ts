import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '1em',
          borderRadius: 10,
        },
      },
    },
  },
  // palette: {
  //   primary: {
  //     main: Colors.BRAND_HOT,
  //     dark: Colors.BRAND_DARK,
  //   },
  //   secondary: {
  //     main: Colors.BRAND_COOL,
  //   },
  // },
  typography: {
    fontFamily: ['Metropolis', 'Helvetica', ' sans-serif'].join(','),
    button: {
      textTransform: 'none',
    },
  },
});
