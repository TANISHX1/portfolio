import React from "react";
import { motion } from "framer-motion";
import { WindowFrame } from "./WindowFrame";
import { profile } from "@/data/profile";
import { Cpu, Network, Binary, Terminal, Code } from "lucide-react";

const iconMap: Record<string, any> = {
  "Systems & Low-Level": <Binary className="w-5 h-5 text-cyan-400" />,
  "Operating Systems": <Cpu className="w-5 h-5 text-purple-400" />,
  "Computer Networks": <Network className="w-5 h-5 text-blue-400" />,
  "Full Stack & Scripting": <Code className="w-5 h-5 text-yellow-400" />,
  "Tools & Environment": <Terminal className="w-5 h-5 text-green-400" />
};

export const SkillsApp = React.memo(function SkillsApp({ isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging }: any) {
  const skillCategories = profile.skillCategories.map(cat => ({
    ...cat,
    icon: iconMap[cat.title] || <Code className="w-5 h-5 text-zinc-400" />
  }));

  return (
    <WindowFrame title="htop - tan-x_os_sys_monitor" isActive={isActive} isMinimized={isMinimized} onClose={onClose} onMinimize={onMinimize} onClick={onClick} initX={100} initY={100} width="w-[850px] max-w-[95vw]" onDragChange={setIsDragging}>
      <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar font-mono text-sm bg-black text-green-400">
        <div className="flex items-center gap-4 mb-6 border-b border-green-800 pb-4">
          <div className="flex-1">
            <div className="flex justify-between mb-1">
              <span>CPU [||||||||||||||||        45.2%]</span>
            </div>
            <div className="flex justify-between mb-1 text-cyan-400">
              <span>MEM [||||||||||||            2.1G/16G]</span>
            </div>
            <div className="flex justify-between text-purple-400">
              <span>SWP [                        0K/4.0G]</span>
            </div>
          </div>
          <div className="w-px h-16 bg-green-900 mx-4"></div>
          <div className="flex-1 text-xs">
            <div>Tasks: 184, 1 running, 183 sleeping</div>
            <div>Load average: 1.24  0.89  0.78</div>
            <div>Uptime: 14 days, 22:15:31</div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {skillCategories.map((cat, idx) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: idx * 0.1 }}
                    key={cat.title} 
                    className="border border-green-800 bg-green-950/20 p-4 rounded-md relative group hover:border-green-500 transition-colors"
                >
                    <div className="absolute -top-3 left-3 bg-black px-2 flex items-center gap-2 text-green-300 font-bold">
                        {cat.icon}
                        {cat.title}
                    </div>
                    <ul className="mt-4 space-y-2">
                        {cat.skills.map((skill) => (
                            <li key={skill} className="flex items-center gap-2 group-hover:text-white transition-colors">
                                <span className="text-green-600">❯</span> {skill}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </div>
      </div>
    </WindowFrame>
  );
});
