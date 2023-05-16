import '@/styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import Layout from '@/components/layout/Layout';
import theme from '../lib/muiTheme';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/zh-tw';

export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StoreProvider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-tw">
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
        </LocalizationProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
