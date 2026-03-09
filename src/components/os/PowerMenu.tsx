"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Power, Moon, X } from "lucide-react";

interface PowerMenuProps {
  onSelect: (option: 'restart' | 'shutdown' | 'suspend') => void;
  onClose: () => void;
  isRice: boolean;
}

export function PowerMenu({ onSelect, onClose, isRice }: PowerMenuProps) {
  const options = [
    { id: 'suspend', label: 'Suspend', icon: Moon, color: 'text-blue-400', hover: 'hover:bg-blue-500/10' },
    { id: 'restart', label: 'Restart', icon: RotateCw, color: 'text-orange-400', hover: 'hover:bg-orange-500/10' },
    { id: 'shutdown', label: 'Power Off', icon: Power, color: 'text-red-400', hover: 'hover:bg-red-500/10' },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[100] cursor-default" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className={`absolute top-10 right-3 z-[101] w-48 backdrop-blur-2xl border shadow-2xl rounded-xl overflow-hidden p-2 ${
          isRice ? 'bg-black/90 border-purple-500/20 shadow-purple-500/10' : 'bg-zinc-900/90 border-white/10 shadow-2xl'
        }`}
      >
        <div className="flex flex-col gap-1">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onSelect(opt.id as any);
                onClose();
              }}
              className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all group ${opt.hover}`}
            >
              <div className={`p-2 rounded-md ${isRice ? 'bg-white/5' : 'bg-white/5'} ${opt.color}`}>
                <opt.icon size={16} />
              </div>
              <span className={`text-xs font-bold ${isRice ? 'text-purple-100' : 'text-zinc-300'}`}>
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </>
  );
}
