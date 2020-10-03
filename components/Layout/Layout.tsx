import React, { ReactElement } from 'react';
import Head from 'next/head';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './Layout.module.css';

const Layout = ({children} : { children : ReactElement }) : ReactElement => {
  return (
    <>
      <Head>
        <title>Mares Martinez | Dev</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <header>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Mares</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="about">About</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={styles.footer}>
        Foot
      </footer>
    </>
  );
};

export default Layout;