"use client";

import React from "react";
import { WindowFrame } from "./WindowFrame";
import { useTheme } from "@/context/ThemeContext";
import { MessageCircle } from "lucide-react";
import { socialIcons } from "@/data/desktop";

export const ContactApp = React.memo(function ContactApp({ isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";

  return (
    <WindowFrame title="Contact Me" isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={200} initY={200} width="w-[500px] max-w-[95vw]" height="h-[400px]" onDragChange={setIsDragging}>
      <div className={`p-8 h-full flex flex-col items-center justify-center text-center transition-colors duration-500 ${isRice ? 'bg-black/90 text-purple-100' : 'bg-white/90 text-zinc-900'}`}>
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-2xl ${isRice ? 'bg-purple-600 shadow-purple-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
          <MessageCircle size={32} className="text-white" />
        </div>
        
        <h2 className="text-3xl font-black mb-2">Get in touch</h2>
        <p className="text-sm opacity-60 mb-8 max-w-[80%] mx-auto leading-relaxed">
          Whether you have a question, a project idea, or just want to say hi, feel free to drop a message!
        </p>

        <div className="w-full flex justify-center gap-4">
          {socialIcons.map(social => {
             const Icon = social.icon;
             return (
               <a 
                 key={social.id}
                 href={social.url}
                 target="_blank"
                 rel="noopener noreferrer"
                 className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 ${
                   isRice ? 'bg-purple-900/20 border-purple-500/30 hover:bg-purple-900/40' : 'bg-black/5 border-black/10 hover:bg-black/10'
                 }`}
               >
                 <Icon size={20} className={social.color} />
                 <span className="font-bold capitalize text-sm">{social.label}</span>
               </a>
             );
          })}
        </div>
      </div>
    </WindowFrame>
  );
});
