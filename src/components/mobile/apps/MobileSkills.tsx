"use client";

import React from "react";
import { motion } from "framer-motion";
import { MobileFrame } from "../MobileFrame";
import { profile } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";
import { Cpu, Network, Binary, Terminal, Code, BarChart2, Hash } from "lucide-react";

const iconMap: Record<string, any> = {
  "Systems & Low-Level": Binary,
  "Operating Systems": Cpu,
  "Computer Networks": Network,
  "Full Stack & Scripting": Code,
  "Tools & Environment": Terminal,
  "Data & Analytics": BarChart2
};

const colorMap: Record<string, { color: string, border: string, bg: string }> = {
  "Systems & Low-Level": { color: "text-rose-400", border: "border-rose-500/30", bg: "bg-rose-500/10" },
  "Operating Systems": { color: "text-emerald-400", border: "border-emerald-500/30", bg: "bg-emerald-500/10" },
  "Computer Networks": { color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" },
  "Full Stack & Scripting": { color: "text-sky-400", border: "border-sky-500/30", bg: "bg-sky-500/10" },
  "Tools & Environment": { color: "text-fuchsia-400", border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10" },
  "Data & Analytics": { color: "text-amber-400", border: "border-amber-500/30", bg: "bg-amber-500/10" }
};

export const MobileSkills = React.memo(function MobileSkills({ onClose }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  const skillCategories = profile.skillCategories.map(cat => ({
    ...cat,
    Icon: iconMap[cat.title] || Code,
    styles: colorMap[cat.title] || { 
      color: "text-zinc-400", border: "border-zinc-500/20", bg: "bg-zinc-500/10"
    }
  }));

  return (
    <MobileFrame title="System Info" onClose={onClose}>
      <div className={`p-4 h-full ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        <div className="flex flex-col gap-6">
          <div className="text-center py-6 border-b border-white/5">
             <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-4 shadow-lg shadow-white/5">
                <Cpu size={32} className={isRice ? "text-purple-400" : "text-cyan-400"} />
             </div>
             <h2 className="text-xl font-bold uppercase tracking-widest">{profile.username}</h2>
             <p className="text-[12px] opacity-60 font-mono mt-1">Mobile OS v3.0 // Status: OK</p>
          </div>

          <div className="flex items-center gap-3">
             <Hash size={18} className="opacity-40" />
             <span className="text-[12px] font-bold uppercase tracking-[0.2em] opacity-50">Skill Matrix</span>
          </div>

          <div className="flex flex-col gap-4 pb-12">
            {skillCategories.map((cat, idx) => {
              const IconComp = cat.Icon;
              const { color, border, bg } = cat.styles;
              
              return (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: idx * 0.05 }}
                  key={cat.title} 
                  className={`p-5 rounded-2xl border ${border} bg-black/40 backdrop-blur-sm relative overflow-hidden`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${bg} ${color}`}>
                      <IconComp size={20} />
                    </div>
                    <h3 className={`text-[13px] font-bold uppercase tracking-wide ${color}`}>
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-semibold opacity-90">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </MobileFrame>
  );
});
