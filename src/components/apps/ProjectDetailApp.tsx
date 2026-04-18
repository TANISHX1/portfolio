"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowFrame } from "./WindowFrame";
import { Project } from "@/data/projects";
import { projectManuals } from "@/data/manuals";
import { useTheme } from "@/context/ThemeContext";
import { 
  Cpu, Layers, Zap, CheckCircle2, Globe, Github, Info, BookOpen, X, Terminal, 
  Settings, Activity, LayoutGrid, Music, Palette, Eye, Layout, Gamepad2, 
  Database, HardDrive, Box, Image as ImageIcon, FileCode2
} from "lucide-react";

const getProjectIcon = (project: Project) => {
  // Specific Project Overrides
  if (project.name === "seat-allocation-sys") return LayoutGrid;
  if (project.name === "unix-utilities") return Terminal;
  if (project.name === "Audio Processing") return Music;
  if (project.name === "Graphics-Engine") return Palette;
  if (project.name === "image_detector") return Eye;
  if (project.name === "Bitwixt") return Layout;
  if (project.name === "Server") return Globe;
  if (project.name.includes("Hangman")) return Gamepad2;
  if (project.name === "DBMS in C++") return Database;
  if (project.name === "Concurrency") return Cpu;

  // Category Based Defaults
  switch (project.category) {
    case "Core Systems & Algorithms": return Database;
    case "Operating Systems": return HardDrive;
    case "Simulation": return Activity;
    case "C/C++ Programmes": return FileCode2;
    case "Entertainment": return Gamepad2;
    case "Networking & Distributed Systems": return Globe;
    case "AI & Computer Vision": return ImageIcon;
    case "Creative Web": return Layout;
    default: return Box;
  }
};

interface ProjectDetailProps {
  project: Project;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onClick: () => void;
  setIsDragging: (isDragging: boolean) => void;
}

export const ProjectDetailApp = React.memo(function ProjectDetailApp({ 
  project, isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging 
}: ProjectDetailProps) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const [showManual, setShowManual] = useState(false);
  const manual = projectManuals[project.name];
  const Icon = getProjectIcon(project);

  return (
    <WindowFrame 
      title={`Project Info — ${project.name}`} 
      isActive={isActive} 
      isMinimized={isMinimized} 
      onClose={onClose} 
      onMinimize={onMinimize} 
      onClick={onClick} 
      onDragChange={setIsDragging}
      width="w-[700px] max-w-[95vw]" 
      height="h-[600px] max-h-[85vh]"
      initX={150}
      initY={50}
    >
      <div className={`flex flex-col h-full overflow-hidden relative ${isRice ? 'text-purple-100 bg-black/80' : 'text-zinc-800 bg-white/95'}`}>
        {/* Hero Section */}
        <div className={`p-8 shrink-0 relative overflow-hidden border-b ${
          isRice ? 'bg-purple-500/10 border-purple-500/20' : 'bg-cyan-500/5 border-zinc-200'
        }`}>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${isRice ? 'text-purple-400' : 'text-cyan-600'}`}>
                {project.category}
              </div>
              <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">{project.name}</h1>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                  isRice ? 'bg-purple-500/20 border-purple-500/30' : 'bg-zinc-100 border-zinc-300'
                }`}>
                  {project.language}
                </span>
                {project.githubUrl && (
                  <div className="flex items-center gap-4">
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1.5 text-[10px] font-bold hover:underline ${isRice ? 'text-purple-400' : 'text-blue-600'}`}
                    >
                      <Github size={12} /> Repo
                    </a>
                    {manual && (
                      <button 
                        onClick={() => setShowManual(true)}
                        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border transition-all ${
                          isRice 
                            ? 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/30' 
                            : 'bg-zinc-800 border-zinc-900 text-white hover:bg-black shadow-md'
                        }`}
                      >
                        <BookOpen size={12} />
                        Read More about Project
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={`p-6 rounded-3xl border ${
              isRice ? 'bg-purple-500/20 border-purple-500/40 shadow-[0_0_30_rgba(168,85,247,0.2)]' : 'bg-white border-zinc-200 shadow-xl'
            }`}>
              <Icon size={48} className={isRice ? 'text-purple-300' : 'text-cyan-500'} />
            </div>
          </div>
          
          {/* Animated glass effect background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
          <section className="mb-10">
            <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info size={14} className={isRice ? 'text-purple-400' : 'text-cyan-500'} />
              Abstract
            </h2>
            <p className={`text-sm leading-relaxed ${isRice ? 'text-purple-100/70' : 'text-zinc-600'}`}>
              {project.longDesc || project.desc}
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Features Case */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Zap size={14} className={isRice ? 'text-pink-400' : 'text-yellow-500'} />
                Core Capabilities
              </h2>
              <div className="space-y-3">
                {project.features?.map((feature, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                      isRice ? 'bg-white/5 border-purple-500/10 hover:border-purple-500/30' : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300'
                    }`}
                  >
                    <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${isRice ? 'text-purple-400' : 'text-green-500'}`} />
                    <span className="text-[11px] font-bold leading-tight">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Technical Highlights */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <Layers size={14} className={isRice ? 'text-cyan-400' : 'text-indigo-500'} />
                Technical Stack
              </h2>
              <div className="flex flex-col gap-2">
                {project.techHighlights?.map((highlight, i) => (
                  <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter border ${
                      isRice ? 'bg-purple-950/40 border-purple-500/20 text-purple-200' : 'bg-white border-zinc-200 text-zinc-700 shadow-sm'
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full ${isRice ? 'bg-purple-400' : 'bg-indigo-500'}`} />
                    {highlight}
                  </motion.div>
                ))}
              </div>
              
              <div className={`mt-6 p-6 rounded-2xl border transition-all ${
                isRice ? 'bg-black/60 border-purple-500/10' : 'bg-zinc-100 border-zinc-200'
              }`}>
                <div className="flex items-center gap-2 mb-2 text-[10px] font-black uppercase opacity-60">
                   <Activity size={12} /> Status
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${isRice ? 'bg-purple-500 shadow-[0_0_10px_#a855f7]' : 'bg-cyan-500'}`} 
                      />
                    </div>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest animate-pulse">{project.status || "Stable"}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className={`px-8 py-4 border-t flex items-center justify-between ${
          isRice ? 'bg-purple-500/5 border-purple-500/20' : 'bg-zinc-50 border-zinc-200'
        }`}>
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.3em]">© {new Date().getFullYear()} Tanish Shivhare Portfolio OS</span>
          <button 
            onClick={onClose}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
              isRice 
                ? 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/40 border border-purple-500/30' 
                : 'bg-zinc-800 text-white hover:bg-black shadow-lg'
            }`}
          >
            Close Inspector
          </button>
        </div>

        {/* Local Manual Modal */}
        <AnimatePresence>
          {showManual && manual && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className={`absolute inset-0 z-50 flex flex-col p-8 ${isRice ? 'bg-black/95 text-purple-50' : 'bg-white text-zinc-900'}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <BookOpen size={24} className={isRice ? 'text-purple-400' : 'text-cyan-600'} />
                  <div>
                    <h3 className="text-xl font-black uppercase tracking-tighter">Project Manual</h3>
                    <p className="text-[10px] font-bold opacity-50 uppercase tracking-widest">{project.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowManual(false)}
                  className={`p-2 rounded-xl transition-all ${isRice ? 'hover:bg-purple-500/20' : 'hover:bg-zinc-100'}`}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 space-y-10">
                {/* Workings */}
                <section>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-60">
                    <Activity size={14} /> Technical Workings
                  </h4>
                  <p className="text-sm font-bold leading-relaxed opacity-80">{manual.workings}</p>
                </section>

                {/* Programs Breakdown */}
                {manual.programs && manual.programs.length > 0 && (
                  <section>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-60">
                      <Terminal size={14} /> Components & Programs
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {manual.programs.map((prog, i) => (
                        <div key={i} className={`p-4 rounded-2xl border ${isRice ? 'bg-white/5 border-purple-500/10' : 'bg-zinc-50 border-zinc-200'}`}>
                          <code className={`text-[11px] font-black ${isRice ? 'text-purple-400' : 'text-blue-600'}`}>{prog.name}</code>
                          <p className="text-[10px] font-bold mt-1 opacity-70">{prog.desc}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Setup & Execution */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-60">
                      <Settings size={14} /> Setup Guide
                    </h4>
                    <ul className="space-y-2">
                       {manual.setup.map((step, i) => (
                         <li key={i} className="text-[11px] font-bold flex gap-2">
                           <span className="opacity-40">{i+1}.</span> {step}
                         </li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 flex items-center gap-2 opacity-60">
                      <Terminal size={14} /> Execution
                    </h4>
                    <div className={`p-4 rounded-xl font-mono text-[10px] border ${isRice ? 'bg-black/40 border-purple-500/20 text-purple-300' : 'bg-zinc-900 border-zinc-800 text-zinc-300'}`}>
                      $ {manual.execution}
                    </div>
                  </div>
                </section>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
});
