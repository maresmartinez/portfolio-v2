import React, { ReactElement } from 'react';
import Head from 'next/head';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
              <Nav.Link href="/about-me">About</Nav.Link>
              <Nav.Link href="/projects">Projects</Nav.Link>
              <NavDropdown title="Technical Writing" id="technical-writing-dropdown">
                <NavDropdown.Item href="/technical-writing">Overview</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/technical-writing/raspberrypi-web-server">Create a Raspberry Pi Web Server</NavDropdown.Item>
                <NavDropdown.Item href="/technical-writing/setup-adds">Setting Up An Active Directory Domain</NavDropdown.Item>
                <NavDropdown.Item href="/technical-writing/using-wds">Using Windows Deployment Services</NavDropdown.Item>
                <NavDropdown.Item href="/technical-writing/adds-forest">Active Directory Forest with Multiple Servers</NavDropdown.Item>
              </NavDropdown>
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