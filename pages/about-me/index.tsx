import React, { ReactNode } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import styles from './AboutMePage.module.css';

const AboutMePage = (): ReactNode => (
  <div>
    <Container>
      <Row>
        <Col>
          <h1>About Me</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          <p>I&apos;m a full stack web developer with a background in sales. My experience working with clients has given me a unique perspective as a developer, and drives me to make changes that matter to the customer.</p>
          <p>I currently work at Roadmunk, a customer-centric company with a web based app that has become an end-to-end roadmapping platform. I started out on the bug fixing team, but have since helped develop a variety of new features across many of our products.</p>
          <p>My main expertise is in JavaScript, but I have a passion for learning and experimenting with new tools and technologies.</p>
        </Col>
        <Col sm={4}>
          <Image className={styles.img} src="/Mares2.jpg" fluid roundedCircle />
        </Col>
      </Row>
    </Container>
    <Container className={styles.experience}>
      <h2>Experience</h2>
      <Card>
        <Card.Header as="h5">Roadmunk (Jun. 2019 - Present)</Card.Header>
        <Card.Body>
          <Card.Title>Web Developer</Card.Title>
          <p>Roadmunk provides powerful software to help teams plan, create, and share beautiful product roadmaps.</p>

          <h6>My duties include:</h6>
          <ul>
            <li>Developing for major product features and platform projects, continuously delivering value to customers</li>
            <li>Focusing on continuously improving our delivery of secure, testable, and supportable code</li>
          </ul>

          <h6>Worked with:</h6>
          <p>React, Vue, KnockoutJS, GraphQL, PostgresSQL, MongoDB, Terraform, AWS SQS, AWS Lambda, AWS DynamoDB</p>
          <Button variant="primary" href="https://roadmunk.com/" target="_blank">Learn more about Roadmunk</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as="h5">Gocery (Apr. 2019 - Jun. 2019)</Card.Header>
        <Card.Body>
          <Card.Title>Software Developer Intern</Card.Title>
          <p>Gocery is a leader in on-time grocery delivery in the GTA. They specialize in direct to consumer, restaurant, and wholesale grocery products.</p>

          <h6>My duties included:</h6>
          <ul>
            <li>Implementing designs for the company&apos;s marketing website</li>
            <li>Writing, modifying, integrating and testing software/mobile application code</li>
            <li>Maintaining existing code by making modifications as required</li>
          </ul>

          <h6>Worked with:</h6>
          <p>Angular 7, Node, PostgreSQL</p>
          <Button variant="primary" href="https://www.gocery.ca/" target="_blank">Learn more about Gocery</Button>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header as="h5">Trend Hunter (Jan. 2017 - Dec. 2017)</Card.Header>
        <Card.Body>
          <Card.Title>Business Innovation Specialist (Sales)</Card.Title>
          <p>Trend Hunter is the world&apos;s largest trend spotting platform. My job was to connect with executives in marketing, consumer insights, and innovation to help them accelerate their innovation process.</p>
          <Button variant="primary" href="https://www.trendhunter.com/" target="_blank">Learn more about Trend Hunter</Button>
        </Card.Body>
      </Card>
    </Container>
  </div>
);

export default AboutMePage;