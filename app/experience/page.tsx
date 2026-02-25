import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Heading */}
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-4">Experience</h1>
      </AnimatedSection>

      {/* Core Skills */}
      <AnimatedSection delay={0.1}>
        <div className="mb-12">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-3">
            Core Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {["C# .NET", "AWS", "System Architecture & Design", "Mentoring & Leadership"].map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-3 py-1 text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <div className="flex flex-col gap-6">
        {/* Magnet Forensics */}
        <AnimatedSection delay={0.15}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <Image src="/logos/MagnetForensics.jpg" alt="Magnet Forensics logo" fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle>Senior Software Developer</CardTitle>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                      Jan. 2023 — Present
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mt-1">
                    <CardTitle>Software Developer</CardTitle>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                      Nov. 2020 — Dec. 2022
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-indigo-600 font-medium text-sm">Magnet Forensics</p>
                    <a
                      href="https://www.magnetforensics.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-indigo-600 transition-colors"
                      aria-label="Visit Magnet Forensics website"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Magnet Forensics develops digital investigation software that can acquire, analyze,
                report on, and manage evidence from digital sources such as computers, mobile devices,
                IoT, and cloud services. I currently work on the Magnet NEXUS, which is a SaaS based
                product that enables remote forensic collections at scale.
              </p>
              <h4 className="font-medium text-sm mb-2">Responsibilities</h4>
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
              <h4 className="font-medium text-sm mb-2">Technologies</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                C#, AWS (Lambda, CloudFormation, CloudWatch, OpenSearch, ECS, SQS), TypeScript,
                JavaScript (React, Redux), Clojure, Jenkins, Azure, PowerShell
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Roadmunk */}
        <AnimatedSection delay={0.2}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <Image src="/logos/Roadmunk.jpg" alt="Roadmunk logo" fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle>Web Developer</CardTitle>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                      Jun. 2019 — Nov. 2020
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-indigo-600 font-medium text-sm">Roadmunk</p>
                    <a
                      href="https://roadmunk.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-indigo-600 transition-colors"
                      aria-label="Visit Roadmunk website"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Roadmunk provides powerful software to help teams plan, create,
                and share beautiful product roadmaps.
              </p>
              <h4 className="font-medium text-sm mb-2">Responsibilities</h4>
              <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400 mb-4 space-y-1">
                <li>
                  Developing for major product features and platform projects, continuously delivering value to customers
                </li>
                <li>
                  Focusing on continuously improving our delivery of secure,
                  testable, and supportable code
                </li>
              </ul>
              <h4 className="font-medium text-sm mb-2">Technologies</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                React, Vue, KnockoutJS, GraphQL, PostgresSQL, MongoDB, Terraform,
                AWS SQS, AWS Lambda, AWS DynamoDB
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Gocery */}
        <AnimatedSection delay={0.25}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <Image src="/logos/Gocery.jpg" alt="Gocery logo" fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle>Software Developer Intern</CardTitle>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                      Apr. 2019 — Jun. 2019
                    </span>
                  </div>
                  <p className="text-indigo-600 font-medium text-sm mt-1">Gocery</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 text-sm leading-relaxed">
                Gocery is a leader in on-time grocery delivery in the GTA. They
                specialize in direct to consumer, restaurant, and wholesale
                grocery products.
              </p>
              <h4 className="font-medium text-sm mb-2">Responsibilities</h4>
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
              <h4 className="font-medium text-sm mb-2">Technologies</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Angular 7, Node, PostgreSQL
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Trend Hunter */}
        <AnimatedSection delay={0.3}>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <Image src="/logos/TrendHunter.jpg" alt="Trend Hunter logo" fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle>Business Innovation Specialist (Sales)</CardTitle>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                      Jan. 2017 — Dec. 2017
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-indigo-600 font-medium text-sm">Trend Hunter</p>
                    <a
                      href="https://www.trendhunter.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-indigo-600 transition-colors"
                      aria-label="Visit Trend Hunter website"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                Trend Hunter is the world&apos;s largest trend spotting platform.
                My job was to connect with executives in marketing, consumer
                insights, and innovation to help them accelerate their innovation
                process.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>

      {/* Certifications */}
      <AnimatedSection delay={0.35}>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Certifications</h2>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                  <Image src="/AWSDeveloperAssociate.png" alt="AWS Certified Developer Associate badge" fill className="object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <CardTitle>AWS Certified Developer – Associate</CardTitle>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:whitespace-nowrap">
                      Issued Nov. 2024 · Expires Nov. 2027
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <p className="text-indigo-600 font-medium text-sm">Verify on Credly</p>
                    <a
                      href="https://www.credly.com/badges/16a2b238-adcb-46e7-a323-2cd701f68582"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-indigo-600 transition-colors"
                      aria-label="Verify AWS certification on Credly"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </AnimatedSection>
    </div>
  );
}
