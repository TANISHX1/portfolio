"use client";

import React, { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onClick: () => void;
  onDragChange?: (isDragging: boolean) => void;
  width?: string;
  height?: string;
  initX?: number;
  initY?: number;
  id?: string;
}

export const WindowFrame = React.memo(function WindowFrame({ 
  title, children, isActive, isMinimized, onClose, onMinimize, onClick, onDragChange,
  width = "w-[850px] max-w-[95vw]", height = "h-[550px] max-h-[85vh]", initX = 0, initY = 0, id
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { theme } = useTheme();
  const dragControls = useDragControls();
  const toggleMaximize = () => setIsMaximized(!isMaximized);

  const isRice = theme === "rice";

  return (
    <motion.div
      id={id}
      drag={!isMaximized}
      dragControls={dragControls}
      dragMomentum={false}
      dragListener={false}
      dragElastic={0}
      onDragStart={() => {
        setIsDragging(true);
        onDragChange?.(true);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        onDragChange?.(false);
      }}
      initial={{ opacity: 1, scale: 1, x: initX, y: initY }}
      animate={{ 
        opacity: isMinimized ? 0 : 1, 
        scale: isMinimized ? 0.8 : 1,
        x: isMaximized ? 0 : undefined,
        y: isMaximized ? 0 : undefined,
        pointerEvents: isMinimized ? 'none' : 'auto',
        zIndex: isActive ? 40 : 10
      }}
      transition={{ duration: 0 }}
      onClick={onClick}
      style={{ willChange: "transform" }}
      className={`absolute ${isMaximized ? 'top-8 inset-x-0 bottom-0 rounded-none' : `${width} ${height} rounded-lg`} pointer-events-auto overflow-hidden flex flex-col transition-all ${
        isActive 
          ? (isRice ? 'shadow-[0_20px_60px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/50' : 'shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-blue-500/50') 
          : 'shadow-xl ring-1 ring-black/10 opacity-80'
      }`}
    >
      {/* Window Header - Only Drag Handle */}
      <div 
        onPointerDown={(e) => dragControls.start(e)}
        onDoubleClick={toggleMaximize}
        className={`h-9 flex items-center justify-between px-3 cursor-default select-none transition-colors shrink-0 ${
          isActive 
            ? (isRice ? 'bg-[#1a1b26]/95 text-purple-100' : 'bg-white/90 text-zinc-800 border-b border-zinc-200') 
            : (isRice ? 'bg-black/60 text-purple-100/40' : 'bg-zinc-50/80 text-zinc-400 border-b border-zinc-100')
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Traffic Light Controls */}
          <div className="flex gap-2 ml-1">
            <div className="relative group/ctrl">
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors shadow-sm"
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 text-[12px] text-white rounded opacity-0 group-hover/ctrl:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Close
              </span>
            </div>

            <div className="relative group/ctrl">
              <button 
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors shadow-sm"
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 text-[12px] text-white rounded opacity-0 group-hover/ctrl:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                Minimize
              </span>
            </div>

            <div className="relative group/ctrl">
              <button 
                onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors shadow-sm"
              />
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/80 text-[12px] text-white rounded opacity-0 group-hover/ctrl:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {isMaximized ? 'Restore' : 'Maximize'}
              </span>
            </div>
          </div>
          <span className="text-xs font-bold tracking-tight opacity-80">{title}</span>
        </div>
        
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Right side is intentionally empty for cleaner look, similar to the reference image */}
        </div>
      </div>

      {/* Window Content */}
      <div className={`flex-1 overflow-auto relative ${isRice ? 'bg-[#0a0a0c]/40' : 'bg-white/40'}`}>
        {children}
      </div>
    </motion.div>
  );
});
