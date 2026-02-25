import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { GithubRepo } from "@/lib/types";
import { Star, ExternalLink, Github } from "lucide-react";

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Ruby: "bg-red-500",
  HTML: "bg-orange-500",
  CSS: "bg-purple-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-700",
};

type ProjectItemProps = {
  project: GithubRepo;
};

export function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-md">
      <CardContent className="flex flex-col h-full pt-6">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 leading-tight">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {project.description}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            {project.language && (
              <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    languageColors[project.language] ?? "bg-zinc-400"
                  }`}
                />
                {project.language}
              </span>
            )}
            {project.stargazers_count > 0 && (
              <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <Star size={12} />
                {project.stargazers_count}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {project.homepage && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={14} />
                  Demo
                </a>
              </Button>
            )}
            <Button variant="outline" size="sm" asChild>
              <a
                href={project.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={14} />
                Code
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
