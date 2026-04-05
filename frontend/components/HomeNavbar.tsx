"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

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
          ? "bg-[#1a1410]/90 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <Link href="/">
        <span className="text-lg font-serif text-white cursor-pointer">
          Objection.ai
        </span>
      </Link>

      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-6">
          {["Verify", "Policies"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm text-white/50 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <Link
          href="/login"
          className="px-5 py-2 bg-white text-[#1a1410] text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
}
