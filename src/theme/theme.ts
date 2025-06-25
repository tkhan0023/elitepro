import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles';

// Material Design 3 color tokens
const md3Light: PaletteOptions = {
  primary: {
    main: '#6750A4',
    light: '#D0BCFF',
    dark: '#381E72',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#625B71',
    light: '#CCC2DC',
    dark: '#332D41',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#B3261E',
    light: '#F9DEDC',
    dark: '#601410',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#FFFBFE',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1C1B1F',
    secondary: '#49454F',
  },
};

const md3Dark: PaletteOptions = {
  primary: {
    main: '#D0BCFF',
    light: '#E8DEF8',
    dark: '#4F378B',
    contrastText: '#381E72',
  },
  secondary: {
    main: '#CCC2DC',
    light: '#E8DEF8',
    dark: '#4A4458',
    contrastText: '#332D41',
  },
  error: {
    main: '#F2B8B5',
    light: '#F9DEDC',
    dark: '#8C1D18',
    contrastText: '#601410',
  },
  background: {
    default: '#1C1B1F',
    paper: '#141218',
  },
  text: {
    primary: '#E6E1E5',
    secondary: '#CAC4D0',
  },
  mode: 'dark',
};

// Material Design 3 typography
const typography = {
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontSize: '2.813rem',
    lineHeight: 1.2,
    fontWeight: 400,
    letterSpacing: '-0.022em',
  },
  h2: {
    fontSize: '2.25rem',
    lineHeight: 1.3,
    fontWeight: 400,
    letterSpacing: '-0.018em',
  },
  h3: {
    fontSize: '1.875rem',
    lineHeight: 1.4,
    fontWeight: 400,
    letterSpacing: '-0.014em',
  },
  h4: {
    fontSize: '1.5rem',
    lineHeight: 1.4,
    fontWeight: 400,
    letterSpacing: '-0.012em',
  },
  h5: {
    fontSize: '1.25rem',
    lineHeight: 1.5,
    fontWeight: 400,
    letterSpacing: '-0.01em',
  },
  h6: {
    fontSize: '1.125rem',
    lineHeight: 1.5,
    fontWeight: 400,
    letterSpacing: '-0.008em',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.5,
    fontWeight: 400,
    letterSpacing: '0.031em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.43,
    fontWeight: 400,
    letterSpacing: '0.018em',
  },
  button: {
    fontSize: '0.875rem',
    lineHeight: 1.75,
    fontWeight: 500,
    letterSpacing: '0.044em',
    textTransform: 'none',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.33,
    fontWeight: 400,
    letterSpacing: '0.025em',
  },
};

// Shape configurations for Material Design 3
const shape = {
  borderRadius: 16,
};

// Component overrides for Material Design 3
const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': {
        transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 100,
        textTransform: 'none',
        padding: '10px 24px',
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
      },
    },
    defaultProps: {
      disableElevation: true,
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 28,
        padding: 16,
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'scale(1.1)',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
          transform: 'translateX(4px)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.1)',
        },
      },
    },
  },
};

// Create theme configurations
const lightThemeOptions: ThemeOptions = {
  palette: md3Light,
  typography,
  shape,
  components,
};

const darkThemeOptions: ThemeOptions = {
  palette: md3Dark,
  typography,
  shape,
  components,
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions); 