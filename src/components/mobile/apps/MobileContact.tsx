"use client";

import React from "react";
import { MobileFrame } from "../MobileFrame";
import { profile } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import { socialIcons } from "@/data/desktop";

export const MobileContact = React.memo(function MobileContact({ onClose }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  return (
    <MobileFrame title="Contact Me" onClose={onClose}>
      <div className={`p-6 h-full flex flex-col items-center justify-center text-center ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl ${isRice ? 'bg-purple-600 shadow-purple-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
          <MessageCircle size={32} className="text-white" />
        </div>
        
        <h2 className="text-2xl font-black mb-2">Get in touch</h2>
        <p className="text-sm opacity-60 mb-10 max-w-[80%] mx-auto leading-relaxed">
          Whether you have a question, a project idea, or just want to say hi, feel free to drop a message!
        </p>

        <div className="w-full space-y-4 max-w-sm">
          {socialIcons.map(social => {
             const Icon = social.icon;
             return (
               <a 
                 key={social.id}
                 href={social.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors active:scale-95"
               >
                 <div className={`p-3 rounded-xl bg-white/5 ${social.color}`}>
                   <Icon size={24} />
                 </div>
                 <div className="text-left">
                   <span className="block text-sm font-bold capitalize">{social.label}</span>
                 </div>
               </a>
             );
          })}
        </div>
      </div>
    </MobileFrame>
  );
});
