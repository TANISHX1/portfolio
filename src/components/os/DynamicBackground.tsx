"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import { useTheme } from "@/context/ThemeContext";

export function DynamicBackground() {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pre-calculate random values for particles to avoid hydration mismatch
  const particles = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: `${(i * 7) % 100}%`,
      top: `${(i * 13) % 100}%`,
      duration: 10 + (i % 5) * 2,
      delay: (i % 10) * 2,
      x: (i % 3 === 0 ? 100 : -100) * (i % 5),
      y: (i % 2 === 0 ? -150 : 150),
    }));
  }, []);

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden transition-colors duration-1000 ${isRice ? 'bg-[#050505]' : 'bg-[#0a0a0c]'}`}>
      {/* Base Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 ${
        isRice ? 'from-[#0d0e12] via-[#050505] to-black opacity-100' : 'from-[#1a1c1e] via-[#0f1113] to-[#0a0a0c] opacity-100'
      }`} />
      
      {/* Animated Glow 1 */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
        className={`absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[100px] transition-colors duration-1000 ${
          isRice ? 'bg-purple-600/10' : 'bg-blue-500/10'
        }`}
      />

      {/* Animated Glow 2 */}
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 1.05, 1.15, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
        className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[100px] transition-colors duration-1000 ${
          isRice ? 'bg-pink-600/5' : 'bg-purple-500/10'
        }`}
      />

      {/* Bokeh / Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {mounted && particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.2, x: 0, y: 0 }}
            animate={{
              x: [0, p.x, 0],
              y: [0, p.y, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
            style={{ 
              left: p.left, 
              top: p.top,
              willChange: "transform, opacity"
            }}
            className={`absolute w-1.5 h-1.5 rounded-full blur-[0.5px] transition-colors duration-1000 ${
              isRice ? 'bg-purple-300/40' : 'bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Scenic Image Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          isRice 
            ? "bg-[url('/background2.jpg')] opacity-60 mix-blend-screen grayscale-[0.2] brightness-[0.7]" 
            : "bg-[url('/background1.jpg')] opacity-80"
        }`} 
      />
      
      {/* Scanlines / Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
