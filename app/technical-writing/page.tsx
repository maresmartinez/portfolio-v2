import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Technical Writing",
};

const articles = [
  {
    href: "/technical-writing/raspberrypi-web-server",
    title: "Create a Raspberry Pi Web Server",
    description:
      "Tutorial exploring the concepts behind HTTP and TCP. The practical portion shows how to install Apache2 onto a raspberry pi and turn it into a web server. After the web server is up and running, it is then visited by a client and the process is captured in Wireshark.",
    image: "/raspberrypi-web-server/image009.png",
  },
  {
    href: "/technical-writing/setup-adds",
    title: "Set Up Active Directory Domain Services",
    description:
      "Tutorial that gives instructions on how to transition a Windows Server 2012 GUI down to core, and then install Active Directory using PowerShell. It also shows how to create Active Directory Organizational Units, Security Groups, and Users.",
    image: "/setup-adds/image021.png",
  },
  {
    href: "/technical-writing/using-wds",
    title: "Using Windows Domain Services",
    description:
      "Tutorial that explains what Windows Deployment Services (WDS) is, how it works, and specific use cases for it. The practical portion shows how to install Active Directory, configure DNS and DHCP, and add WDS.",
    image: "/using-wds/image016.png",
  },
  {
    href: "/technical-writing/adds-forest",
    title: "Active Directory Domain Services Multi-Server Forest",
    description:
      "Tutorial that shows how to set up an Active Directory forest that contains multiple domain controllers, configure Active Directory Sites and Services with multiple subnets, inter-site transports, and locations.",
    image: "/adds-forest/image001.png",
  },
];

export default function TechnicalWritingPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <AnimatedSection>
        <h1 className="text-4xl font-bold mb-2">Technical Writing</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-12">
          A collection of technical reports and tutorials.
        </p>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article, i) => (
          <AnimatedSection key={article.href} delay={i * 0.1}>
            <Link href={article.href} className="block h-full group">
              <Card className="h-full flex flex-col overflow-hidden group-hover:shadow-md">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full aspect-video object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardContent className="flex-1 pt-6 flex flex-col">
                  <h2 className="font-semibold text-lg mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 leading-relaxed">
                    {article.description}
                  </p>
                  <div className="flex items-center gap-1 text-indigo-600 text-sm font-medium mt-4">
                    Read more <ArrowRight size={14} />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
