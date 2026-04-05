"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";

const TOTAL_FRAMES = 56;
const FRAME_PATH = '/ezgif-frame';

export default function HeroCanvasAnimation() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring eased progress for smooth frame transitions
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Frame index mapping
  const frameIndex = useTransform(springProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Anti-gravity tuning: smooth velocity tracking mapped to [-8px, 0px, 8px]
  const scrollVelocity = useVelocity(scrollYProgress);
  const yOffset = useTransform(scrollVelocity, [-1, 0, 1], [8, 0, -8], { clamp: true });

  // Efficient image preloading
  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const onLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
      // Update state ONLY once after all images are loaded
      if (loadedCount === TOTAL_FRAMES) {
        imagesRef.current = preloadedImages;
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = `${FRAME_PATH}-${i}.png`;
        img.onload = onLoad;
        preloadedImages.push(img);
    }
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clamp frame index
    const currentFrameIndex = Math.max(0, Math.min(Math.round(index), TOTAL_FRAMES - 1));
    const currentImg = imagesRef.current[currentFrameIndex];
    if (!currentImg) return;

    // Device Pixel Ratio and optimization handling
    const dpr = window.devicePixelRatio || 1;
    const scaleFactor = window.innerWidth < 768 ? 0.8 : 1;
    
    const targetWidth = window.innerWidth * dpr * scaleFactor;
    const targetHeight = window.innerHeight * dpr * scaleFactor;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.scale(dpr * scaleFactor, dpr * scaleFactor);
    }

    // ALWAYS clear canvas
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // Maintain aspect ratio via contain fit mapping
    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    const canvasAspectRatio = logicalWidth / logicalHeight;
    const imgAspectRatio = currentImg.width / currentImg.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspectRatio > canvasAspectRatio) {
      drawWidth = logicalWidth;
      drawHeight = logicalWidth / imgAspectRatio;
      offsetX = 0;
      offsetY = (logicalHeight - drawHeight) / 2;
    } else {
      drawHeight = logicalHeight;
      drawWidth = logicalHeight * imgAspectRatio;
      offsetX = (logicalWidth - drawWidth) / 2;
      offsetY = 0;
    }

    // Always center image
    ctx.drawImage(currentImg, offsetX, offsetY, drawWidth, drawHeight);
  };

  // Rendering only happens via frameIndex changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      renderFrame(latest);
    }
  });

  // Initial draw & resize handler
  useEffect(() => {
    if (!isLoaded) return;
    renderFrame(frameIndex.get());

    const handleResize = () => renderFrame(frameIndex.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  // Opacity Map Fixes (No Overlaps)
  const op1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.85, 0.92, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#020617] w-full">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617] text-[#F8FAFC]">
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl font-serif text-[#D4AF37] tracking-wider">OBJECTION</div>
            <div className="text-sm font-sans tracking-[0.2em] uppercase text-[#F8FAFC]/40 font-light">Initializing Environment {loadProgress}%</div>
          </div>
        </div>
      )}

      {/* Sticky Canvas & Viewport */}
      <div className={`sticky top-0 h-screen w-full overflow-hidden pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Anti-gravity container */}
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#081429]"
          style={{ y: yOffset }}
        >
          <canvas
            ref={canvasRef}
            className="block"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

          {/* Cinematic Mask / Vignette to hide watermark and blend edges */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.2)_60%,rgba(2,6,23,0.8)_100%)]" />
          
          {/* Watermark Blocker (Bottom Right) */}
          <div className="absolute bottom-0 right-0 w-32 h-16 bg-[#020617] blur-2xl opacity-80" />
        </motion.div>

        {/* Text Overlays - Refined Typography & Spacing */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: op1 }} className="absolute text-center px-4 w-full">
            <h1 className="text-5xl md:text-8xl font-serif text-[#F8FAFC] tracking-tight leading-tight">Justice, <span className="italic text-[#D4AF37]">Redefined</span></h1>
          </motion.div>

          <motion.div style={{ opacity: op2 }} className="absolute text-center px-4 w-full">
            <h2 className="text-4xl md:text-6xl font-serif text-[#F8FAFC] leading-tight">Every Document <br/> <span className="text-[#D4AF37]">Is Truth</span></h2>
          </motion.div>

          <motion.div style={{ opacity: op3 }} className="absolute text-center px-4 w-full">
            <h2 className="text-4xl md:text-6xl font-serif text-[#F8FAFC] tracking-tight">Immutable. Verifiable. <br/> <span className="italic">Absolute.</span></h2>
          </motion.div>

          <motion.div style={{ opacity: op4 }} className="absolute text-center pointer-events-auto px-4 w-full flex flex-col items-center justify-center gap-12">
            <h2 className="text-5xl md:text-8xl font-serif text-[#F8FAFC] tracking-tighter">Enter The Vault</h2>
            <Link href="/login" className="group relative px-10 py-5 bg-transparent overflow-hidden rounded-full border border-[#D4AF37]/50 text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold hover:text-[#020617] transition-colors duration-500 pointer-events-auto">
              <span className="relative z-10">Access Portal</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
