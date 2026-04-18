"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WindowFrame } from "./WindowFrame";
import { profile } from "@/data/profile";
import { Cpu, Network, Binary, Terminal, Code, User, Monitor, Hash, Activity, BarChart2 } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

const iconMap: Record<string, any> = {
  "Systems & Low-Level": Binary,
  "Operating Systems": Cpu,
  "Computer Networks": Network,
  "Full Stack & Scripting": Code,
  "Tools & Environment": Terminal,
  "Data & Analytics": BarChart2
};

const colorMap: Record<string, { color: string, border: string, bg: string, text: string, glow: string }> = {
  "Systems & Low-Level": { 
    color: "text-rose-400", 
    border: "border-rose-500/30", 
    bg: "bg-rose-500/5", 
    text: "rose", 
    glow: "shadow-rose-500/10"
  },
  "Operating Systems": { 
    color: "text-emerald-400", 
    border: "border-emerald-500/30", 
    bg: "bg-emerald-500/5", 
    text: "emerald", 
    glow: "shadow-emerald-500/10"
  },
  "Computer Networks": { 
    color: "text-amber-400", 
    border: "border-amber-500/30", 
    bg: "bg-amber-500/5", 
    text: "amber", 
    glow: "shadow-amber-500/10"
  },
  "Full Stack & Scripting": { 
    color: "text-sky-400", 
    border: "border-sky-500/30", 
    bg: "bg-sky-500/5", 
    text: "sky", 
    glow: "shadow-sky-500/10"
  },
  "Tools & Environment": { 
    color: "text-fuchsia-400", 
    border: "border-fuchsia-500/30", 
    bg: "bg-fuchsia-500/5", 
    text: "fuchsia", 
    glow: "shadow-fuchsia-500/10"
  },
  "Data & Analytics": { 
    color: "text-amber-400", 
    border: "border-amber-500/30", 
    bg: "bg-amber-500/5", 
    text: "amber", 
    glow: "shadow-amber-500/10"
  }
};

export const SkillsApp = React.memo(function SkillsApp({ isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const [stats, setStats] = useState({ cpu: 45, mem: 2.1 });

  // Simulated live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * (60 - 40) + 40),
        mem: (Math.random() * (2.4 - 2.0) + 2.0).toFixed(1) as any
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const skillCategories = profile.skillCategories.map(cat => ({
    ...cat,
    Icon: iconMap[cat.title] || Code,
    styles: colorMap[cat.title] || { 
      color: "text-zinc-400", 
      border: "border-zinc-500/20", 
      bg: "bg-zinc-500/5", 
      text: "zinc", 
      glow: "shadow-zinc-500/20"
    }
  }));

  const renderGauge = (label: string, value: number, max: number, color: string) => {
    const percent = (value / max) * 100;
    const bars = 20;
    const activeBars = Math.floor((percent / 100) * bars);
    
    return (
      <div className="flex items-center gap-2 mb-1">
        <span className="w-10 shrink-0">{label}</span>
        <span className="text-zinc-500">[</span>
        <span className={color}>
          {"|".repeat(activeBars)}
          <span className="opacity-20">{"|".repeat(bars - activeBars)}</span>
        </span>
        <span className="text-zinc-500">]</span>
        <span className="ml-2 opacity-80 text-[13px]">{percent.toFixed(1)}%</span>
      </div>
    );
  };

  return (
    <WindowFrame title="SysInfo — Neofetch v7.1.0" isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={100} initY={100} width="w-[1000px] max-w-[95vw]" onDragChange={setIsDragging}>
      <div className={`p-10 h-[680px] overflow-y-auto custom-scrollbar font-mono transition-colors duration-500 ${isRice ? 'bg-black/90 text-purple-300' : 'bg-[#1e1e2e] text-cyan-300'}`}>
        
        {/* Header Stats / htop style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 border-b pb-12 border-white/5">
          <div className="space-y-2">
            {renderGauge("CPU", stats.cpu, 100, isRice ? "text-purple-400" : "text-cyan-400")}
            {renderGauge("MEM", (stats.mem as any) * 10, 160, isRice ? "text-pink-400" : "text-emerald-400")}
            <div className="flex items-center gap-3 text-[13px] uppercase tracking-widest opacity-40 mt-5 font-black">
               <Activity size={14} /> System Status: Operational
            </div>
          </div>
          <div className="text-[14px] space-y-2 opacity-70">
            <div className="flex justify-between"><span>Tasks:</span> <span className="text-white">184 Total, 1 Running</span></div>
            <div className="flex justify-between"><span>Uptime:</span> <span className="text-white">14d, 22h, 15m</span></div>
            <div className="flex justify-between"><span>Load Avg:</span> <span className="text-white">0.02 0.05 0.08</span></div>
          </div>
        </div>

        {/* Neofetch Section */}
        <div className="flex flex-col md:flex-row gap-16 mb-20 items-start">
          {/* ASCII Logo */}
          <div className={`text-base leading-none select-none font-black ${isRice ? 'text-purple-500' : 'text-cyan-500'}`}>
            <pre>
{`         .---.
        /     \\
       | () () |
        \\  ^  /
         |||||
         |||||
      '--hhhhh--'
     /           \\
    |             |
    |             |
    \\___________/
     |         |
     |         |`}
            </pre>
          </div>

          {/* System Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
               <User size={22} className={isRice ? "text-pink-400" : "text-cyan-400"} />
               <span className="font-black text-xl uppercase tracking-[0.2em]">{profile.username} @ tanish-os</span>
            </div>
            
            <div className="space-y-2.5 text-[14px]">
              <div className="flex gap-6"><span className="w-28 opacity-40 uppercase">OS</span> <span className="font-bold">TanOS 1.0 (Gentoo-based)</span></div>
              <div className="flex gap-6"><span className="w-28 opacity-40 uppercase">Kernel</span> <span className="font-bold">bad company 2.4.9</span></div>
              <div className="flex gap-6"><span className="w-28 opacity-40 uppercase">Shell</span> <span className="font-bold">zsh 5.9</span></div>
              <div className="flex gap-6"><span className="w-28 opacity-40 uppercase">DE/WM</span> <span className="font-bold">Dreamland</span></div>
              <div className="flex gap-6"><span className="w-28 opacity-40 uppercase">Terminal</span> <span className="font-bold">alacritty</span></div>
              <div className="flex gap-6"><span className="w-28 opacity-40 uppercase">Theme</span> <span className="font-bold">{isRice ? "Catppuccin Mocha" : "Tokyo Night"}</span></div>
            </div>

            {/* Color Palette */}
            <div className="flex gap-4 mt-10">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className={`w-10 h-5 rounded-sm ${
                   i === 1 ? "bg-red-400" : 
                   i === 2 ? "bg-green-400" :
                   i === 3 ? "bg-yellow-400" :
                   i === 4 ? "bg-blue-400" :
                   i === 5 ? "bg-purple-400" : "bg-cyan-400"
                 }`} />
               ))}
            </div>
          </div>
        </div>

        {/* Skills Section Styled as System Report */}
        <div className="mt-20">
          <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-4">
             <Hash size={22} className="opacity-40" />
             <span className="text-[14px] font-black uppercase tracking-[0.3em] opacity-40 italic">Skillsets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((cat, idx) => {
              const IconComp = cat.Icon;
              const { color, border, bg, text, glow } = cat.styles;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: idx * 0.1 }}
                  key={cat.title} 
                  className={`p-8 rounded-2xl border-2 group transition-all duration-300 relative overflow-hidden ${border} ${bg} hover:shadow-2xl ${glow} hover:scale-[1.02]`}
                >
                  {/* Decorative Background ID */}
                  <div className={`absolute -right-4 -top-4 text-7xl font-black opacity-[0.03] select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity`}>
                    0{idx + 1}
                  </div>

                  <div className="flex flex-col gap-6 relative z-10">
                    <div className="flex items-center gap-5">
                      <div className={`p-4 rounded-2xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-6 ${bg.replace('/5', '/20')} ${color}`}>
                        <IconComp size={28} />
                      </div>
                      <div className="flex flex-col">
                        <h3 className={`text-base font-black uppercase tracking-wider leading-none mb-1 ${color}`}>
                          {cat.title}
                        </h3>
                        <span className="text-[10px] opacity-40 font-bold tracking-[0.2em] uppercase">Status: Mounted / rw</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {cat.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-4 group/item">
                           <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isRice ? 'bg-purple-500/20' : 'bg-cyan-500/20'} group-hover/item:scale-150 ${color.replace('text-', 'bg-').replace('400', '500')}`} />
                           <span className="text-sm font-bold opacity-70 group-hover:opacity-100 group-hover/item:translate-x-2 transition-all duration-300">
                             {skill}
                           </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer Info */}
                    <div className="pt-4 border-t border-white/5 flex justify-between items-center opacity-30 text-[10px] font-black uppercase">
                       <span>v2.4.9</span>
                       <span>Report-#{Math.floor(Math.random() * 900) + 100}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </WindowFrame>
  );
});
