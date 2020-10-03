import React, { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps): ReactElement {

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;