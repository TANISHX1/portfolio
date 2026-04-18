"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, SkipForward, SkipBack, Music, List, Volume2, Maximize2 } from "lucide-react";
import { WindowFrame } from "./WindowFrame";
import { playlist, Song } from "@/data/music";
import { useTheme } from "@/context/ThemeContext";

interface MusicAppProps {
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onClick: () => void;
  setIsDragging: (isDragging: boolean) => void;
  systemVolume: number;
}

export function MusicApp({ 
  isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging, systemVolume 
}: MusicAppProps) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSong = playlist[currentSongIndex];

  // Sync with system volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = systemVolume / 100;
    }
  }, [systemVolume]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
    }
  };

  const handleEnded = () => {
    playNext();
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentSongIndex]);

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <WindowFrame 
      title="Amarok — Music Player" 
      isActive={isActive} 
      isMinimized={isMinimized} 
      onClose={onClose} 
      onMinimize={onMinimize} 
      onClick={onClick} 
      initX={200} 
      initY={150} 
      width="w-[700px] max-w-[95vw]" 
      height="h-[450px] max-h-[85vh]"
      onDragChange={setIsDragging}
    >
      <div className={`h-full flex overflow-hidden font-sans relative ${isRice ? 'bg-black/90 text-purple-100' : 'bg-[#1e1e2e] text-white'}`}>
        <audio 
          ref={audioRef} 
          src={currentSong.url} 
          onTimeUpdate={handleTimeUpdate} 
          onEnded={handleEnded}
          preload="none"
        />

        {/* Main Player Area */}
        <div className="flex-1 flex flex-col p-8 relative z-10">
          <div className="flex gap-8 items-center mb-auto">
            {/* Album Art */}
            <motion.div 
              key={currentSong.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-2xl blur-2xl opacity-40 ${isRice ? 'bg-purple-500' : 'bg-blue-500'} animate-pulse`} />
              <img 
                src={currentSong.cover} 
                alt={currentSong.title} 
                className="w-48 h-48 rounded-2xl object-cover shadow-2xl relative z-10 border border-white/10"
              />
              {isPlaying && (
                <div className="absolute -bottom-2 -right-2 z-20 flex gap-0.5 items-end h-8">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div 
                      key={i}
                      animate={{ height: [8, 24, 12, 28, 16] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                      className={`w-1 rounded-t-full ${isRice ? 'bg-purple-400' : 'bg-blue-400'}`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Song Info */}
            <div className="flex-1">
              <motion.h2 
                key={currentSong.title}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-3xl font-black mb-2 tracking-tight"
              >
                {currentSong.title}
              </motion.h2>
              <motion.p 
                key={currentSong.artist}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-lg opacity-60 mb-8 font-medium"
              >
                {currentSong.artist}
              </motion.p>

              <div className="flex items-center gap-6">
                <button onClick={playPrev} className="p-2 opacity-60 hover:opacity-100 transition-all hover:scale-110">
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={togglePlay} 
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-xl ${
                    isRice ? 'bg-purple-500 text-white shadow-purple-500/20' : 'bg-blue-500 text-white shadow-blue-500/20'
                  }`}
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button onClick={playNext} className="p-2 opacity-60 hover:opacity-100 transition-all hover:scale-110">
                  <SkipForward size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-[11px] font-bold opacity-40 uppercase tracking-widest">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{currentSong.duration}</span>
            </div>
            <div 
              className="h-1.5 bg-white/5 rounded-full overflow-hidden cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const clickedProgress = x / rect.width;
                if (audioRef.current) {
                  audioRef.current.currentTime = audioRef.current.duration * clickedProgress;
                }
              }}
            >
              <motion.div 
                className={`h-full ${isRice ? 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'}`}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
             <div className="flex items-center gap-4 opacity-40 text-[10px] font-black uppercase tracking-widest">
                <Volume2 size={12} />
                <span>Device: Speaker / TanOS_Audio_Engine</span>
             </div>
             <button 
              onClick={() => setShowPlaylist(!showPlaylist)}
              className={`p-2 rounded-lg transition-all ${showPlaylist ? (isRice ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400') : 'opacity-40 hover:opacity-100'}`}
             >
                <List size={20} />
             </button>
          </div>
        </div>

        {/* Playlist Sidebar */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div 
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              className={`w-72 border-l backdrop-blur-xl h-full flex flex-col p-6 z-20 ${
                isRice ? 'bg-zinc-900/80 border-purple-500/10' : 'bg-black/40 border-white/5'
              }`}
            >
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 opacity-40">Up Next / Playlist</h3>
              <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
                {playlist.map((song, idx) => (
                  <button 
                    key={song.id}
                    onClick={() => {
                      setCurrentSongIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${
                      currentSongIndex === idx 
                        ? (isRice ? 'bg-purple-500/10' : 'bg-blue-500/10') 
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="relative">
                      <img src={song.cover} className="w-10 h-10 rounded-lg object-cover" />
                      {currentSongIndex === idx && isPlaying && (
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <div className="flex gap-0.5 items-end h-4">
                            <motion.div animate={{ height: [4, 12, 6] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-0.5 bg-white" />
                            <motion.div animate={{ height: [8, 4, 10] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-0.5 bg-white" />
                            <motion.div animate={{ height: [6, 12, 4] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }} className="w-0.5 bg-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-start truncate">
                      <span className={`text-xs font-bold truncate w-full text-left ${currentSongIndex === idx ? (isRice ? 'text-purple-400' : 'text-blue-400') : ''}`}>
                        {song.title}
                      </span>
                      <span className="text-[10px] opacity-40 truncate w-full text-left">{song.artist}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-5 z-0">
           <img src={currentSong.cover} className="w-full h-full object-cover blur-[80px] scale-150" />
        </div>
      </div>
    </WindowFrame>
  );
}
