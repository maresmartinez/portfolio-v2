import React from 'react';

type ProjectItemProps = {
  project: GithubRepo
};

const ProjectItem = ({ project }: ProjectItemProps): JSX.Element => (
  <div>
    <h5>{project.name}</h5>
    <p>{project.description}</p>
  </div>
)

export default ProjectItem;