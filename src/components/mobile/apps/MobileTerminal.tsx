"use client";

import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { MobileFrame } from "../MobileFrame";
import { profile as profileData } from "@/data/profile";
import { useTheme } from "@/context/ThemeContext";

const ANSI_REGEX = /(\x1b\[\d+m)/g;

export const MobileTerminal = React.memo(function MobileTerminal({ profile: githubProfile, onClose }: any) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [booting, setBooting] = useState(true);
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
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
    `Loading MobileKernel... OK`,
    `Initializing hypervisor... OK`,
    `Loading user profile: ${profile.name}`,
    `Welcome to ${profile.username} Mobile OS.`,
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
        output = "Available: help, ls, cat, neofetch, clear, exit, whoami";
        break;
      case "ls":
        output = "about.txt   resume.txt   contact.md";
        break;
      case "neofetch":
        output = `\x1b[35m       .---.       \x1b[0m   \x1b[1m${profile.username}\x1b[0m@\x1b[1mtanish-os\x1b[0m\\n\x1b[35m      /     \\      \x1b[0m   ---------------\\n\x1b[35m      | () () |     \x1b[0m   \x1b[34mOS\x1b[0m: TanOS Mobile\\n\x1b[35m       \\  ^  /      \x1b[0m   \x1b[34mKernel\x1b[0m: bad company\\n\x1b[35m        |||||       \x1b[0m   \x1b[34mShell\x1b[0m: zsh 5.9\\n\x1b[35m                    \x1b[0m   \x1b[34mTheme\x1b[0m: ${isRice ? "Mocha" : "Tokyo Night"}`;
        break;
      case "cat":
        const targetFile = args[0]?.toLowerCase();
        if (targetFile === "resume.txt") {
          output = `Role: ${profile.role}\\nEmail: ${profile.email}`;
        } else if (targetFile === "about.txt") {
          output = profile.bio || "No info.";
        } else if (targetFile === "contact.md") {
          output = `Email: ${profile.email}\\nGitHub: ${profile.github}`;
        } else {
          output = targetFile ? `cat: ${args[0]}: No such file` : "Usage: cat [file]";
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
      setHistory(prev => [...prev, { type: 'cmd', text: `${profile.username}@mobile:~$ ${input}` }]);
      executeCommand(input);
      setInput("");
    }
  };

  const promptColor = isRice ? "text-purple-400" : "text-[#22da6e]";
  const cursorColor = isRice ? "text-pink-500" : "text-white";

  return (
    <MobileFrame title="Terminal" onClose={onClose}>
      <div 
        className={`p-4 font-mono text-[13px] md:text-sm min-h-full cursor-text transition-colors duration-500 ${
          isRice 
            ? 'bg-black text-purple-100' 
            : 'bg-[#0a0a0c] text-[#22da6e]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div key={i} className={`mb-1 whitespace-pre-wrap break-words ${line.type === 'cmd' ? 'text-white font-bold opacity-100' : 'opacity-90'}`}>
            {line.type === 'cmd' ? line.text : <FormattedText text={line.text} />}
          </div>
        ))}
        {!booting && (
          <div className="flex flex-col mt-2">
            <span className={`${promptColor} font-bold mr-2 whitespace-nowrap`}>
              {profile.username}@mobile:~$
            </span>
            <div className="flex items-center mt-1">
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className={`bg-transparent border-none outline-none flex-1 min-w-0 font-bold ${isRice ? 'text-pink-400' : 'text-[#22da6e]'}`}
                autoCapitalize="none"
                autoComplete="off"
                spellCheck="false"
              />
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-4" />
      </div>
    </MobileFrame>
  );
});
