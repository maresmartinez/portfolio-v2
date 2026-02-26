"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

const techWritingLinks = [
  { href: "/technical-writing", label: "Overview" },
  {
    href: "/technical-writing/raspberrypi-web-server",
    label: "Create a Raspberry Pi Web Server",
  },
  {
    href: "/technical-writing/setup-adds",
    label: "Setting Up An Active Directory Domain",
  },
  {
    href: "/technical-writing/using-wds",
    label: "Using Windows Deployment Services",
  },
  {
    href: "/technical-writing/adds-forest",
    label: "Active Directory Forest with Multiple Servers",
  },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [twOpen, setTwOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link
          href="/"
          className="font-semibold text-lg text-zinc-900 dark:text-zinc-50"
        >
          Mares Martinez
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/experience"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Experience
          </Link>
          <Link
            href="/projects"
            className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            Projects
          </Link>

          {/* Technical Writing dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setTwOpen(true)}
            onMouseLeave={() => setTwOpen(false)}
          >
            <Link
              href="/technical-writing"
              className="flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
            >
              Technical Writing
              <ChevronDown
                size={14}
                className={`transition-transform ${twOpen ? "rotate-180" : ""}`}
              />
            </Link>
            {twOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 z-50">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg py-1 overflow-hidden">
                  {techWritingLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="h-5 w-px bg-zinc-200 dark:bg-zinc-800" />

          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-16 bg-black/50 z-40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-zinc-900 z-50 md:hidden border-l border-zinc-200 dark:border-zinc-800 overflow-y-auto">
            <nav className="flex flex-col p-4 gap-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/experience"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                About
              </Link>
              <Link
                href="/projects"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Projects
              </Link>
              <div className="px-4 pt-3 pb-1">
                <p className="text-xs font-medium text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">
                  Technical Writing
                </p>
              </div>
              {techWritingLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
