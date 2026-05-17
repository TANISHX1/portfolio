import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { ChevronLeft } from "lucide-react";

interface MobileFrameProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export function MobileFrame({ title, onClose, children, headerRight }: MobileFrameProps) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  return (
    <div className={`flex flex-col h-full w-full ${isRice ? 'bg-zinc-950 text-purple-100' : 'bg-[#0a0a0c] text-white'}`}>
      {/* Header Bar */}
      <div className={`flex items-center justify-between px-4 py-3 border-b shadow-sm ${isRice ? 'border-purple-900/30 bg-zinc-950' : 'border-white/5 bg-[#121215]'}`}>
        <button 
          onClick={onClose}
          className="flex items-center gap-1 text-sm font-medium opacity-80 active:opacity-50"
        >
          <ChevronLeft size={18} />
          Back
        </button>
        <span className="font-mono text-sm tracking-tight font-bold">{title}</span>
        <div className="w-12 flex justify-end">
          {headerRight}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative">
        {children}
      </div>
    </div>
  );
}
