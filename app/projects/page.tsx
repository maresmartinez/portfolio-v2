import type { Metadata } from "next";
import { ProjectList } from "@/components/ProjectList/ProjectList";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-2">Projects</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-10">
          My GitHub repositories, sorted by most recently updated.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <ProjectList />
      </AnimatedSection>
    </div>
  );
}
