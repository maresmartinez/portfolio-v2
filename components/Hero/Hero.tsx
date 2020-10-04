import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const Hero = () : ReactElement => {
  return (
    <Container>
      <Row>
        <Col sm={9}>
        <h1>Full Stack Web Developer</h1>
          <p>
            I&apos;m a full stack web developer with industry experience in start-up environments. I have a background in sales that gives me a unique perspective as a developer, and drives me to make changes that matter to the customer.
          </p>
          <p>
            <Button variant="primary"  href="about-me">Learn more</Button>
          </p>
        </Col>
        <Col sm={3}>
          <Image src="/Mares.png" fluid roundedCircle />
        </Col>
      </Row>
    </Container>
  )
}

export default Hero;