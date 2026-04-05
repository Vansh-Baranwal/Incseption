"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor({ imageUrl }: { imageUrl?: string }) {
  const [mounted, setMounted] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // High stiffness and low damping for snappy pointer tracking
  const springX = useSpring(mouseX, { stiffness: 1000, damping: 40, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 1000, damping: 40, mass: 0.1 });

  useEffect(() => {
    setMounted(true);

    const updateMousePosition = (e: MouseEvent) => {
      // Adjust offset so the "hit point" of the hammer aligns reasonably well with the actual mouse
      mouseX.set(e.clientX - 20);
      mouseY.set(e.clientY - 20);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:block"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <motion.img 
        src={imageUrl || "/gavel.svg"} 
        alt="" 
        className="w-14 h-14 object-contain origin-bottom-left"
        style={{ filter: "drop-shadow(4px 6px 8px rgba(0,0,0,0.4))" }} 
        animate={{
          rotate: isClicking ? -45 : 0,
          scale: isClicking ? 0.95 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 700, 
          damping: 15,
          mass: 0.5
        }}
      />
    </motion.div>
  );
}
