import React, { ReactNode } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import styles from './TechnicalWriting.module.css';

const TechnicalWritingPage = (): ReactNode => (
  <Container className={styles.container}>
    <h1>Technical Writing</h1>
    <Card>
      <Card.Header>Create a Raspberry Pi Web Server</Card.Header>
      <Card.Body>
        <Image className={styles.img} src="/raspberrypi-web-server/image009.png" fluid />
        <Card.Text>
          Tutorial exploring the concepts behind HTTP and TCP. The practical portion shows how to install Apache2 onto a raspberry pi and turn it into a web server. After the web server is up and running, it is then visited by a client and the process is captured in Wireshark. The report explains the purpose of each of the packets.
        </Card.Text>
        <Button variant="primary" href="/technical-writing/raspberrypi-web-server">Read more</Button>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header>Set Up Active Directory Domain Services</Card.Header>
      <Card.Body>
        <Image className={styles.img} src="/setup-adds/image021.png" fluid />
        <Card.Text>
          Tutorial that gives instructions on how to transition a Windows Server 2012 GUI down to core, and then install Active Directory using PowerShell. It also shows how to create Active Directory Organizational Units, Security Groups, and Users.
        </Card.Text>
        <Button variant="primary" href="/technical-writing/setup-adds">Read more</Button>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header>Using Windows Domain Services</Card.Header>
      <Card.Body>
        <Image className={styles.img} src="/using-wds/image016.png" fluid />
        <Card.Text>
          Tutorial that explains what Windows Domain Services (WDS) is, how it works, and specific use cases for it. The practical portion shows how to install Active Directory, configure DNS and DHCP, and add WDS. It also shows how to capture an image from another device, and push it to a blank computer.
        </Card.Text>
        <Button variant="primary" href="/technical-writing/using-wds">Read more</Button>
      </Card.Body>
    </Card>
    <Card>
      <Card.Header>UActive Directory Domain Services Multi-Server Forest</Card.Header>
      <Card.Body>
        <Image className={styles.img} src="/adds-forest/image001.png" fluid />
        <Card.Text>
          Tutorial that shows how to set up an Active Directory forest that contains multiple domain controllers. It also gives the instructions for how to configure Active Directory Sites and Services with multiple subnets, inter-site transports, and locations. Finally, the domain will also be populated with Organizational Units, Security Groups, and Users using a domain controller in each different location.
        </Card.Text>
        <Button variant="primary" href="/technical-writing/adds-forest">Read more</Button>
      </Card.Body>
    </Card>
  </Container>
);

export default TechnicalWritingPage;