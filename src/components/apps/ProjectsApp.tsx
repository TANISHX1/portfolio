"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  Search, 
  Star, 
  GitFork, 
  ChevronRight, 
  Download, 
  Clock, 
  HardDrive, 
  Box,
  FileCode,
  Terminal,
  Cpu,
  Monitor,
  Layout,
  Layers,
  Globe
} from "lucide-react";
import { WindowFrame } from "./WindowFrame";
import { projectCategories, projects } from "@/data/projects";
import { useTheme } from "@/context/ThemeContext";

interface ProjectCardProps {
  item: any;
  idx: number;
  apiRepo: any;
  isRice: boolean;
  onClick: (project: any) => void;
}

const getProjectIcon = (item: any) => {
  const name = item.name.toLowerCase();
  if (name.includes('terminal') || name.includes('shell')) return Terminal;
  if (name.includes('cpu') || name.includes('kernel')) return Cpu;
  if (name.includes('monitor') || name.includes('graphics')) return Monitor;
  if (name.includes('layout') || name.includes('window')) return Layout;
  if (name.includes('layer')) return Layers;
  if (name.includes('web') || name.includes('globe')) return Globe;
  return FileCode;
};

const ProjectCard = React.memo(({ item, idx, apiRepo, isRice, onClick, id }: ProjectCardProps & { id?: string }) => {
  const Icon = getProjectIcon(item);
  
  return (
    <motion.div
      key={item.name}
      id={id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      onClick={() => onClick(item)}
      className={`group p-5 rounded-xl border transition-all flex flex-col h-40 relative cursor-pointer ${
        isRice 
          ? 'bg-black/40 border-purple-500/20 hover:border-purple-500/50 hover:bg-black/60 shadow-[0_4px_20px_rgba(168,85,247,0.1)]' 
          : 'bg-white/60 border-white/40 shadow-sm hover:border-cyan-500/40 hover:bg-white/80'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2.5 rounded-xl border transition-colors ${
          isRice ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-cyan-500/10 text-cyan-600 border-cyan-500/20'
        }`}>
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold truncate flex items-center justify-between transition-colors uppercase tracking-tight ${
            isRice ? 'text-purple-100 group-hover:text-purple-400' : 'text-zinc-800 group-hover:text-cyan-600'
          }`}>
            {item.name} 
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </h3>
          <p className={`text-[11px] mt-2 leading-relaxed line-clamp-2 ${isRice ? 'text-purple-100/60' : 'text-zinc-600'}`}>{item.desc}</p>
        </div>
      </div>
      
      <div className={`mt-auto flex items-center justify-between text-[10px] font-bold uppercase tracking-widest pt-4 ${isRice ? 'text-purple-300/40' : 'text-zinc-500'}`}>
        <div className="flex items-center gap-3">
          <span className={`px-1.5 py-0.5 rounded border ${isRice ? 'bg-purple-500/5 border-purple-500/10' : 'bg-zinc-100 border-zinc-200'}`}>{item.language}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1"><Star size={11} className={apiRepo.stargazers_count > 0 ? "text-yellow-500" : ""} /> {apiRepo.stargazers_count}</span>
          <span className="flex items-center gap-1"><GitFork size={11} /> {apiRepo.forks_count}</span>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard";

export function ProjectsApp({ repos, isActive, isMinimized, onClose, onMinimize, onClick, onProjectSelect, setIsDragging, id }: any) {
  const [location, setLocation] = useState("projects");
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const isRice = theme === "rice";

  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.desc.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const renderProjects = () => {
    return projectCategories.map((category, catIdx) => {
      const categoryProjects = filteredProjects.filter(p => p.category === category);
      if (categoryProjects.length === 0) return null;

      return (
        <div key={category} className="mb-10">
          <h3 className={`text-[10px] font-black mb-4 uppercase tracking-[0.2em] border-b pb-2 ${isRice ? 'text-purple-300/40 border-purple-500/10' : 'text-zinc-400 border-zinc-100/10'}`}>{category}</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {categoryProjects.map((item, idx) => {
              const apiRepo = repos.find((r: any) => r.name === item.name) || {
                html_url: item.githubUrl || `https://github.com/TANISHX1/${item.name}`,
                language: item.language, stargazers_count: 0, forks_count: 0
              };

              const isFirstGlobal = catIdx === 0 && idx === 0;

              return (
                <ProjectCard 
                  key={item.name} 
                  id={isFirstGlobal ? "tour-select-project" : undefined}
                  item={item} 
                  idx={idx} 
                  apiRepo={apiRepo} 
                  isRice={isRice} 
                  onClick={onProjectSelect} 
                />
              );
            })}
          </div>
        </div>
      );
    });
  };

  const downloads = [
    { name: "ubuntu-24.04-desktop-amd64.iso", size: "4.7 GB", type: "iso", icon: HardDrive },
    { name: "kernel-6.8.tar.xz", size: "140 MB", type: "archive", icon: Box },
  ];

  const renderFiles = (files: any[]) => {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {files.map((file, i) => {
          const Icon = (file as any).icon;
          return (
            <motion.div key={i} initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{delay: i*0.05}} className={`flex flex-col items-center p-4 rounded-xl border border-transparent transition-all group cursor-pointer ${isRice ? 'hover:bg-purple-500/10' : 'hover:bg-white/40 hover:border-zinc-200'}`}>
              <div className={`p-4 rounded-2xl border transition-all shadow-sm ${
                isRice ? 'bg-black/60 border-purple-500/20 group-hover:border-purple-500/50' : 'bg-white/60 border-white/40 group-hover:border-white/80'
              }`}>
                <Icon size={32} className={location === 'downloads' ? (isRice ? 'text-purple-400' : 'text-indigo-500') : (isRice ? 'text-pink-400' : 'text-rose-500')} />
              </div>
              <span className={`text-[10px] font-bold mt-4 text-center break-all line-clamp-1 ${isRice ? 'text-purple-100/60 group-hover:text-purple-300' : 'text-zinc-600 group-hover:text-zinc-900'}`}>{file.name}</span>
              <span className={`text-[9px] mt-1 opacity-40 font-mono tracking-tighter ${isRice ? 'text-purple-200' : ''}`}>{file.size}</span>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <WindowFrame title={`dolphin --- ~/projects`} isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={120} initY={80} width="w-[900px] max-w-[95vw]" height="h-[550px]" onDragChange={setIsDragging} id={id}>
      <div className={`flex h-full transition-colors duration-500 ${isRice ? 'bg-[#0a0a0c]/80 text-purple-100' : 'bg-zinc-50/90 text-zinc-900'}`}>
        {/* Sidebar */}
        <div className={`w-48 border-r p-4 hidden md:block ${isRice ? 'border-purple-500/10 bg-black/20' : 'border-zinc-200 bg-white/40'}`}>
          <div className="space-y-6">
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest mb-4 opacity-40 ${isRice ? 'text-purple-300' : 'text-zinc-500'}`}>Places</p>
              <div className="space-y-1">
                {[
                  { id: 'projects', label: 'Projects', icon: Folder },
                  { id: 'downloads', label: 'Downloads', icon: Download },
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setLocation(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${
                      location === item.id 
                        ? (isRice ? 'bg-purple-500/20 text-purple-400' : 'bg-zinc-800 text-white') 
                        : (isRice ? 'hover:bg-purple-500/10 text-purple-100/60' : 'hover:bg-white text-zinc-600')
                    }`}
                  >
                    <item.icon size={16} />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className={`h-14 border-b flex items-center justify-between px-6 ${isRice ? 'border-purple-500/10' : 'border-zinc-200'}`}>
             <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${isRice ? 'bg-black/40 border-purple-500/20' : 'bg-white border-zinc-200 shadow-sm'}`}>
                  <Search size={14} className="opacity-30" />
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search files..."
                    className="bg-transparent border-none outline-none text-[11px] font-bold w-40 placeholder:opacity-30"
                  />
                </div>
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-40">
                {location === 'projects' ? filteredProjects.length : downloads.length} Items
              </div>
           </div>

           <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
             {location === 'projects' && renderProjects()}
             {location === 'downloads' && renderFiles(downloads)}
           </div>
        </div>
      </div>
    </WindowFrame>
  );
}
