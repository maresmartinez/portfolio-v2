import React, { ReactElement } from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Hero = () : ReactElement => {
  return (
    <Jumbotron>
      <Container>
        <Row>
          <Col sm={9}>
          <h1>Full Stack Web Developer</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
          </Col>
          <Col sm={3}>
            <Image src="/Mares.png" fluid roundedCircle />
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default Hero;