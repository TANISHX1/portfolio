"use client";

import React from "react";
import { MobileFrame } from "../MobileFrame";
import { profile } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";
import { User, MapPin, Briefcase } from "lucide-react";

export const MobileAbout = React.memo(function MobileAbout({ onClose }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  return (
    <MobileFrame title="About" onClose={onClose}>
      <div className={`p-6 h-full flex flex-col ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        <div className="flex flex-col items-center text-center mb-8 pt-4">
          <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-white/20 mb-4 flex items-center justify-center overflow-hidden">
             <User size={40} className="opacity-50" />
          </div>
          <h2 className="text-2xl font-black">{profile.name}</h2>
          <p className="text-sm opacity-60 font-medium mt-1">{profile.role}</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
             <div className={`p-3 rounded-xl ${isRice ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
               <MapPin size={20} />
             </div>
             <div>
               <span className="block text-[10px] uppercase font-bold opacity-50 mb-1">Location</span>
               <span className="text-sm font-semibold">India</span>
             </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
             <div className={`p-3 rounded-xl ${isRice ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
               <Briefcase size={20} />
             </div>
             <div>
               <span className="block text-[10px] uppercase font-bold opacity-50 mb-1">Status</span>
               <span className="text-sm font-semibold">Open to Work</span>
             </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase font-bold opacity-50 mb-3 tracking-widest">Biography</h3>
          <p className="text-[13px] leading-relaxed opacity-80 whitespace-pre-wrap">
            {profile.bio || profile.longDesc || "Passionate software engineer building high-performance systems and dynamic web experiences."}
          </p>
        </div>
      </div>
    </MobileFrame>
  );
});
