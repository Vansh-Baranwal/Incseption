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
import { useTheme } from "next-themes";

const TOTAL_FRAMES = 56;
const FRAME_PATH = '/ezgif-frame';

export default function HeroCanvasAnimation() {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const frameIndex = useTransform(springProgress, [0, 1], [0, TOTAL_FRAMES - 1]);
  const scrollVelocity = useVelocity(scrollYProgress);
  const yOffset = useTransform(scrollVelocity, [-1, 0, 1], [8, 0, -8], { clamp: true });

  useEffect(() => {
    let loadedCount = 0;
    const preloadedImages: HTMLImageElement[] = [];

    const onLoad = () => {
      loadedCount++;
      setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
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

    const currentFrameIndex = Math.max(0, Math.min(Math.round(index), TOTAL_FRAMES - 1));
    const currentImg = imagesRef.current[currentFrameIndex];
    if (!currentImg) return;

    const dpr = window.devicePixelRatio || 1;
    const scaleFactor = window.innerWidth < 768 ? 0.8 : 1;
    
    const targetWidth = window.innerWidth * dpr * scaleFactor;
    const targetHeight = window.innerHeight * dpr * scaleFactor;

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.scale(dpr * scaleFactor, dpr * scaleFactor);
    }

    // Fill with theme background
    ctx.fillStyle = theme === "dark" ? "#1a1410" : "#fcfbf9";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    const imgAspectRatio = currentImg.width / currentImg.height;
    const canvasAspectRatio = logicalWidth / logicalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imgAspectRatio > canvasAspectRatio) {
      drawHeight = logicalHeight;
      drawWidth = logicalHeight * imgAspectRatio;
      offsetX = (logicalWidth - drawWidth) / 2;
      offsetY = 0;
    } else {
      drawWidth = logicalWidth;
      drawHeight = logicalWidth / imgAspectRatio;
      offsetX = 0;
      offsetY = (logicalHeight - drawHeight) / 2;
    }

    ctx.drawImage(currentImg, offsetX, offsetY, drawWidth, drawHeight);
  };

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isLoaded) {
      renderFrame(latest);
    }
  });

  useEffect(() => {
    if (!isLoaded) return;
    renderFrame(frameIndex.get());

    const handleResize = () => renderFrame(frameIndex.get());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, theme]);

  const op1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.85, 0.92, 0.98, 1], [0, 1, 1, 0]);

  const vignetteColor = theme === "dark" ? "rgba(26,20,16,0.95)" : "rgba(252,251,249,0.95)";
  const vignetteMid = theme === "dark" ? "rgba(26,20,16,0.4)" : "rgba(252,251,249,0.4)";

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background w-full transition-colors duration-300">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-serif text-foreground">Objection.ai</h1>
            <div className="w-48 h-[2px] bg-foreground/5 rounded-full overflow-hidden">
              <div className="h-full bg-foreground/30 transition-all duration-200 rounded-full" style={{width: `${loadProgress}%`}} />
            </div>
            <p className="text-xs text-foreground/30">{loadProgress}%</p>
          </div>
        </div>
      )}

      {/* Sticky Canvas */}
      <div className={`sticky top-0 h-screen w-full overflow-hidden pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-background"
          style={{ y: yOffset }}
        >
          <canvas
            ref={canvasRef}
            className={`block transition-all duration-700 ${theme === 'light' ? 'brightness-[1.05] contrast-[1.05]' : 'brightness-100'}`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

          {/* Soft vignette — dynamic based on theme */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse at center, transparent 30%, ${vignetteMid} 65%, ${vignetteColor} 100%)`
          }} />
          
          {/* Bottom gradient cover */}
          <div className="absolute bottom-0 left-0 right-0 h-32" style={{
            background: `linear-gradient(to top, var(--background), transparent)`
          }} />
        </motion.div>

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: op1 }} className="absolute text-center px-6 w-full max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-serif text-foreground leading-[1.1] drop-shadow-sm">
              Justice, Redefined.
            </h1>
          </motion.div>

          <motion.div style={{ opacity: op2 }} className="absolute text-center px-6 w-full max-w-4xl">
            <h2 className="text-3xl md:text-6xl font-serif text-foreground leading-[1.15] drop-shadow-sm">
              Every Document<br />Is Truth.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: op3 }} className="absolute text-center px-6 w-full max-w-4xl">
            <h2 className="text-3xl md:text-6xl font-serif text-foreground leading-[1.15] drop-shadow-sm">
              Immutable. Verifiable.<br />Absolute.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: op4 }} className="absolute text-center pointer-events-auto px-6 w-full max-w-4xl flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-7xl font-serif text-foreground drop-shadow-sm">Enter The Vault</h2>
            <Link 
              href="/login" 
              className="px-8 py-3 bg-foreground text-background text-sm font-medium rounded-md hover:opacity-90 transition-all font-sans"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
