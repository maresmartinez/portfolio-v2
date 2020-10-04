import React, { ReactElement } from 'react';
import ProjectList from '../../components/ProjectList';

const ProjectsPage = (): ReactElement => {
  return (
    <div>
      <h1>Projects</h1>
      <ProjectList />
    </div>
  )
}

export default ProjectsPage;