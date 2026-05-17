"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { fetchGithubProfile, fetchGithubRepos } from "@/lib/github";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { desktopIcons } from "@/data/desktop";
import { profile } from "@/data/profile";
import { Wifi, Battery, ChevronLeft, Command } from "lucide-react";

import dynamic from 'next/dynamic';

// Lazy load all mobile applications to significantly reduce initial bundle size
const MobileTerminal = dynamic(() => import('./apps/MobileTerminal').then(mod => mod.MobileTerminal), { ssr: false });
const MobileSkills = dynamic(() => import('./apps/MobileSkills').then(mod => mod.MobileSkills), { ssr: false });
const MobileProjects = dynamic(() => import('./apps/MobileProjects').then(mod => mod.MobileProjects), { ssr: false });
const MobileProjectDetail = dynamic(() => import('./apps/MobileProjectDetail').then(mod => mod.MobileProjectDetail), { ssr: false });
const MobileMusic = dynamic(() => import('./apps/MobileMusic').then(mod => mod.MobileMusic), { ssr: false });
const MobileContacts = dynamic(() => import('./apps/MobileContacts').then(mod => mod.MobileContacts), { ssr: false });
const MobileAbout = dynamic(() => import('./apps/MobileAbout').then(mod => mod.MobileAbout), { ssr: false });
const MobileContact = dynamic(() => import('./apps/MobileContact').then(mod => mod.MobileContact), { ssr: false });
import { Project } from "@/data/projects";

type AppName = "Terminal" | "Skills" | "Projects" | "ProjectDetail" | "Music" | "Contacts" | "Tour" | null;

export function MobileOS({ username }: { username: string }) {
  return (
    <ThemeProvider>
      <MobileOSContent username={username} />
    </ThemeProvider>
  );
}

function MobileOSContent({ username }: { username: string }) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  
  const [activeApp, setActiveApp] = useState<AppName>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [githubData, setGithubData] = useState<{ profile: any, repos: any[] }>({ profile: null, repos: [] });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Initial fetch
    Promise.all([
      fetchGithubProfile(username),
      fetchGithubRepos(username)
    ]).then(([profile, repos]) => {
      setGithubData({ profile, repos });
    }).catch(console.error);

    // Clock
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

    // Boot Sequence
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 2800);

    return () => {
      clearInterval(timer);
      clearTimeout(bootTimer);
    };
  }, [username]);

  const closeApp = () => {
    if (activeApp === "ProjectDetail") {
      setActiveApp("Projects");
      setSelectedProject(null);
    } else {
      setActiveApp(null);
    }
  };

  const TopStatusBar = () => (
    <div className={`flex justify-between items-center px-6 pt-4 pb-2 text-[14px] font-bold z-50 relative ${isRice ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}>
      <span>{time}</span>
      <div className="flex items-center gap-1.5">
        <Wifi size={16} strokeWidth={2.5} />
        <Battery size={18} strokeWidth={2.5} />
      </div>
    </div>
  );

  const availableApps = desktopIcons.filter(item => item.id !== "ProjectDetail" && item.id !== "Tour");
  const gridApps = availableApps.slice(4); // Any apps beyond the first 4
  const dockApps = availableApps.slice(0, 4); // First 4 apps go to the dock

  return (
    <div className={`h-[100dvh] w-full flex flex-col relative overflow-hidden ${isRice ? 'bg-black text-purple-100' : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'}`}>
      
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            key="boot-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center"
          >
             <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
             >
               <Command size={64} className="text-white" strokeWidth={1} />
             </motion.div>
             
             {/* Progress Bar */}
             <div className="absolute bottom-24 w-32 h-1 bg-white/20 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 2.2, ease: "easeInOut" }}
                 className="h-full bg-white rounded-full"
               />
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background (can reuse desktop one or specific mobile one) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/background1.jpg')" }}
      />
      <div className="absolute inset-0 z-0 bg-black/60" />

      <TopStatusBar />

      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {!activeApp ? (
            <motion.div 
              key="homescreen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="h-full flex flex-col justify-between p-6 pb-8"
            >
              {/* App Grid */}
              <div className="grid grid-cols-4 gap-y-8 gap-x-4 pt-4">
                {gridApps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveApp(item.id as AppName)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center bg-white shadow-md active:scale-90 transition-transform ${item.color.replace('text-', 'text-')}`}>
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] font-semibold text-white drop-shadow-md tracking-tight">
                        {item.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* iOS 18 Dock */}
              <div className="w-full h-24 flex items-center justify-around px-4">
                {dockApps.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button 
                      key={item.id} 
                      onClick={() => setActiveApp(item.id as AppName)}
                      className="flex flex-col items-center group active:scale-90 transition-transform"
                    >
                      <div className={`w-14 h-14 rounded-[14px] flex items-center justify-center bg-white shadow-lg ${item.color.replace('text-', 'text-')}`}>
                        <Icon size={28} strokeWidth={1.5} />
                      </div>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active-app"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-black z-20 flex flex-col"
            >
              {activeApp === "Terminal" && <MobileTerminal onClose={closeApp} profile={githubData.profile} />}
              {activeApp === "Skills" && <MobileSkills onClose={closeApp} />}
              {activeApp === "Projects" && <MobileProjects onClose={closeApp} repos={githubData.repos} onSelect={(p: Project) => { setSelectedProject(p); setActiveApp("ProjectDetail"); }} />}
              {activeApp === "ProjectDetail" && selectedProject && <MobileProjectDetail onClose={closeApp} project={selectedProject} />}
              {activeApp === "Music" && <MobileMusic onClose={closeApp} />}
              {activeApp === "Contacts" && <MobileContacts onClose={closeApp} />}
              {activeApp === "About" && <MobileAbout onClose={closeApp} />}
              {activeApp === "ContactMe" && <MobileContact onClose={closeApp} />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
