import React, { ReactNode } from 'react';

const Layout = ({children} : { children : ReactNode }) : JSX.Element => {
  return (
    <>
      <head>
        <title>Mares Martinez | Dev</title>
        <link rel="icon" href="/favicon.png" />
      </head>

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