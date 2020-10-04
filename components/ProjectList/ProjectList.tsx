import React from 'react';
import useSWR from 'swr';
import ProjectItem from '../ProjectItem';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button';

type ProjectListProps = {
  limit?: number
}

const ProjectList = ({ limit }: ProjectListProps): JSX.Element => {
  const { data, error } = useSWR(
    'https://api.github.com/users/maresmartinez/repos?sort=updated',
    (url: string) => fetch(url).then((res) => res.json())
  );

  if (error) {
    return <div>Failed to load</div>
  }

  if (!data) {
    return <Spinner animation="border" />
  }

  return (
    <div>
      {data.slice(0, limit).map((project: GithubRepo) => (
        <ProjectItem key={project.id} project={project} />
      ))}
      { limit && (
        <Button variant="primary" href="/projects" size="lg" block>See more</Button>
      )}
    </div>
  );
}

export default ProjectList;