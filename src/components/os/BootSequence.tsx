"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "Starting Linux kernel 6.5.0-dfsg-1-amd64...",
  "BIOS-provided physical RAM map:",
  "  BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
  "  BIOS-e820: [mem 0x000000000009fc00-0x000000000009ffff] reserved",
  "DMI: Tanish Portfolio OS / Portfolio Engine, BIOS v2.0.24 03/09/2026",
  "ACPI: Core revision 20230331",
  "usbcore: registered new interface driver usbfs",
  "PCI: Using configuration type 1 for base access",
  "Loading kernel modules...",
  "[  OK  ] Mounted /proc filesystem",
  "[  OK  ] Started udev Kernel Device Manager",
  "input: Tanish-Input-Core as /devices/virtual/input/input0",
  "Scanning for storage devices...",
  "sda: sda1 (EFI) sda2 (Root) sda3 (Swap)",
  "[  OK  ] Mounted /sys filesystem",
  "Ext4: mounting root filesystem /dev/sda2",
  "Adding 8388604k swap on /dev/sda3.  Priority:-2 extents:1 across:8388604k",
  "Loading TUI environment...",
  "[  OK  ] Starting LVM2 metadata daemon",
  "[  OK  ] Reached target Local File Systems",
  "[  OK  ] Started Network Time Synchronization",
  "Setting up network interfaces...",
  "wlan0: link is up",
  "[  OK  ] Started Network Manager",
  "[  OK  ] Reached target Network",
  "Initializing GPU drivers...",
  "drm: nouveau-kms registered",
  "[  OK  ] Started Display Manager",
  "Loading User Session: TANISHX1",
  "[  OK  ] Reached target Graphical Interface",
  "System ready. Transitioning to Portfolio OS..."
];

export function BootSequence({ 
  onComplete, 
  realLogs = [] 
}: { 
  onComplete: () => void, 
  realLogs?: string[] 
}) {
  const [logs, setLogs] = useState<string[]>([]);
  const [realLogIndex, setRealLogIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_LOGS.length) {
        setLogs(prev => [...prev, BOOT_LOGS[currentLine]]);
        currentLine++;
      } else if (realLogIndex < realLogs.length) {
        // If kernel logs are done but real logs are still coming, wait
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 1000); 
      }
    }, 80);

    return () => clearInterval(interval);
  }, [onComplete, realLogs.length, realLogIndex]);

  // Inject real logs as they arrive
  useEffect(() => {
    if (realLogIndex < realLogs.length) {
      const newLog = realLogs[realLogIndex];
      setLogs(prev => [...prev, `[  OK  ] ${newLog}`]);
      setRealLogIndex(prev => prev + 1);
    }
  }, [realLogs, realLogIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[9999] bg-black text-white font-mono p-4 selection:bg-white/20"
    >
      <div 
        ref={scrollRef}
        className="h-full overflow-y-auto flex flex-col gap-1 text-[10px] sm:text-xs md:text-sm"
        style={{ 
          msOverflowStyle: 'none',  /* IE and Edge */
          scrollbarWidth: 'none'    /* Firefox */
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          div::-webkit-scrollbar {
            display: none;
          }
        `}} />
        <AnimatePresence initial={false}>
          {logs.map((log, i) => {
            if (!log) return null;
            const isOk = log.includes("[  OK  ]");
            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <span className="opacity-30 whitespace-nowrap">[{((i * 0.12) + 0.1).toFixed(6)}]</span>
                <span className={isOk ? "text-green-500 font-bold" : "text-zinc-300"}>
                  {log}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* Blinking Cursor */}
        <motion.div 
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-white/50 mt-2"
        />
      </div>
    </motion.div>
  );
}
