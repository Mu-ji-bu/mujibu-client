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

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@libraries/utils/stripe.utils';
import Head from 'next/head';

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper?.useWrappedStore(rest);

  /** 
    為了讓首頁和探索頁有資料，目前 mock api 先開著，但這樣會員中心的呈現資料會是專用測試。
    如果要接 server 的 api，需要把全部註解掉。
    serverWorkder 先用 ?. 來跳過 undefined 的 error。
   */

  // start mock api
  // if (process.env.NODE_ENV === 'development') {
  //   const { serverWorker } = require('../mocks/browser');
  //   const startServer = async () => {
  //     await serverWorker?.listen();
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
          <Elements stripe={stripePromise}>
            <Layout>
              <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
              </Head>
              <Component {...props.pageProps} />
            </Layout>
          </Elements>
        </LocalizationProvider>
      </StoreProvider>
    </ThemeProvider>
  );
};

export default withAuth(App);
