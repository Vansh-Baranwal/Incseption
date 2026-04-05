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

    // Fill with warm background first to avoid any flash/gaps
    ctx.fillStyle = "#1a1410";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const logicalWidth = window.innerWidth;
    const logicalHeight = window.innerHeight;

    const imgAspectRatio = currentImg.width / currentImg.height;
    const canvasAspectRatio = logicalWidth / logicalHeight;

    let drawWidth, drawHeight, offsetX, offsetY;

    // Use "cover" fit — fill viewport, crop overflow (no bars)
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
  }, [isLoaded]);

  const op1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [0, 1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
  const op4 = useTransform(scrollYProgress, [0.85, 0.92, 0.98, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#1a1410] w-full">
      {/* Loading Screen */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1410]">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-serif text-[#e8e4df]">Objection.ai</h1>
            <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-white/30 transition-all duration-200 rounded-full" style={{width: `${loadProgress}%`}} />
            </div>
            <p className="text-xs text-white/30">{loadProgress}%</p>
          </div>
        </div>
      )}

      {/* Sticky Canvas */}
      <div className={`sticky top-0 h-screen w-full overflow-hidden pointer-events-none flex items-center justify-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#1a1410]"
          style={{ y: yOffset }}
        >
          <canvas
            ref={canvasRef}
            className="block"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />

          {/* Soft vignette — warm tones matching the video */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse at center, transparent 30%, rgba(26,20,16,0.4) 65%, rgba(26,20,16,0.95) 100%)"
          }} />
          
          {/* Bottom watermark cover */}
          <div className="absolute bottom-0 left-0 right-0 h-20" style={{
            background: "linear-gradient(to top, #1a1410, transparent)"
          }} />
        </motion.div>

        {/* Text Overlays */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div style={{ opacity: op1 }} className="absolute text-center px-6 w-full max-w-4xl">
            <h1 className="text-4xl md:text-7xl font-serif text-white leading-[1.1] drop-shadow-2xl">
              Justice, Redefined.
            </h1>
          </motion.div>

          <motion.div style={{ opacity: op2 }} className="absolute text-center px-6 w-full max-w-4xl">
            <h2 className="text-3xl md:text-6xl font-serif text-white leading-[1.15] drop-shadow-2xl">
              Every Document<br />Is Truth.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: op3 }} className="absolute text-center px-6 w-full max-w-4xl">
            <h2 className="text-3xl md:text-6xl font-serif text-white leading-[1.15] drop-shadow-2xl">
              Immutable. Verifiable.<br />Absolute.
            </h2>
          </motion.div>

          <motion.div style={{ opacity: op4 }} className="absolute text-center pointer-events-auto px-6 w-full max-w-4xl flex flex-col items-center gap-8">
            <h2 className="text-4xl md:text-7xl font-serif text-white drop-shadow-2xl">Enter The Vault</h2>
            <Link 
              href="/login" 
              className="px-8 py-3 bg-white text-[#1a1410] text-sm font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
