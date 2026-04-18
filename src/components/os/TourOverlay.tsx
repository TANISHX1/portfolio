"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Play, Pause, Compass, MousePointer2 } from "lucide-react";

interface TourStep {
  targetId?: string; // ID of the element to point to
  title: string;
  content: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  action?: (openApp: (app: any, command?: string) => void, closeApp: (app: any) => void) => void;
  duration?: number;
  waitingForUserInput?: boolean;
}

interface TourOverlayProps {
  onComplete: () => void;
  openApp: (app: any) => void;
  closeApp: (app: any) => void;
  closeAllApps: () => void;
  selectedProject: any;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "TanOS v3.0 // Neural Tour",
    content: "Initializing system overview. This gentoo-based environment is optimized for low-latency terminal workflows and modern web development.",
    position: "center",
    action: (open) => open("Skills"), // Show neofetch
    duration: 6000
  },
  {
    targetId: "top-bar",
    title: "Waybar // Telemetry",
    content: "Real-time hardware monitoring. Observe CPU frequency, memory pressure, and network throughput in the persistent system header.",
    position: "bottom",
    duration: 6000
  },
  {
    targetId: "dock",
    title: "Neural Dock",
    content: "The primary launcher. All system modules are indexed here with intelligent active-state indicators and hardware acceleration.",
    position: "top",
    duration: 6000
  },
  {
    targetId: "tour-select-project",
    title: "Dolphin // Neural Selection",
    content: "Interactive repository analysis. Please select a project card (e.g., Seat Allocation) to analyze its technical metadata and manual.",
    position: "right",
    waitingForUserInput: true,
    action: (open, close) => {
      close("Skills");
      open("Projects");
    },
    duration: 0
  },
  {
    targetId: "terminal-window",
    title: "Konsole // Neural Finale",
    content: "Tour sequence concluded. Accessing local administrative documents for final review. Terminating automated control...",
    position: "right",
    action: (open, close) => {
      close("Projects");
      close("ProjectDetail"); // Ensure details are closed
      open("Terminal", "cat resume.txt");
    },
    duration: 12000
  }
];

export const TourOverlay = React.memo(function TourOverlay({ 
  onComplete, 
  openApp, 
  closeApp,
  closeAllApps,
  selectedProject 
}: TourOverlayProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [waitingForUserInput, setWaitingForUserInput] = useState(false);
  const [hudPos, setHudPos] = useState({ x: 0, y: 0, width: 0, height: 0, side: 'center' as 'left' | 'right' | 'center' | 'top' | 'bottom' });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const hudRef = useRef<HTMLDivElement>(null);
  const step = TOUR_STEPS[currentStep];

  // Watch for project selection to resume tour
  useEffect(() => {
    if (waitingForUserInput && selectedProject) {
      setWaitingForUserInput(false);
      nextStep();
    }
  }, [selectedProject, waitingForUserInput]);

  const nextStep = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStep, onComplete]);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Automation Logic
  const lastActionedStep = useRef(-1);
  useEffect(() => {
    if (isPaused || waitingForUserInput) return;

    const timer = setTimeout(nextStep, step.duration || 5000);

    // Trigger Step Action only once
    if (step.action && lastActionedStep.current !== currentStep) {
      step.action(openApp, closeApp);
      lastActionedStep.current = currentStep;
      
      // Auto-enable wait mode if step requires it
      if (step.waitingForUserInput) {
        setWaitingForUserInput(true);
      }
    }

    return () => clearTimeout(timer);
  }, [currentStep, isPaused, nextStep, step.action, step.duration, openApp, closeApp, waitingForUserInput, step.waitingForUserInput]);

  // Dynamic Coordinate Calculation for HUD Links
  useEffect(() => {
    let lastHud = { x: 0, y: 0, width: 0, height: 0 };
    let lastTarget = { x: 0, y: 0 };

    const updateCoords = () => {
      if (hudRef.current) {
        const rect = hudRef.current.getBoundingClientRect();
        if (Math.abs(rect.left - lastHud.x) > 1 || Math.abs(rect.top - lastHud.y) > 1) {
          const next = { x: rect.left, y: rect.top, width: rect.width, height: rect.height, side: step.position };
          setHudPos(next);
          lastHud = { x: rect.left, y: rect.top, width: rect.width, height: rect.height };
        }
      }
      
      if (step.targetId) {
        const el = document.getElementById(step.targetId);
        if (el) {
          const rect = el.getBoundingClientRect();
          let tx = rect.left + rect.width / 2;
          let ty = rect.top + rect.height / 2;

          // Point to the NEAREST edge to prevent crossing over the window
          if (step.position === 'right') tx = rect.right;
          if (step.position === 'left') tx = rect.left;
          if (step.position === 'bottom') ty = rect.bottom;
          if (step.position === 'top') ty = rect.top;

          if (Math.abs(tx - lastTarget.x) > 1 || Math.abs(ty - lastTarget.y) > 1) {
            setTargetPos({ x: tx, y: ty });
            lastTarget = { x: tx, y: ty };
          }
        }
      }
    };

    updateCoords();
    const interval = setInterval(updateCoords, 100); // Higher frequency for smooth tracking during animations

    return () => clearInterval(interval);
  }, [currentStep, step.targetId]);

  // Futuristic HUD "Link Line" (Thread)
  const HudThread = () => {
    if (step.position === 'center' || !step.targetId || (targetPos.x === 0 && targetPos.y === 0)) return null;

    // Calculate path between HUD and target
    const isSide = step.position === 'left' || step.position === 'right';
    const startX = step.position === 'right' ? hudPos.x : (step.position === 'left' ? hudPos.x + hudPos.width : hudPos.x + hudPos.width / 2);
    const startY = isSide ? hudPos.y + hudPos.height / 2 : (step.position === 'top' ? hudPos.y + hudPos.height : hudPos.y);
    
    // Create a "futuristic" path
    let path = "";
    if (isSide) {
      const midX = (startX + targetPos.x) / 2;
      path = `M ${startX},${startY} L ${midX},${startY} L ${midX},${targetPos.y} L ${targetPos.x},${targetPos.y}`;
    } else {
      const midY = (startY + targetPos.y) / 2;
      path = `M ${startX},${startY} L ${startX},${midY} L ${targetPos.x},${midY} L ${targetPos.x},${targetPos.y}`;
    }

    return (
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-[10002] overflow-visible">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <motion.path
          d={path}
          stroke="rgba(59, 130, 246, 0.6)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          filter="url(#glow)"
        />

        <motion.circle
          cx={targetPos.x}
          cy={targetPos.y}
          r="4"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 2, 1], opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        <motion.circle
          cx={targetPos.x}
          cy={targetPos.y}
          r="2"
          fill="#3b82f6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-[10001] pointer-events-none overflow-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"
      />

      <HudThread />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          ref={hudRef}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 1.05 }}
          className={`
            absolute pointer-events-auto
            ${step.position === 'center' ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
            ${step.position === 'bottom' ? 'top-24 left-1/2 -translate-x-1/2' : ''}
            ${step.position === 'top' ? 'bottom-32 left-1/2 -translate-x-1/2' : ''}
            ${step.position === 'right' ? 'top-1/2 -translate-y-1/2 left-[calc(50%+150px)] sm:left-[calc(50%+300px)]' : ''}
            ${step.position === 'left' ? 'top-1/2 -translate-y-1/2 right-[calc(50%+150px)] sm:right-[calc(50%+300px)]' : ''}
            bg-black/90 border border-blue-500/30 backdrop-blur-2xl p-0.5 rounded-lg
            shadow-[0_0_80px_rgba(59,130,246,0.2)] min-w-[340px] max-w-[480px]
          `}
        >
          {/* Futuristic HUD Accents */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-blue-500/50 rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-blue-500/50 rounded-br-lg" />

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-blue-500/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Compass size={14} className="text-blue-500 animate-spin-slow" />
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 bg-blue-500 rounded-full blur-sm"
                />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">
                Automated Tour Engine
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-blue-500/40">
                SEQ_{currentStep + 1}/{TOUR_STEPS.length}
              </span>
              <button 
                onClick={() => setIsPaused(!isPaused)} 
                className="p-1 hover:bg-blue-500/20 rounded transition-colors text-blue-400"
              >
                {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
              </button>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-black text-white mb-3 uppercase tracking-tighter flex items-center gap-3">
              {step.title}
            </h2>
            <p className="text-blue-100/60 text-sm leading-relaxed mb-8 font-medium">
              {step.content}
            </p>

            <div className="flex items-center justify-between mt-auto">
              <div className="flex gap-2">
                <button onClick={prevStep} disabled={currentStep === 0} className="p-2 text-white/40 hover:text-white disabled:opacity-0 transition-colors">
                  <ChevronLeft size={20} />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex gap-1.5">
                  {TOUR_STEPS.map((_, i) => (
                    <motion.div 
                      key={i}
                      initial={false}
                      animate={{ 
                        width: i === currentStep ? 24 : 6,
                        backgroundColor: i === currentStep ? "#3b82f6" : "rgba(255,255,255,0.1)"
                      }}
                      className="h-1 rounded-full"
                    />
                  ))}
                </div>

                <button 
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2.5 rounded shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all font-black uppercase text-[11px] tracking-widest flex items-center gap-2"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? "Finish" : "Next"}
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar (Autopilot) */}
          {!isPaused && (
            <div className="h-0.5 w-full bg-white/5 bottom-0 absolute left-0 overflow-hidden">
              <motion.div
                key={currentStep}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: (step.duration || 5000) / 1000, ease: "linear" }}
                className="h-full bg-blue-500"
              />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
});
