"use client";

import React, { useEffect, useState, useRef } from "react";
import { WindowFrame } from "./WindowFrame";
import { motion } from "framer-motion";

import { profile as profileData } from "@/data/profile";

import { useTheme } from "@/context/ThemeContext";

export const TerminalApp = React.memo(function TerminalApp({ profile: githubProfile, isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging }: any) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [booting, setBooting] = useState(true);
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const bottomRef = useRef<HTMLDivElement>(null);
  const profile = githubProfile || profileData;

  const bootSequence = [
    `Loading  ${profile.username}-Kernel... OK`,
    `Initializing hypervisor... OK`,
    `Loading user profile: ${profile.name}`,
    `Welcome to ${profile.username} Portfolio OS v3.0.`,
    `Type 'help' to see available commands.`,
  ];

  useEffect(() => {
    if (booting) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < bootSequence.length) {
          setHistory(prev => [...prev, { type: 'out', text: bootSequence[i] }]);
          i++;
        } else {
          setBooting(false);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [booting, profile]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      const lowerCmd = cmd.toLowerCase();
      const args = lowerCmd.split(' ');
      
      setHistory(prev => [...prev, { type: 'cmd', text: `${profile.username}@tanx-os:~$ ${input}` }]);
      setInput(""); // Clear input immediately
      
      let output = "";
      switch (args[0]) {
        case "help":
          output = "Available commands: help, ls, cat, neofetch, stats, clear, exit, whoami";
          break;
        case "ls":
          output = "about.txt   projects/   resume.txt   contact.md";
          break;
        case "neofetch":
          output = isRice 
            ? `\x1b[35m       .---.       \x1b[0m   \x1b[1m${profile.username}\x1b[0m@\x1b[1mtanx-os\x1b[0m\n\x1b[35m      /     \\      \x1b[0m   ---------------\n\x1b[35m      | () () |     \x1b[0m   \x1b[34mOS\x1b[0m: Hyprland/Rice Linux\n\x1b[35m       \\  ^  /      \x1b[0m   \x1b[34mKernel\x1b[0m: 6.8.0-zen-tanx\n\x1b[35m        |||||       \x1b[0m   \x1b[34mUptime\x1b[0m: 7h 27m\n\x1b[35m        |||||       \x1b[0m   \x1b[34mShell\x1b[0m: zsh 5.9\n\x1b[35m                    \x1b[0m   \x1b[34mWM\x1b[0m: Hyprland\n                       \x1b[34mTheme\x1b[0m: Rice (Purple Glow)`
            : `OS: tan-x_os (Manjaro Based)\nKernel: 6.6.0-manjaro\nUptime: 2 hours\nShell: bash 5.1\nResolution: 1920x1080\nWM: KDE Plasma`;
          break;
        case "stats":
          output = `\x1b[35mCPU \x1b[0m [||||||||||||||||||||          ] 70%\n\x1b[34mMEM \x1b[0m [||||||||||||                  ] 45%\n\x1b[36mNET \x1b[0m [||||||||||||||||||||||||||||  ] 90%`;
          break;
        case "cat":
          if (args[1] === "resume.txt") {
            const topSkills = profile.skillCategories[0].skills.slice(0, 4);
            output = `========================================================\n                 ${profile.name.toUpperCase()}\n========================================================\nRole: ${profile.role}\nLocation: Linux Space\n\nExpertise:\n${topSkills.map((s: string) => `- ${s}`).join('\n')}\n\nEmail: ${profile.email}\nGithub: ${profile.github.replace('https://', '')}\n========================================================`;
          } else if (args[1] === "about.txt") {
            output = profile.bio;
          } else {
            output = args[1] ? `cat: ${args[1]}: No such file or directory` : "Usage: cat [file]";
          }
          break;
        case "clear":
          setHistory([]);
          return;
        case "exit":
          onClose();
          return;
        case "whoami":
          output = `${profile.name} - ${profile.role}`;
          break;
        default:
          if (cmd !== "") output = `command not found: ${args[0]}`;
      }

      if (output) {
        setTimeout(() => {
          setHistory(prev => [...prev, {type: 'out', text: output}]);
        }, 50);
      }
    }
  };

  const promptColor = isRice ? "text-purple-400" : "text-[#22da6e]";
  const cursorColor = isRice ? "text-pink-500" : "text-white";

  return (
    <WindowFrame title={`terminal — ${profileData.username}@tanx-os: ~`} isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={-150} initY={-50} width="w-[750px] max-w-[95vw]" height="h-[480px]" onDragChange={setIsDragging}>
      <div 
        className={`p-6 font-mono text-sm md:text-base min-h-full cursor-text selection:bg-white/20 shadow-inner transition-colors duration-500 ${
          isRice 
            ? 'bg-[#0a0a0c]/80 text-purple-100' 
            : 'bg-[#0a0a0c]/75 text-[#22da6e]'
        }`} 
        style={{ 
          textShadow: isRice ? "0 0 1px rgba(168,85,247,0.4)" : "0 0 1px rgba(34,218,110,0.4)",
          WebkitFontSmoothing: "antialiased"
        }}
        onClick={() => document.getElementById('term-input')?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap ${line.type === 'cmd' ? 'text-white font-bold opacity-100' : 'opacity-90 leading-relaxed'}`}>
            {line.text}
          </div>
        ))}
        {!booting && (
          <div className="flex items-center mt-2 group">
            <span className={`${promptColor} font-bold mr-2 whitespace-nowrap`}>
              {profileData.username}@tanx-os:
            </span>
            <span className={`${cursorColor} font-bold mr-2`}>~$</span>
            <input 
              id="term-input"
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
              className={`bg-transparent border-none outline-none flex-1 min-w-0 font-bold ${isRice ? 'text-pink-400' : 'text-[#22da6e]'}`}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </WindowFrame>
  );
});
