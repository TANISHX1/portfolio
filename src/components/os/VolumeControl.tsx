"use client";

import React from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  setVolume: (vol: number) => void;
  onClose: () => void;
  isRice: boolean;
}

export function VolumeControl({ volume, setVolume, onClose, isRice }: VolumeControlProps) {
  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const relativeY = Math.max(0, Math.min(1, (rect.bottom - y) / rect.height));
    setVolume(Math.round(relativeY * 100));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className={`absolute top-10 right-0 w-16 p-3 rounded-2xl shadow-2xl z-[100] ${
        isRice ? 'bg-zinc-900 border border-purple-500/30' : 'bg-[#1e1e2e] border border-white/10'
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        {/* iOS Style Vertical Bar */}
        <div 
          className="relative w-8 h-40 bg-white/5 rounded-xl overflow-hidden cursor-pointer"
          onMouseDown={handleDrag}
          onMouseMove={(e) => e.buttons === 1 && handleDrag(e)}
        >
          <motion.div 
            className={`absolute bottom-0 left-0 right-0 w-full transition-all duration-75 ${
              isRice ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'
            }`}
            style={{ height: `${volume}%` }}
          />
          
          {/* Subtle Icon Overlays */}
          <div className="absolute inset-x-0 bottom-3 flex justify-center pointer-events-none opacity-40">
            {volume === 0 ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
          </div>
        </div>

        <span className={`text-[10px] font-black ${isRice ? 'text-purple-400' : 'text-blue-400'}`}>
          {volume}%
        </span>
      </div>
      
      {/* Invisible overlay to close when clicking outside */}
      <div 
        className="fixed inset-0 -z-10 bg-transparent" 
        onClick={onClose} 
      />
    </motion.div>
  );
}
