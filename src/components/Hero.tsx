"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";

export function Hero({ profile }: { profile: any }) {
  const [text, setText] = useState("");
  const fullText = `root@tanishx1:~# ./whoami\n> System Programmer & OS Developer.\n> Compiling kernel modules...\n> [OK] Ready for tasks.`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-green-500 font-mono">
      {/* 3D Wireframe / Particle Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
        </Canvas>
      </div>

      {/* Terminal Window Overlay */}
      <div className="z-10 w-full max-w-4xl p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-black/80 backdrop-blur-md border border-[#333] rounded-lg shadow-[0_0_30px_rgba(0,255,65,0.15)] overflow-hidden"
        >
          {/* Mac/Linux Window Header */}
          <div className="flex items-center px-4 py-3 bg-[#111] border-b border-[#333]">
             <div className="flex space-x-2">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
             </div>
             <div className="mx-auto text-[#666] text-sm flex items-center gap-2">
               <TerminalSquare size={14} /> /bin/bash — 80x24
             </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-6 md:p-10 min-h-[300px]">
             <div className="text-xl md:text-2xl whitespace-pre-wrap leading-relaxed tracking-tight break-words">
                {text}
                <motion.span 
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-3 h-5 bg-green-500 ml-1 translate-y-1"
                />
             </div>
             
             {text.length === fullText.length && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 0.5, duration: 1 }}
                 className="mt-8 pt-4 border-t border-green-900/40"
               >
                 <a
                   href="#projects"
                   className="inline-block text-green-400 hover:text-white hover:bg-green-900 px-4 py-2 border border-green-500 rounded transition-colors uppercase text-sm tracking-widest"
                 >
                   &gt; execute ls -la ./projects
                 </a>
               </motion.div>
             )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
