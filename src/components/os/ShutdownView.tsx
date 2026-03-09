"use client";

import { motion } from "framer-motion";
import { Power } from "lucide-react";

export function ShutdownView({ onPowerOn }: { onPowerOn: () => void }) {
  return (
    <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPowerOn}
        className="group flex flex-col items-center gap-4"
      >
        <div className="w-20 h-20 rounded-full border-2 border-white/10 flex items-center justify-center transition-all group-hover:border-red-500/50 group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <Power size={32} className="text-white/20 group-hover:text-red-500 transition-colors" />
        </div>
        <span className="text-white/10 font-mono text-[10px] uppercase tracking-[0.4em] group-hover:text-white/30 transition-colors">
          Power On
        </span>
      </motion.button>
    </div>
  );
}
