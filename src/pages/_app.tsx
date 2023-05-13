import '@/styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../lib/muiTheme';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <Component {...props.pageProps} />
      </StoreProvider>
    </ThemeProvider>
  );
}
