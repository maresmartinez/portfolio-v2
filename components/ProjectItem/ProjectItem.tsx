import React from 'react';
import Button from 'react-bootstrap/Button'
import styles from './ProjectItem.module.css';

type ProjectItemProps = {
  project: GithubRepo
};

const ProjectItem = ({ project }: ProjectItemProps): JSX.Element => (
  <div className={styles.item}>
    <h5>{project.name}</h5>
    <p>{project.description}</p>
    {project.homepage && (
      <Button className={styles.btn} variant="secondary" href={project.homepage}>Live Demo</Button>
    )}
    <Button variant="outline-secondary" href={project.html_url}>See Code</Button>
  </div>
)

export default ProjectItem;