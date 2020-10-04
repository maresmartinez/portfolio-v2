import React from 'react';

type ProjectItemProps = {
  project: GithubRepo
};

const ProjectItem = ({ project }: ProjectItemProps): JSX.Element => (
  <div>
    <h4>{project.name}</h4>
    <p>{project.description}</p>
  </div>
)

export default ProjectItem;