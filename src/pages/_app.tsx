import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  const lightTheme = createTheme({
    palette: {
      primary: {
        main: '#1CA69A',
      },
      secondary: {
        main: '#484848',
      },
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <StoreProvider store={store}>
        <Component {...props.pageProps} />
      </StoreProvider>
    </ThemeProvider>
  );
}
