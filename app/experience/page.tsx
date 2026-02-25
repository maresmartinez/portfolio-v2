import type { Metadata } from "next";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Heading */}
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-12">Experience</h1>
      </AnimatedSection>


      <div className="flex flex-col gap-6">
        <AnimatedSection delay={0.1}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle>Senior Software Developer</CardTitle>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                  Jan. 2023 — Present
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle>Software Developer</CardTitle>
                  <p className="text-indigo-600 font-medium mt-1">Magnet Forensics</p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                  Nov. 2020 — Dec. 2022
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Magnet Forensics develops digital investigation software that can acquire, analyze,
                report on, and manage evidence from digital sources such as computers, mobile devices,
                IoT, and cloud services. I currently work on the Magnet NEXUS, which is a SaaS based
                product that enables remote forensic collections at scale.
              </p>
              <h4 className="font-medium text-sm mb-2">My duties include:</h4>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mb-4 space-y-1">
                <li>
                  Leading cross-functional teams to design and deliver high-impact features, driving business value and resolving critical customer needs
                </li>
                <li>
                  Mentoring junior developers to help them grow professionally and technically
                </li>
                <li>
                  Contributing to architectural decisions that ensure scalable, secure, and efficient solutions
                </li>
                <li>
                  Collaborating with teams to develop and implement innovative solutions that improve process efficiency and customer experience
                </li>
                <li>
                  Focusing on delivering high-quality, secure, and reliable code that meets business requirements and customer needs
                </li>
              </ul>
              <h4 className="font-medium text-sm mb-2">Worked with:</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                C#, AWS (Lambda, CloudFormation, CloudWatch, OpenSearch, ECS, SQS), TypeScript,
                JavaScript (React, Redux), Clojure, Jenkins, PowerShell
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="https://www.magnetforensics.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn more about Magnet Forensics
                </a>
              </Button>
            </CardContent>
          </Card>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <CardTitle>Web Developer</CardTitle>
                  <p className="text-indigo-600 font-medium mt-1">Roadmunk</p>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                  Jun. 2019 — Nov. 2020
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Roadmunk provides powerful software to help teams plan, create,
                and share beautiful product roadmaps.
              </p>
              <h4 className="font-medium text-sm mb-2">My duties included:</h4>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mb-4 space-y-1">
                <li>
                  Developing for major product features and platform projects, continuously delivering value to customers
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
