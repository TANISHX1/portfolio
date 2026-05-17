"use client";

import React, { useState, useRef, useEffect } from "react";
import { MobileFrame } from "../MobileFrame";
import { useTheme } from "@/context/ThemeContext";
import { Play, Pause, SkipForward, SkipBack, Volume2, Music as MusicIcon, Repeat } from "lucide-react";
import { playlist } from "@/data/music";

export const MobileMusic = React.memo(function MobileMusic({ onClose }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentTrack.url);
    }
    const audio = audioRef.current;
    audio.src = currentTrack.url;
    audio.load();
    if (isPlaying) audio.play().catch(() => setIsPlaying(false));

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => handleNext();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const handleNext = () => setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  const handlePrev = () => setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = (Number(e.target.value) / 100) * (audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
    setProgress(Number(e.target.value));
  };

  return (
    <MobileFrame title="Music" onClose={onClose}>
      <div className={`p-6 h-full flex flex-col justify-center items-center ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        {/* Album Art Cover */}
        <div className={`w-64 h-64 md:w-72 md:h-72 rounded-3xl shadow-2xl mb-10 overflow-hidden relative group ${isRice ? 'shadow-purple-500/20 bg-purple-900/20' : 'shadow-orange-500/20 bg-orange-900/20'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center');
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-10 transition-opacity">
             <MusicIcon size={64} />
          </div>
        </div>

        {/* Track Info */}
        <div className="w-full text-center mb-8">
          <h2 className="text-2xl font-black truncate px-4">{currentTrack.title}</h2>
          <p className={`text-sm font-medium mt-2 opacity-70 ${isRice ? 'text-pink-400' : 'text-orange-400'}`}>{currentTrack.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mb-8 px-4">
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isNaN(progress) ? 0 : progress}
            onChange={handleSeek}
            className="w-full h-1.5 rounded-full appearance-none bg-white/10 outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white cursor-pointer"
            style={{ 
              background: `linear-gradient(to right, ${isRice ? '#a855f7' : '#f97316'} ${progress}%, rgba(255,255,255,0.1) ${progress}%)` 
            }}
          />
          <div className="flex justify-between text-[11px] font-medium opacity-50 mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 w-full max-w-sm">
          <button className="opacity-40 hover:opacity-100 transition-opacity p-2">
            <Repeat size={20} />
          </button>
          
          <button onClick={handlePrev} className="hover:scale-110 active:scale-95 transition-transform opacity-80 hover:opacity-100">
            <SkipBack size={32} fill="currentColor" />
          </button>
          
          <button 
            onClick={togglePlay}
            className={`w-16 h-16 rounded-full flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform shadow-xl ${isRice ? 'bg-purple-600 shadow-purple-500/30' : 'bg-orange-500 shadow-orange-500/30'}`}
          >
            {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
          </button>
          
          <button onClick={handleNext} className="hover:scale-110 active:scale-95 transition-transform opacity-80 hover:opacity-100">
            <SkipForward size={32} fill="currentColor" />
          </button>

          <button className="opacity-40 hover:opacity-100 transition-opacity p-2">
            <Volume2 size={20} />
          </button>
        </div>
      </div>
    </MobileFrame>
  );
});
