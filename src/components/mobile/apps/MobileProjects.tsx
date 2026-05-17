"use client";

import React from "react";
import { motion } from "framer-motion";
import { MobileFrame } from "../MobileFrame";
import { Project, projects } from "@/data/projects";
import { useTheme } from "@/context/ThemeContext";
import { FolderGit2, Star, GitFork, ArrowRight } from "lucide-react";

export const MobileProjects = React.memo(function MobileProjects({ onClose, repos, onSelect }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  // Only use manually curated projects to prevent empty/fork entries
  const allProjects: Project[] = [...projects];

  return (
    <MobileFrame title="Projects" onClose={onClose}>
      <div className={`p-4 h-full ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        <div className="flex flex-col gap-4 pb-12">
          {allProjects.map((project, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={project.name}
              onClick={() => onSelect(project)}
              className={`p-5 rounded-2xl border ${isRice ? 'bg-black/50 border-purple-500/20 active:bg-purple-900/20' : 'bg-[#1e1e2e]/50 border-white/10 active:bg-white/5'} backdrop-blur-sm cursor-pointer transition-colors`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isRice ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'}`}>
                    <FolderGit2 size={20} />
                  </div>
                  <h3 className="font-bold text-[15px] leading-tight">{project.name}</h3>
                </div>
                <ArrowRight size={16} className="opacity-30 mt-1" />
              </div>
              
              <p className="text-[12px] opacity-70 line-clamp-2 mt-2 leading-relaxed">
                {project.desc}
              </p>
              
              {(project.techHighlights ?? []).length > 0 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1 custom-scrollbar">
                  {(project.techHighlights ?? []).slice(0, 3).map((tech: string) => (
                    <span key={tech} className="px-2 py-1 text-[10px] font-medium bg-white/5 border border-white/5 rounded-md whitespace-nowrap">
                      {tech}
                    </span>
                  ))}
                  {(project.techHighlights ?? []).length > 3 && (
                    <span className="px-2 py-1 text-[10px] font-medium bg-white/5 border border-white/5 rounded-md text-white/50">
                      +{(project.techHighlights ?? []).length - 3}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </MobileFrame>
  );
});
