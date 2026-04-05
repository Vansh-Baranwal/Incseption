"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Main animated blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px]"
        animate={{ 
          x: [0, 200, 0], 
          y: [0, 100, 0], 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-emerald-500/5 rounded-full blur-[100px]"
        animate={{ 
          x: [-100, 100, -100], 
          y: [-50, 50, -50], 
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 w-[45rem] h-[45rem] bg-blue-500/10 rounded-full blur-[150px]"
        animate={{ 
          x: [0, -150, 0], 
          y: [0, -100, 0], 
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Additional subtle orbs for depth */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-[25rem] h-[25rem] bg-primary/5 rounded-full blur-[80px]"
        animate={{ 
          x: [0, -80, 0], 
          y: [0, 80, 0], 
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[30rem] h-[30rem] bg-amber-500/5 rounded-full blur-[90px]"
        animate={{ 
          x: [0, 100, 0], 
          y: [0, -60, 0], 
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Subtle grain/noise overlay for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
