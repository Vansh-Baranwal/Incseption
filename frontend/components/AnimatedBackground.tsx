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
      {/* Vibrant animated gradient blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-[120px]"
        animate={{ 
          x: [0, 150, -50, 0], 
          y: [0, 80, -30, 0], 
          scale: [1, 1.3, 0.9, 1],
          opacity: [0.4, 0.7, 0.5, 0.4]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute top-1/4 right-1/4 w-[35rem] h-[35rem] bg-gradient-to-br from-blue-500/25 to-indigo-600/25 rounded-full blur-[100px]"
        animate={{ 
          x: [-80, 100, -80], 
          y: [-40, 60, -40], 
          scale: [1, 1.4, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] bg-gradient-to-tr from-green-500/15 to-emerald-500/15 rounded-full blur-[110px]"
        animate={{ 
          x: [-60, 80, -60], 
          y: [40, -70, 40], 
          scale: [1, 1.35, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      <motion.div
        className="absolute -bottom-32 -right-32 w-[45rem] h-[45rem] bg-gradient-to-l from-purple-500/20 to-pink-500/20 rounded-full blur-[130px]"
        animate={{ 
          x: [0, -120, 50, 0], 
          y: [0, -90, 40, 0], 
          scale: [1, 1.45, 1.1, 1],
          opacity: [0.3, 0.6, 0.4, 0.3]
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-[32rem] h-[32rem] bg-gradient-to-r from-yellow-500/15 to-orange-400/15 rounded-full blur-[90px]"
        animate={{ 
          x: [0, 90, -40, 0], 
          y: [0, -50, 30, 0], 
          scale: [1, 1.25, 1.1, 1],
          opacity: [0.35, 0.5, 0.4, 0.35]
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 6 }}
      />

      <motion.div
        className="absolute top-3/4 right-1/3 w-[28rem] h-[28rem] bg-gradient-to-bl from-cyan-500/20 to-blue-400/20 rounded-full blur-[85px]"
        animate={{ 
          x: [-50, 70, -50], 
          y: [-30, 50, -30], 
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Floating particles for depth */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full blur-sm"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, (i % 2 ? 50 : -50), 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
