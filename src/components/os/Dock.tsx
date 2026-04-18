"use client";

import { motion } from "framer-motion";
import { desktopIcons, socialIcons } from "@/data/desktop";

import { useTheme } from "@/context/ThemeContext";

interface DockProps {
  onOpenApp: (id: any) => void;
  onToggleMinimize: (id: any) => void;
  openApps: string[];
  activeApp: string | null;
  isDragging?: boolean;
}

export function Dock({ onOpenApp, onToggleMinimize, openApps, activeApp, isDragging }: DockProps) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  return (
    <div id="dock" className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-3 backdrop-blur-[24px] border transition-all duration-500 rounded-3xl shadow-2xl ${
      isRice 
        ? "bg-black/40 border-purple-500/20 shadow-purple-500/10 ring-1 ring-purple-500/20" 
        : "bg-white/40 border-white/60 shadow-xl ring-1 ring-white/20"
    }`}>
      {desktopIcons.filter(app => {
        if (app.id === "ProjectDetail") return openApps.includes("ProjectDetail");
        return true;
      }).map((app) => {
        const isOpen = openApps.includes(app.id);
        const isActive = activeApp === app.id;
        
        return (
          <motion.button
            key={app.id}
            id={app.id === "Terminal" ? "term-icon" : app.id === "Projects" ? "projects-icon" : undefined}
            onClick={() => {
              if (isActive) {
                onToggleMinimize(app.id);
              } else {
                onOpenApp(app.id);
              }
            }}
            whileHover={{ 
              scale: 1.3, 
              y: -15,
              transition: { type: "spring", stiffness: 500, damping: 15 }
            }}
            whileTap={{ 
              scaleX: 1.4, 
              scaleY: 0.6,
              y: 2,
              transition: { type: "spring", stiffness: 1000, damping: 20 }
            }}
            layout
            className={`group relative p-2.5 rounded-xl transition-all ${
              isActive 
                ? (isRice ? "bg-purple-500/20" : "bg-black/10") 
                : "hover:bg-white/5"
            }`}
          >
            <app.icon className={`w-6 h-6 transition-colors ${
              isActive 
                ? (isRice ? "text-purple-400" : "text-blue-500") 
                : (isRice ? "text-zinc-400 group-hover:text-purple-300" : "text-[#31363b] opacity-70 group-hover:opacity-100")
            }`} />
            
            {isOpen && (
              <motion.div 
                layoutId={`indicator-${app.id}`}
                className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-0.5 rounded-full transition-all ${
                  isRice ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                }`}
              />
            )}
            
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity ${
              isRice ? "bg-zinc-800 text-purple-300 border border-purple-500/20" : "bg-[#31363b] text-white"
            }`}>
              {app.label}
            </div>
          </motion.button>
        );
      })}

      <div className={`w-px h-6 mx-1 ${isRice ? "bg-purple-500/20" : "bg-black/10"}`} />

      {socialIcons.map((social) => (
        <motion.a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2, y: -10 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="group relative p-2.5 rounded-xl hover:bg-white/5 transition-all"
        >
          <social.icon className={`w-5 h-5 transition-colors ${social.color} opacity-70 group-hover:opacity-100`} />
          <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity ${
            isRice ? "bg-zinc-800 text-purple-300 border border-purple-500/20" : "bg-[#31363b] text-white"
          }`}>
            {social.id}
          </div>
        </motion.a>
      ))}
    </div>
  );
}
