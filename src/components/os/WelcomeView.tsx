"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface WelcomeViewProps {
  onComplete: () => void;
}

export const WelcomeView = React.memo(function WelcomeView({ onComplete }: WelcomeViewProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Play the opening sound
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch((e: any) => console.warn("Audio playback blocked:", e));
    }

    const timer = setTimeout(() => {
      onComplete();
    }, 5500); // Fail-safe transition
    
    return () => clearTimeout(timer);
  }, [onComplete]);

  const words = "WELCOME TO TANXOS".split(" ");

  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden">
      <audio 
        ref={audioRef} 
        src="/background sounds/opening_sound.wav" 
        onEnded={onComplete}
        preload="auto"
      />
      
      {/* Dynamic Ambient Atmosphere */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] rounded-full bg-blue-600/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-purple-600/10 blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ letterSpacing: "0.2em", filter: "blur(12px)", opacity: 0 }}
          animate={{ 
            letterSpacing: ["0.2em", "0.6em", "0.5em"], 
            filter: ["blur(12px)", "blur(0px)", "blur(0px)"],
            opacity: [0, 1, 1, 0] 
          }}
          transition={{ 
            duration: 5,
            times: [0, 0.4, 0.8, 1],
            ease: "easeInOut"
          }}
          className="flex flex-wrap justify-center gap-x-8"
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-flex">
              {word.split("").map((char, charIdx) => (
                <motion.span
                  key={charIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: (wordIdx * word.length + charIdx) * 0.05 + 0.8,
                    duration: 1,
                    ease: "easeOut"
                  }}
                  className="text-white text-3xl md:text-5xl font-black uppercase inline-block drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ delay: 1.8, duration: 3.2, times: [0, 0.2, 0.8, 1] }}
          className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent mt-8 max-w-md mx-auto"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0.5, 0.5, 0] }}
          transition={{ delay: 2.5, duration: 2.5, times: [0, 0.2, 0.8, 1] }}
          className="text-blue-400 text-[10px] font-black uppercase tracking-[0.8em] mt-4"
        >
          Initializing graphical environment
        </motion.p>
      </div>
    </div>
  );
});
