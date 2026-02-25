import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProjectList } from "@/components/ProjectList/ProjectList";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";

export default function HomePage() {
  return (
    <>
      {/* Hero section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #a5b4fc 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 py-24 relative">
          <AnimatedSection>
            <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
              Full Stack Web Developer
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mb-8 leading-relaxed">
              I&apos;m a full stack web developer with industry experience in
              start-up environments. I have a background in sales that gives me
              a unique perspective as a developer, and drives me to make changes
              that matter to the customer.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about-me">About Me</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured projects section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-2">Projects</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-10">
              A selection of my recent work.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ProjectList limit={4} />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
