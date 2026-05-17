"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalApp } from "./apps/TerminalApp";
import { SkillsApp } from "./apps/SkillsApp";
import { ProjectsApp } from "./apps/ProjectsApp";
import { ProjectDetailApp } from "@/components/apps/ProjectDetailApp";
import { MusicApp } from "./apps/MusicApp";
import { ContactsApp } from "./apps/ContactsApp";
import { TourOverlay } from "./os/TourOverlay";
import { AboutApp } from "./apps/AboutApp";
import { ContactApp } from "./apps/ContactApp";
import { Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { desktopIcons } from "@/data/desktop";
import { TopBar } from "./os/TopBar";
import { Dock } from "./os/Dock";
import { DynamicBackground } from "./os/DynamicBackground";
import { SuspendView } from "./os/SuspendView";
import { ShutdownView } from "./os/ShutdownView";
import { fetchGithubProfile, fetchGithubRepos } from "@/lib/github";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { BootSequence } from "./os/BootSequence";
import { WelcomeView } from "./os/WelcomeView";
import { Star, LayoutGrid, Monitor, History, LogOut, ChevronRight } from "lucide-react";

type AppName = "Terminal" | "Skills" | "Projects" | "ProjectDetail" | "Music" | "Contacts" | "Tour" | "About" | "ContactMe" | null;
type SystemState = 'booting' | 'welcome' | 'running' | 'suspended' | 'shutdown';

export function Desktop({ username }: { username: string }) {
  return (
    <ThemeProvider>
      <DesktopContent username={username} />
    </ThemeProvider>
  );
}

function DesktopContent({ username }: { username: string }) {
  const [systemState, setSystemState] = useState<SystemState>('booting');
  const [realLogs, setRealLogs] = useState<string[]>([]);
  const [githubData, setGithubData] = useState<{ profile: any, repos: any[] }>({ profile: null, repos: [] });
  const [openApps, setOpenApps] = useState<AppName[]>(["Terminal"]);
  const [activeApp, setActiveApp] = useState<AppName>("Terminal");
  const [minimizedApps, setMinimizedApps] = useState<AppName[]>([]);
  const [isTourActive, setIsTourActive] = useState(false);
  const [showLauncher, setShowLauncher] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [volume, setVolume] = useState(70);
  const [terminalCommand, setTerminalCommand] = useState<string | null>(null);
  const { theme } = useTheme();

  // Optimization: Pre-load data and assets during boot
  useEffect(() => {
    if (systemState !== 'booting') return;
    
    setRealLogs([]); // Clear logs for new boot
    const addLog = (msg: string) => setRealLogs(prev => [...prev, msg]);

    async function initializeSystem() {
      addLog("Initializing Network Stack...");
      
      // 1. Fetch GitHub Data
      try {
        addLog(`Synchronizing identity for ${username}...`);
        const [githubProfile, githubRepos] = await Promise.all([
          fetchGithubProfile(username).then(res => { addLog(" ✓ GitHub profile verified"); return res; }),
          fetchGithubRepos(username).then(res => { addLog(" ✓ Repositories indexed"); return res; })
        ]);
        setGithubData({ profile: githubProfile, repos: githubRepos });

        // 2. Pre-load Critical Assets (Backgrounds + Textures + Sounds)
        addLog("Caching UI resources and system textures...");
        const assetsToPreload = [
          '/background1.jpg',
          '/background2.jpg',
          'https://grainy-gradients.vercel.app/noise.svg',
          '/background sounds/opening_sound.wav',
          githubProfile?.avatar_url,
          // Assets preloading
        ].filter(Boolean);

        await Promise.all(assetsToPreload.map(src => {
          return new Promise((resolve) => {
            if (src?.endsWith('.wav') || src?.endsWith('.mp3')) {
              const audio = new Audio();
              audio.src = src;
              audio.preload = "auto";
              audio.oncanplaythrough = () => {
                addLog(`   • Audio cached: ${src.split('/').pop()}`);
                resolve(null);
              };
              audio.onerror = resolve;
            } else {
              const img = new Image();
              img.src = src!;
              img.onload = () => {
                if (src?.includes('background')) addLog(`   • Texture cached: ${src.split('/').pop()}`);
                resolve(null);
              };
              img.onerror = resolve; 
            }
          });
        }));
        
        addLog("[ OK ] Graphics engine and shell resources ready.");
      } catch (e) {
        addLog("[ WARN ] Network sync interrupted. Loading offline cache.");
      }

      addLog("Starting graphical environment...");
    }

    initializeSystem();
  }, [username, systemState]);

  // Optimized openApp to avoid stale state
  const openApp = useCallback((app: AppName, command?: string) => {
    if (!app) return;
    if (app === "Tour") {
      setIsTourActive(true);
      setShowLauncher(false);
      return;
    }
    if (app === "Terminal" && command) {
      setTerminalCommand(command);
    }
    setOpenApps(prev => prev.includes(app) ? prev : [...prev, app]);
    setMinimizedApps(prev => prev.filter(a => a !== app));
    setActiveApp(app);
    setShowLauncher(false);
  }, []);

  const closeApp = useCallback((app: AppName) => {
    setOpenApps(prev => prev.filter(a => a !== app));
    setMinimizedApps(prev => prev.filter(a => a !== app));
    setActiveApp(prev => prev === app ? null : prev);
  }, []);

  const toggleMinimize = useCallback((app: AppName) => {
    if (!app) return;
    if (app === "Tour") {
      setIsTourActive(prev => !prev);
      return;
    }
    setMinimizedApps(prev => {
      if (prev.includes(app)) {
        const next = prev.filter(a => a !== app);
        setActiveApp(app);
        return next;
      } else {
        setActiveApp(null);
        return [...prev, app];
      }
    });
  }, []);

  const closeAllApps = useCallback(() => {
    setOpenApps([]);
    setMinimizedApps([]);
    setActiveApp(null);
  }, []);

  // Auto-close windows when tour starts
  useEffect(() => {
    if (isTourActive) {
      closeAllApps();
    }
  }, [isTourActive, closeAllApps]);

  const launcherItems = [
    { label: "Favorites", icon: Star },
    { label: "Applications", icon: LayoutGrid },
    { label: "Computer", icon: Monitor },
    { label: "History", icon: History },
    { label: "Leave", icon: LogOut },
  ];

  const isRice = theme === "rice";

  // Auto-close tab on shutdown
  useEffect(() => {
    if (systemState === 'shutdown') {
      const timer = setTimeout(() => {
        try {
          window.close();
        } catch (e) {
          console.warn("Auto-close blocked by browser. This usually only works if the tab was opened via script.");
        }
      }, 2000); // 2 second delay to show "Shutting down" effect if any
      return () => clearTimeout(timer);
    }
  }, [systemState]);

  return (
    <AnimatePresence mode="wait">
      {systemState === 'booting' && (
        <BootSequence 
          key="boot" 
          onComplete={() => setSystemState('welcome')} 
          realLogs={realLogs}
        />
      )}

      {systemState === 'welcome' && (
        <WelcomeView key="welcome" onComplete={() => setSystemState('running')} />
      )}

      {systemState === 'suspended' && (
        <SuspendView key="suspend" onWake={() => setSystemState('running')} />
      )}

      {systemState === 'shutdown' && (
        <ShutdownView key="shutdown" onPowerOn={() => setSystemState('booting')} />
      )}

      {systemState === 'running' && (
        <motion.div 
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`h-screen w-full relative overflow-hidden font-sans flex flex-col selection:bg-blue-500/30 transition-colors duration-300 ${isRice ? 'bg-black text-purple-100' : 'bg-white text-zinc-900'}`}
        >
          {/* OS Background */}
          <DynamicBackground />

          <TopBar 
            activeApp={activeApp} 
            onLauncherToggle={() => setShowLauncher(!showLauncher)} 
            showLauncher={showLauncher}
            profileName={githubData.profile?.name || profile.name}
            isDragging={isDragging}
            volume={volume}
            setVolume={setVolume}
            onSystemAction={(action) => {
              if (action === 'restart') {
                setSystemState('booting');
                setOpenApps(["Terminal"]);
                setActiveApp("Terminal");
                setMinimizedApps([]);
              }
              if (action === 'shutdown') setSystemState('shutdown');
              if (action === 'suspend') setSystemState('suspended');
            }}
          />

          <main className="flex-1 relative z-10 p-4">
            {/* Sidebar Launcher */}
            <AnimatePresence>
              {showLauncher && (
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className={`absolute top-4 left-4 z-[100] w-80 h-[calc(100%-2rem)] backdrop-blur-2xl border shadow-2xl rounded-xl flex overflow-hidden ${
                    isRice ? 'bg-black/90 border-purple-500/20 shadow-purple-500/10' : 'bg-[#eff0f1]/90 border-white/40 shadow-2xl'
                  }`}
                >
                  <div className={`w-16 flex flex-col items-center py-6 gap-8 shrink-0 ${isRice ? 'bg-zinc-900' : 'bg-[#31363b]'}`}>
                    {launcherItems.map((item, idx) => (
                      <button key={idx} className="group relative" title={item.label}>
                        <item.icon size={20} className="text-white/60 group-hover:text-blue-400 transition-colors" />
                        {idx === 0 && <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-md ${isRice ? 'bg-purple-500' : 'bg-blue-500'}`} />}
                      </button>
                    ))}
                  </div>

                  <div className={`flex-1 p-6 flex flex-col ${isRice ? 'text-purple-100' : 'text-[#31363b]'}`}>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6 px-2">Applications</div>
                    <div className="flex flex-col gap-1">
                      {desktopIcons.filter(item => item.id !== "ProjectDetail" && item.id !== "ContactMe").map(item => (
                        <button key={item.id} onClick={() => openApp(item.id as AppName)} className={`flex items-center justify-between p-3 rounded-xl transition-all group ${isRice ? 'hover:bg-purple-500/10' : 'hover:bg-black/5'}`}>
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg shadow-sm border ${isRice ? 'bg-zinc-800 border-purple-500/20 group-hover:border-purple-500/50' : 'bg-white border-black/5 group-hover:border-blue-500/30'} ${item.color}`}>
                              <item.icon size={20} />
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="text-xs font-bold">{item.label}</span>
                              <span className="text-[10px] text-zinc-500">System Application</span>
                            </div>
                          </div>
                          <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Icons */}
            <div className="hidden lg:flex flex-col gap-6 items-start w-24 pt-4 relative z-10">
              {desktopIcons.filter(item => item.id !== "ProjectDetail" && item.id !== "ContactMe").map((item) => {
                const Icon = item.icon;
                const isActive = activeApp === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => openApp(item.id as AppName)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex flex-col items-center gap-2 group w-full"
                  >
                    <div className={`p-4 rounded-2xl backdrop-blur-md border transition-all duration-500 ${
                      isActive 
                        ? (isRice ? 'border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] bg-purple-500/10' : 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-black/40') 
                        : (isRice ? 'border-purple-500/5 bg-black/40 group-hover:border-purple-500/20' : 'border-white/5 bg-black/40 group-hover:border-white/20')
                    } ${item.color}`}>
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isRice ? 'text-purple-300/50 group-hover:text-purple-300' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Window Area - Fixed Positioning to avoid "ghost" central overlap */}
            <div className="absolute inset-0 pointer-events-none p-6 pb-24 overflow-hidden">
              <AnimatePresence>
                {openApps.includes("Terminal") && (
                  <TerminalApp 
                    key="term" 
                    id="terminal-window"
                    profile={githubData.profile || profile} 
                    isActive={activeApp === "Terminal"} 
                    isMinimized={minimizedApps.includes("Terminal")}
                    onClose={() => closeApp("Terminal")} onMinimize={() => toggleMinimize("Terminal")} onClick={() => setActiveApp("Terminal")}
                    setIsDragging={setIsDragging}
                    initialCommand={terminalCommand}
                  />
                )}
                {openApps.includes("Skills") && (
                  <SkillsApp 
                    key="skills" isActive={activeApp === "Skills"} isMinimized={minimizedApps.includes("Skills")}
                    onClose={() => closeApp("Skills")} onMinimize={() => toggleMinimize("Skills")} onClick={() => setActiveApp("Skills")}
                    setIsDragging={setIsDragging}
                  />
                )}
                {openApps.includes("Projects") && (
                  <ProjectsApp 
                    key="proj" 
                    id="projects-window"
                    repos={githubData.repos} 
                    isActive={activeApp === "Projects"} 
                    isMinimized={minimizedApps.includes("Projects")}
                    onClose={() => closeApp("Projects")} onMinimize={() => toggleMinimize("Projects")} onClick={() => setActiveApp("Projects")}
                    onProjectSelect={(project: Project) => {
                      setSelectedProject(project);
                      openApp("ProjectDetail");
                    }}
                    setIsDragging={setIsDragging}
                  />
                )}
                {openApps.includes("ProjectDetail") && selectedProject && (
                  <ProjectDetailApp 
                    key="proj-detail" project={selectedProject} isActive={activeApp === "ProjectDetail"} isMinimized={minimizedApps.includes("ProjectDetail")}
                    onClose={() => {
                      closeApp("ProjectDetail");
                      setSelectedProject(null);
                    }} 
                    onMinimize={() => toggleMinimize("ProjectDetail")} onClick={() => setActiveApp("ProjectDetail")}
                    setIsDragging={setIsDragging}
                  />
                )}
                {openApps.includes("Music") && (
                  <MusicApp 
                    key="music" 
                    isActive={activeApp === "Music"} 
                    isMinimized={minimizedApps.includes("Music")}
                    onClose={() => closeApp("Music")} 
                    onMinimize={() => toggleMinimize("Music")} 
                    onClick={() => setActiveApp("Music")}
                    setIsDragging={setIsDragging}
                    systemVolume={volume}
                  />
                )}

                {openApps.includes("Contacts") && (
                  <ContactsApp 
                    key="Contacts"
                    isActive={activeApp === "Contacts"}
                    isMinimized={minimizedApps.includes("Contacts")}
                    onClose={() => closeApp("Contacts")}
                    onMinimize={() => toggleMinimize("Contacts")}
                    onClick={() => setActiveApp("Contacts")}
                    setIsDragging={setIsDragging}
                  />
                )}

                {openApps.includes("About") && (
                  <AboutApp 
                    key="About"
                    isActive={activeApp === "About"}
                    isMinimized={minimizedApps.includes("About")}
                    onClose={() => closeApp("About")}
                    onMinimize={() => toggleMinimize("About")}
                    onClick={() => setActiveApp("About")}
                    setIsDragging={setIsDragging}
                  />
                )}

                {openApps.includes("ContactMe") && (
                  <ContactApp 
                    key="ContactMe"
                    isActive={activeApp === "ContactMe"}
                    isMinimized={minimizedApps.includes("ContactMe")}
                    onClose={() => closeApp("ContactMe")}
                    onMinimize={() => toggleMinimize("ContactMe")}
                    onClick={() => setActiveApp("ContactMe")}
                    setIsDragging={setIsDragging}
                  />
                )}

                {isTourActive && (
                  <TourOverlay 
                    key="Tour" 
                    onComplete={() => setIsTourActive(false)} 
                    openApp={openApp}
                    closeApp={closeApp}
                    closeAllApps={closeAllApps}
                    selectedProject={selectedProject}
                  />
                )}
              </AnimatePresence>
            </div>
          </main>

          <Dock 
            onOpenApp={openApp} 
            onToggleMinimize={toggleMinimize}
            openApps={openApps as string[]} 
            activeApp={activeApp} 
            isDragging={isDragging}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
