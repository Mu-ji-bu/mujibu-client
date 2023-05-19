import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    body24: React.CSSProperties;
    body20: React.CSSProperties;
    body16: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body24?: React.CSSProperties;
    body20?: React.CSSProperties;
    body16?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    body24: true;
    body20: true;
    body16: true;
  }
}

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#1CA69A',
    },
    secondary: {
      main: '#484848',
    },
  },
  typography: {
    fontFamily: ['Noto Sans TC', 'sans-serif'].join(','),
    h1: {
      lineHeight: 1.2,
      fontWeight: 500,
      fontSize: '2.5rem',
    },
    h2: {
      lineHeight: 1.2,
      fontWeight: 500,
      fontSize: '2rem',
    },
    h3: {
      lineHeight: 1.2,
      fontWeight: 500,
      fontSize: '1.75rem',
    },
    h4: {
      lineHeight: 1.2,
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    h5: {
      lineHeight: 1.2,
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      lineHeight: 1.2,
      fontWeight: 500,
      fontSize: '1rem',
    },
    body24: {
      lineHeight: 1.5,
      fontWeight: 500,
      fontSize: '1.5rem',
    },
    body20: {
      lineHeight: 1.5,
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body16: {
      lineHeight: 1.5,
      fontWeight: 500,
      fontSize: '1rem',
    },
    caption: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: '0.875rem',
    },
  },
});

export default lightTheme;
