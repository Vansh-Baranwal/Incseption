"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export default function HomeNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <Link href="/" className="flex items-center gap-3 group">
        <Logo size={45} />
        <motion.span 
          className="text-lg font-sans font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent cursor-pointer block"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% auto" }}
        >
          Objection.ai
        </motion.span>
      </Link>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-6">
          {["Verify", "Policies"].map((item, idx) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              className="relative group"
            >
               <Link
                 href={`/${item.toLowerCase()}`}
                 className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 relative"
               >
                 {item}
                 <motion.span
                   className="absolute -bottom-1 left-0 h-[2px] bg-primary"
                   initial={{ width: 0 }}
                   whileHover={{ width: "100%" }}
                   transition={{ duration: 0.3, ease: "easeOut" }}
                 />
               </Link>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ThemeToggle />
          <Link href="/login">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 30px -5px rgba(255, 152, 0, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 152, 0, 0)",
                  "0 0 0 4px rgba(255, 152, 0, 0.2)",
                  "0 0 0 0 rgba(255, 152, 0, 0)"
                ]
              }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity },
                scale: { type: "spring", stiffness: 400, damping: 17 }
              }}
              className="px-5 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white text-sm font-medium rounded-md transition-all font-sans relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}
