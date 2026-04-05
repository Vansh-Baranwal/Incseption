"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
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
    </div>
  );
}
