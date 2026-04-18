"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SuspendView({ onWake }: { onWake: () => void }) {
  const [phase, setPhase] = useState<'pulse' | 'binary'>('pulse');
  
  useEffect(() => {
    const timer = setTimeout(() => setPhase('binary'), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onWake}
      className="fixed inset-0 z-[10000] bg-black cursor-none overflow-hidden flex items-center justify-center"
    >
      <AnimatePresence mode="wait">
        {phase === 'pulse' ? (
          <motion.div 
            key="pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.4, 0.2],
                filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-64 h-64 bg-blue-500/10 rounded-full"
            />
            <div className="flex text-blue-300 font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-center items-center h-8">
              {"System is going on sleep mode...".split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ 
                    opacity: [0.2, 1, 0.2],
                    y: [0, -8, 0],
                    textShadow: [
                      "0 0 0px rgba(147,197,253,0)", 
                      "0 0 20px rgba(147,197,253,1)", 
                      "0 0 0px rgba(147,197,253,0)"
                    ]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    delay: i * 0.08,
                    ease: [0.45, 0, 0.55, 1] // Smoother custom cubic-bezier
                  }}
                  className={char === " " ? "w-2 md:w-4" : "inline-block"}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ) : (
          <BinaryRain key="binary" />
        )}
      </AnimatePresence>
      
      {/* Interaction Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/10 font-mono text-[10px] uppercase tracking-widest pointer-events-none">
        Click anywhere to wake
      </div>
    </motion.div>
  );
}

function BinaryRain() {
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const cols = Math.floor(window.innerWidth / 20);
    const newColumns = Array.from({ length: cols }).map((_, i) => ({
      id: i,
      left: `${(i / cols) * 100}%`,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
      opacity: 0.30 + Math.random() * 0.55,
      chars: Array.from({ length: 20 }).map(() => Math.round(Math.random()))
    }));
    setColumns(newColumns);
  }, []);

  return (
    <div className="absolute inset-0 flex">
      {columns.map((col) => (
        <motion.div 
          key={col.id}
          initial={{ y: -1000 }}
          animate={{ y: 2000 }}
          transition={{ 
            duration: col.duration, 
            repeat: Infinity, 
            ease: "linear",
            delay: col.delay 
          }}
          className="absolute flex flex-col gap-2 font-mono text-xs select-none"
          style={{ left: col.left, opacity: col.opacity }}
        >
          {col.chars.map((char: number, idx: number) => (
            <span key={idx} className={idx === col.chars.length - 1 ? "text-green-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" : "text-green-700/75"}>
              {char}
            </span>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
