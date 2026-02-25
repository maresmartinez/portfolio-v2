import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";

export const metadata: Metadata = {
  title: "About Me",
};

export default function AboutMePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Heading */}
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-12">About Me</h1>
      </AnimatedSection>

      {/* Bio + photo */}
      <div className="grid md:grid-cols-3 gap-12 mb-20">
        <AnimatedSection className="md:col-span-2" delay={0.1}>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            I&apos;m a full stack web developer with a background in sales. My
            experience working with clients has given me a unique perspective as
            a developer, and drives me to make changes that matter to the
            customer.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            I currently work at Roadmunk, a customer-centric company with a web
            based app that has become an end-to-end roadmapping platform. I
            started out on the bug fixing team, but have since helped develop a
            variety of new features across many of our products.
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

      {/* Experience */}
      <AnimatedSection>
        <h2 className="text-2xl font-bold mb-8">Experience</h2>
      </AnimatedSection>

      <div className="flex flex-col gap-6">
        <AnimatedSection delay={0.1}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle>Web Developer</CardTitle>
                  <p className="text-indigo-600 font-medium mt-1">Roadmunk</p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                  Jun. 2019 — Present
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Roadmunk provides powerful software to help teams plan, create,
                and share beautiful product roadmaps.
              </p>
              <h4 className="font-medium text-sm mb-2">My duties include:</h4>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mb-4 space-y-1">
                <li>
                  Developing for major product features and platform projects,
                  continuously delivering value to customers
                </li>
                <li>
                  Focusing on continuously improving our delivery of secure,
                  testable, and supportable code
                </li>
              </ul>
              <h4 className="font-medium text-sm mb-2">Worked with:</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                React, Vue, KnockoutJS, GraphQL, PostgresSQL, MongoDB, Terraform,
                AWS SQS, AWS Lambda, AWS DynamoDB
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://roadmunk.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Roadmunk
                </a>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle>Software Developer Intern</CardTitle>
                  <p className="text-indigo-600 font-medium mt-1">Gocery</p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                  Apr. 2019 — Jun. 2019
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Gocery is a leader in on-time grocery delivery in the GTA. They
                specialize in direct to consumer, restaurant, and wholesale
                grocery products.
              </p>
              <h4 className="font-medium text-sm mb-2">My duties included:</h4>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mb-4 space-y-1">
                <li>
                  Implementing designs for the company&apos;s marketing website
                </li>
                <li>
                  Writing, modifying, integrating and testing software/mobile
                  application code
                </li>
                <li>
                  Maintaining existing code by making modifications as required
                </li>
              </ul>
              <h4 className="font-medium text-sm mb-2">Worked with:</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Angular 7, Node, PostgreSQL
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.gocery.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Gocery
                </a>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle>Business Innovation Specialist (Sales)</CardTitle>
                  <p className="text-indigo-600 font-medium mt-1">
                    Trend Hunter
                  </p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                  Jan. 2017 — Dec. 2017
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Trend Hunter is the world&apos;s largest trend spotting platform.
                My job was to connect with executives in marketing, consumer
                insights, and innovation to help them accelerate their innovation
                process.
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.trendhunter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Trend Hunter
                </a>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
