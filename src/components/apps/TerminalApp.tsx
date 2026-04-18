"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { WindowFrame } from "./WindowFrame";
import { motion } from "framer-motion";

import { profile as profileData } from "@/data/profile";

import { useTheme } from "@/context/ThemeContext";

const ANSI_REGEX = /(\x1b\[\d+m)/g;

export const TerminalApp = React.memo(function TerminalApp({ profile: githubProfile, isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging, id, initialCommand }: any) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [booting, setBooting] = useState(true);
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Stable profile merging
  const profile = useMemo(() => ({
    ...profileData,
    ...githubProfile,
    username: githubProfile?.login || profileData.username,
    name: githubProfile?.name || profileData.name,
    bio: githubProfile?.bio || profileData.bio
  }), [githubProfile]);

  const FormattedText = ({ text }: { text: string }) => {
    if (!text) return null;
    const parts = text.split(ANSI_REGEX);
    let currentColor = "";

    return (
      <span className="leading-relaxed">
        {parts.map((part, i) => {
          if (part.startsWith("\x1b[")) {
            const code = part.match(/\d+/)?.[0];
            switch (code) {
              case "35": currentColor = isRice ? "text-purple-400" : "text-pink-400"; break;
              case "34": currentColor = isRice ? "text-purple-300" : "text-blue-400"; break;
              case "36": currentColor = "text-cyan-400"; break;
              case "32": currentColor = "text-emerald-400"; break;
              case "0": currentColor = ""; break;
              default: break;
            }
            return null;
          }
          return <span key={i} className={currentColor}>{part}</span>;
        })}
      </span>
    );
  };

  const bootSequence = useMemo(() => [
    `Loading  ${profile.username}-Kernel... OK`,
    `Initializing hypervisor... OK`,
    `Loading user profile: ${profile.name}`,
    `Welcome to ${profile.username} Portfolio OS v3.0.`,
    `Type 'help' to see available commands.`,
  ], [profile.username, profile.name]);

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
  }, [booting, bootSequence]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim();
    const parts = trimmedCmd.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    let output = "";
    switch (command) {
      case "help":
        output = "Available commands: help, ls, cat, neofetch, stats, clear, exit, whoami";
        break;
      case "ls":
        output = "about.txt   resume.txt   contact.md";
        break;
      case "neofetch":
        const neofetchArt = `\x1b[35m       .---.       \x1b[0m   \x1b[1m${profile.username}\x1b[0m@\x1b[1mtanish-os\x1b[0m\n\x1b[35m      /     \\      \x1b[0m   ---------------\n\x1b[35m      | () () |     \x1b[0m   \x1b[34mOS\x1b[0m: TanOS 1.0 (Gentoo-based)\n\x1b[35m       \\  ^  /      \x1b[0m   \x1b[34mKernel\x1b[0m: bad company 2.4.9\n\x1b[35m        |||||       \x1b[0m   \x1b[34mUptime\x1b[0m: 14d, 22h, 15m\n\x1b[35m        |||||       \x1b[0m   \x1b[34mShell\x1b[0m: zsh 5.9\n\x1b[35m                    \x1b[0m   \x1b[34mDE/WM\x1b[0m: Dreamland\n                       \x1b[34mTheme\x1b[0m: ${isRice ? "Catppuccin Mocha" : "Tokyo Night"}`;
        output = neofetchArt;
        break;
      case "stats":
        output = `\x1b[35mCPU \x1b[0m [||||||||||||||||||||          ] 70%\n\x1b[34mMEM \x1b[0m [||||||||||||                  ] 45%\n\x1b[36mNET \x1b[0m [||||||||||||||||||||||||||||  ] 90%`;
        break;
      case "cat":
        const targetFile = args[0]?.toLowerCase();
        if (targetFile === "resume.txt") {
          const skillsList = profileData.skillCategories[0]?.skills.slice(0, 5) || [];
          output = `========================================================\n                 ${profile.name.toUpperCase()}\n========================================================\nRole: ${profile.role}\nLocation: Dreamland / Linux Space\n\nExpertise:\n${skillsList.map((s: string) => ` • ${s}`).join('\n')}\n\nEmail: ${profile.email}\nGithub: ${profile.github.replace('https://', '')}\n========================================================`;
        } else if (targetFile === "about.txt") {
          output = profile.bio || "No information available.";
        } else if (targetFile === "contact.md") {
          output = `# Contact Information\n\n- Email: ${profile.email}\n- GitHub: ${profile.github}\n- LinkedIn: ${profile.linkedin}`;
        } else {
          output = targetFile ? `cat: ${args[0]}: No such file or directory` : "Usage: cat [file]";
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
        if (trimmedCmd !== "") output = `command not found: ${command}`;
    }

    if (output) {
      setTimeout(() => {
        setHistory(prev => [...prev, {type: 'out', text: output}]);
      }, 50);
    }
  }, [profile, isRice, onClose]);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setHistory(prev => [...prev, { type: 'cmd', text: `${profile.username}@tanx-os:~$ ${input}` }]);
      executeCommand(input);
      setInput("");
    }
  };

  // Typing simulation for initialCommand
  useEffect(() => {
    if (initialCommand && !booting) {
      let i = 0;
      const interval = setInterval(() => {
        setInput(initialCommand.slice(0, i + 1));
        i++;
        if (i === initialCommand.length) {
          clearInterval(interval);
          setTimeout(() => {
            setHistory(prev => [...prev, { type: 'cmd', text: `${profile.username}@tanx-os:~$ ${initialCommand}` }]);
            executeCommand(initialCommand);
            setInput("");
          }, 600);
        }
      }, 60);
      return () => clearInterval(interval);
    }
  }, [initialCommand, booting, executeCommand, profile.username]);

  const promptColor = isRice ? "text-purple-400" : "text-[#22da6e]";
  const cursorColor = isRice ? "text-pink-500" : "text-white";

  return (
    <WindowFrame title={`terminal — ${profileData.username}@tanx-os: ~`} isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={100} initY={60} width="w-[750px] max-w-[95vw]" height="h-[480px]" onDragChange={setIsDragging} id={id}>
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
        onClick={() => {
          const selection = window.getSelection();
          if (selection && selection.toString().length > 0) return;
          document.getElementById('term-input')?.focus();
        }}
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap selection:bg-white/30 ${line.type === 'cmd' ? 'text-white font-bold opacity-100' : 'opacity-90'}`}>
            {line.type === 'cmd' ? line.text : <FormattedText text={line.text} />}
          </div>
        ))}
        {!booting && (
          <div className="flex items-center mt-2 group">
            <span className={`${promptColor} font-bold mr-2 whitespace-nowrap`}>
              {profile.username}@tanx-os:
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
