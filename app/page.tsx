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
                I'm a Senior Software Developer with over 7 years of experience building
                scalable systems on product-led teams. I have extensive experience working
                with cloud infrastructure (especially AWS), C# ASP.NET, React, and TypeScript
                to design performant applications. But what drives me isn't just writing code,
                it's creating technology that genuinely makes a difference for its customers.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                This philosophy stems from a time before I even worked in tech. My first full time
                job was in sales at Trend Hunter, where I connected with people working in consumer
                insights and innovation. I introduced them to a tool that tracked what consumers
                were interested in, and projected trends that would speak to them. It was a cool job
                that exposed me to a lot of upcoming trends and technology. Every day, I was surrounded
                by folks talking about the future of retail, up and coming start ups, and a literal
                robot that would say good morning to us (RIP Jibo). All of this cool stuff eventually
                shifted my passion from selling the future, to wanting to build it myself.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                My transition into tech started by listening to coding podcasts on my commute and
                studying on lunch breaks. Eventually, I decided to go all in and went back to school
                for computer programming. I've now been in the tech industry for many years, and have
                been privileged enough to live my dream and work on projects that I believe have
                changed the future. I've worked at a startup that filled the grocery delivery space
                before it became essential in 2020, built tools for product owners that have helped
                them create their own cool things, and written impactful software that has protected
                children. It's been a long time since my days prepping pitch decks, but I never want
                to forget the things I learned in sales. I still work to understand my customers and
                connect them to things they actually want and need. My journey has taught me that
                great products are made when technical expertise meets customer insight.
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
