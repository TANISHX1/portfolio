"use client";

import { Activity, BarChart2, Wifi, Volume2, VolumeX, Battery, Power, Grid, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { PowerMenu } from "./PowerMenu";
import { VolumeControl } from "./VolumeControl";

interface TopBarProps {
  activeApp: string | null;
  onLauncherToggle: () => void;
  showLauncher: boolean;
  profileName: string;
  isDragging?: boolean;
  volume: number;
  setVolume: (vol: number) => void;
  onSystemAction?: (action: 'restart' | 'shutdown' | 'suspend') => void;
}

export function TopBar({ activeApp, onLauncherToggle, showLauncher, profileName, isDragging, volume, setVolume, onSystemAction }: TopBarProps) {
  const { theme, toggleTheme } = useTheme();
  const isRice = theme === "rice";
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [stats, setStats] = useState({ cpu: 12, ram: 45 });
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    }, 1000);

    const statsTimer = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 15) + 5,
        ram: Math.floor(Math.random() * 10) + 40
      });
    }, 3000);

    return () => { clearInterval(timer); clearInterval(statsTimer); };
  }, []);

  return (
    <header id="top-bar" className={`h-8 z-50 flex items-center justify-between px-3 text-[11px] w-full shadow-lg transition-all duration-300 border-b ${
      isRice ? 'bg-black/90 border-purple-500/20 text-purple-100' : 'bg-[#31363b]/90 border-black/10 text-white'
    }`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={onLauncherToggle}
          className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
            showLauncher 
              ? (isRice ? 'bg-purple-600 text-white' : 'bg-blue-500 text-white') 
              : 'text-white/60 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Grid size={16} />
        </button>
        
        <div className="flex items-center gap-2 group cursor-default">
          <div className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${isRice ? 'bg-purple-500 shadow-purple-500/60' : 'bg-blue-500 shadow-blue-500/60'}`} />
          <span className="font-bold tracking-tight opacity-90 uppercase whitespace-nowrap">{profileName.split(' ')[0]}</span>
        </div>

        {activeApp && (
          <div className={`hidden sm:flex items-center px-4 py-0.5 rounded-md border transition-all ${
            isRice ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : 'bg-white/5 border-white/5 text-white/70'
          }`}>
            <span className="opacity-40 mr-2 text-[10px]">ACTIVE /</span> {activeApp.toLowerCase()}
          </div>
        )}
      </div>
      
      <div className="flex-1 flex justify-center items-center font-mono text-[10px] sm:text-[11px] opacity-80 whitespace-nowrap overflow-hidden text-ellipsis px-2">
        <span className="hidden sm:inline">Created at: {time} | </span>
        <span className="text-blue-400 font-bold ml-1">EVENT CODE: SCRS_PA</span>
        <span className="text-purple-400 font-bold ml-2">UID: SCRS_ARENA_A47</span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          id="theme-toggle"
          onClick={toggleTheme}
          className={`p-1.5 rounded-md transition-all ${isRice ? 'text-purple-400 hover:bg-purple-500/20' : 'text-blue-400 hover:bg-white/5'}`}
          title={`Switch to ${isRice ? 'KDE' : 'Rice'} Theme`}
        >
          {isRice ? <Moon size={14} /> : <Sun size={14} />}
        </button>

        <div className={`hidden lg:flex items-center gap-4 bg-black/20 px-3 py-0.5 rounded-md border text-opacity-60 ${
          isRice ? 'border-purple-500/10 text-purple-200' : 'border-white/5 text-white'
        }`}>
          <div className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
            <Activity size={12} className={isRice ? 'text-purple-400' : 'text-blue-500'}/> {stats.cpu}%
          </div>
          <div className="flex items-center gap-1.5 hover:text-purple-400 transition-colors">
            <BarChart2 size={12} className={isRice ? 'text-pink-400' : 'text-purple-500'}/> {stats.ram}%
          </div>
        </div>
        
        <div className="flex items-center gap-3 opacity-60">
          <Wifi size={13} className="hover:text-blue-400 cursor-pointer transition-colors" />
          
          <div className="relative flex items-center">
            <button 
              onClick={() => setShowVolumeControl(!showVolumeControl)}
              className={`hover:text-blue-400 cursor-pointer transition-colors ${showVolumeControl ? 'text-blue-400' : ''}`}
            >
              {volume === 0 ? <VolumeX size={13} className="text-red-500" /> : <Volume2 size={13} />}
            </button>
            
            <AnimatePresence>
              {showVolumeControl && (
                <VolumeControl 
                  volume={volume} 
                  setVolume={setVolume} 
                  isRice={isRice} 
                  onClose={() => setShowVolumeControl(false)} 
                />
              )}
            </AnimatePresence>
          </div>

          <Battery size={13} className="text-emerald-500" />
        </div>
        
        <div className="flex items-center gap-3 px-3 border-l border-white/10 opacity-90 font-medium">
          <span className="hidden sm:inline opacity-50 font-normal">{date}</span>
          {time}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowPowerMenu(!showPowerMenu)}
            className={`flex items-center justify-center w-8 h-8 rounded transition-all ${
              showPowerMenu ? 'bg-red-500 text-white' : 'text-white/60 hover:bg-red-500/80 hover:text-white'
            }`}
          >
            <Power size={13} />
          </button>
          
          <AnimatePresence>
            {showPowerMenu && (
              <PowerMenu 
                isRice={isRice} 
                onClose={() => setShowPowerMenu(false)} 
                onSelect={(action) => onSystemAction?.(action)} 
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
