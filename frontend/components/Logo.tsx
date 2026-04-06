"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <motion.div 
      className={`flex-shrink-0 ${className}`}
      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
      transition={{ duration: 0.5 }}
    >
      <Image
        src="/govt-logo.svg"
        alt="Government of India"
        width={size}
        height={size}
        className="object-contain drop-shadow-md"
        priority
      />
    </motion.div>
  );
}
