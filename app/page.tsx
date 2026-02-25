import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
                <Link href="/experience">Experience</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Bio + photo */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <AnimatedSection className="md:col-span-2" delay={0.1}>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                I&apos;m a full stack web developer with a background in sales.
                My experience working with clients has given me a unique
                perspective as a developer, and drives me to make changes that
                matter to the customer.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                I currently work at Roadmunk, a customer-centric company with a
                web based app that has become an end-to-end roadmapping
                platform. I started out on the bug fixing team, but have since
                helped develop a variety of new features across many of our
                products.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                My main expertise is in JavaScript, but I have a passion for
                learning and experimenting with new tools and technologies.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/Mares.jpg"
                  alt="Mares Martinez"
                  fill
                  className="object-cover"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
