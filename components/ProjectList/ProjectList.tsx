import React from 'react';
import useSWR from 'swr';
import ProjectItem from '../ProjectItem';

type ProjectListProps = {
  limit?: number
}

const ProjectList = ({ limit }: ProjectListProps): JSX.Element => {
  const { data, error } = useSWR(
    'https://api.github.com/users/maresmartinez/repos',
    (url: string) => fetch(url).then((res) => res.json())
  );

  if (error) {
    return <div>Failed to load</div>
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data.slice(0, limit).map((project: GithubRepo) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectList;