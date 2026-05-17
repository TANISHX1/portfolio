"use client";

import React from "react";
import { WindowFrame } from "./WindowFrame";
import { profile } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";
import { User, MapPin, Briefcase } from "lucide-react";

export const AboutApp = React.memo(function AboutApp({ isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  return (
    <WindowFrame title="About Developer" isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={150} initY={150} width="w-[600px] max-w-[95vw]" height="h-[450px]" onDragChange={setIsDragging}>
      <div className={`p-8 h-full overflow-y-auto custom-scrollbar transition-colors duration-500 ${isRice ? 'bg-black/90 text-purple-100' : 'bg-white/90 text-zinc-900'}`}>
        <div className="flex items-start gap-8">
          <div className="w-32 h-32 rounded-2xl bg-black/10 border-2 border-black/20 dark:border-white/20 flex flex-shrink-0 items-center justify-center overflow-hidden">
             <User size={64} className="opacity-50" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-2">{profile.name}</h2>
            <p className="text-lg opacity-60 font-medium mb-6">{profile.role}</p>

            <div className="flex gap-6 mb-8">
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-xl ${isRice ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/10 text-blue-500'}`}>
                   <MapPin size={20} />
                 </div>
                 <div>
                   <span className="block text-[10px] uppercase font-bold opacity-50">Location</span>
                   <span className="text-sm font-semibold">India</span>
                 </div>
              </div>
              
              <div className="flex items-center gap-3">
                 <div className={`p-2 rounded-xl ${isRice ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/10 text-blue-500'}`}>
                   <Briefcase size={20} />
                 </div>
                 <div>
                   <span className="block text-[10px] uppercase font-bold opacity-50">Status</span>
                   <span className="text-sm font-semibold">Open to Work</span>
                 </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase font-bold opacity-50 mb-3 tracking-widest border-b border-black/10 dark:border-white/10 pb-2">Biography</h3>
              <p className="text-[14px] leading-relaxed opacity-80 whitespace-pre-wrap">
                {profile.bio || profile.longDesc || "Passionate software engineer building high-performance systems and dynamic web experiences."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
});
