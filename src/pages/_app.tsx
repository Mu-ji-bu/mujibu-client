import '@/styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/store';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';

import Layout from '@/components/layout/Layout';
import theme from '@/libraries/utils/muiTheme';
import withAuth from '@libraries/hocs/withAuth';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/zh-tw';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);

  // start mock api
  // if (process.env.NODE_ENV === 'development') {
  //   const { serverWorker } = require('../mocks/browser');
  //   const startServer = async () => {
  //     await serverWorker.listen();
  //   };
  //   startServer().catch((error) => {
  //     console.error('Error starting server work:', error);
  //   });
  // }

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
};

export default withAuth(App);
