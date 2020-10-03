/* eslint-disable react/no-unescaped-entities */
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
              I'm a full stack web developer with industry experience in start-up environments. I have a background in sales that gives me a unique perspective as a developer, and drives me to make changes that matter to the customer.
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