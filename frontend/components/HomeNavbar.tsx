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
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 md:px-16 py-6 transition-all duration-700 ${
        scrolled
          ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 py-4 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <Link href="/">
        <span className="text-xl md:text-2xl font-serif font-bold text-[#D4AF37] tracking-[0.2em] uppercase cursor-pointer">
          Objection
        </span>
      </Link>

      <div className="flex items-center gap-10">
        <div className="hidden md:flex items-center gap-8">
          {["Verify", "Policies"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-[#F8FAFC]/50 hover:text-[#D4AF37] transition-all duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
        <Link
          href="/login"
          className="group relative px-6 py-2 overflow-hidden rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase hover:text-[#020617] transition-colors duration-500"
        >
          <span className="relative z-10">Sign In</span>
          <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
        </Link>
      </div>
    </nav>
  );
}
