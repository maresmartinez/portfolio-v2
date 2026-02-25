"use client";

import useSWR from "swr";
import { ProjectItem } from "@/components/ProjectItem/ProjectItem";
import { Loader2 } from "lucide-react";
import type { GithubRepo } from "@/lib/types";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type ProjectListProps = {
  limit?: number;
};

export function ProjectList({ limit }: ProjectListProps) {
  const { data, error } = useSWR<GithubRepo[]>(
    "https://api.github.com/users/maresmartinez/repos?sort=updated",
    fetcher
  );

  if (error) {
    return (
      <p className="text-zinc-500 dark:text-zinc-400">
        Failed to load projects.
      </p>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-indigo-500" size={32} />
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.slice(0, limit).map((project) => (
          <ProjectItem key={project.id} project={project} />
        ))}
      </div>
      {limit && (
        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="text-indigo-600 hover:underline font-medium"
          >
            See all projects →
          </Link>
        </div>
      )}
    </div>
  );
}
