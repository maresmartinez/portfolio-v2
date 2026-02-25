import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Mares Martinez | Dev",
    template: "%s | Mares Martinez",
  },
  description:
    "Professional Portfolio for Full Stack Web Developer Mariel 'Mares' Martinez",
  openGraph: {
    title: "Mares Martinez Full Stack Web Developer",
    type: "website",
    url: "https://mares-martinez-portfolio.vercel.app/",
    images: ["https://mares-martinez-portfolio.vercel.app/Mares3.png"],
    description:
      "Professional Portfolio for Full Stack Web Developer Mariel 'Mares' Martinez",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
