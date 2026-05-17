"use client";

import React from "react";
import { MobileFrame } from "../MobileFrame";
import { useTheme } from "@/context/ThemeContext";
import { Github, ExternalLink, Activity, Info, Tag } from "lucide-react";

export const MobileProjectDetail = React.memo(function MobileProjectDetail({ onClose, project }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  if (!project) return null;

  return (
    <MobileFrame title="Project Info" onClose={onClose}>
      <div className={`p-5 h-full ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        {project.image && (
          <div className="w-full h-48 rounded-2xl overflow-hidden border border-white/10 mb-6 bg-black/50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={project.image} 
              alt={project.name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}

        <h1 className="text-2xl font-black tracking-tight mb-2">{project.name}</h1>
        <p className="text-sm opacity-80 leading-relaxed mb-6">
          {project.longDesc || project.desc}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
               <Info size={14} className="opacity-60" />
             </div>
             <div>
               <span className="block text-[10px] uppercase font-bold opacity-40">Category</span>
               <span className="text-[13px] font-medium capitalize">{project.category}</span>
             </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
               <Activity size={14} className="opacity-60" />
             </div>
             <div>
               <span className="block text-[10px] uppercase font-bold opacity-40">Status</span>
               <span className="text-[13px] font-medium text-emerald-400">Active</span>
             </div>
          </div>
        </div>

        <div className="mb-8">
           <div className="flex items-center gap-2 mb-3">
             <Tag size={14} className="opacity-40" />
             <h3 className="text-[12px] uppercase font-bold opacity-60">Tech Stack</h3>
           </div>
           <div className="flex flex-wrap gap-2">
             {(project.techHighlights || project.techStack || []).map((tech: string) => (
               <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[12px] font-medium">
                 {tech}
               </span>
             ))}
           </div>
        </div>

        <div className="flex flex-col gap-3 pb-8">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-colors ${isRice ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              <Github size={18} />
              View Source
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 font-bold text-sm transition-colors"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </MobileFrame>
  );
});
