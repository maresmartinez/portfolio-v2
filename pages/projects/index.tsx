import React, { ReactElement } from 'react';
import ProjectList from '../../components/ProjectList';
import Container from 'react-bootstrap/Container';

const ProjectsPage = (): ReactElement => (
  <Container>
    <h1>Projects</h1>
    <ProjectList />
  </Container>
);

export default ProjectsPage;