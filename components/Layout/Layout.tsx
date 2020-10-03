import React, { ReactElement } from 'react';
import Head from 'next/head';

const Layout = ({children} : { children : ReactElement }) : ReactElement => {
  return (
    <>
      <Head>
        <title>Mares Martinez | Dev</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header>
        <h1>Nav Under Construction</h1>
      </header>
        {children}
      <footer>
        <h1>Foot</h1>
      </footer>
    </>
  );
};

export default Layout;