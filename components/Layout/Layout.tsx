import React, { ReactElement } from 'react';
import Head from 'next/head';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import styles from './Layout.module.css';
import cs from 'classnames';

const Layout = ({ children }: { children: ReactElement }): ReactElement => {
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
              <Nav.Link href="about-me">About</Nav.Link>
              <Nav.Link href="projects">Projects</Nav.Link>
              <Nav.Link href="technical-writing">Technical Writing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className={styles.main}>
        {children}
      </main>

      <footer className={cs(styles.footer, 'bg-light')}>
        © 2020 Mariel Martinez
      </footer>
    </>
  );
};

export default Layout;