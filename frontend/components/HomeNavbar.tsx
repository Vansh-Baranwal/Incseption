"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <Link href="/">
        <span className="text-lg font-serif text-foreground cursor-pointer">
          Objection.ai
        </span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-6">
          {["Verify", "Policies"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm text-foreground/50 hover:text-foreground transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-5 py-2 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 transition-all font-sans"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
}
