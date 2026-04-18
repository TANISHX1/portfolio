import { Terminal, Cpu, FolderGit2, Github, Linkedin, Mail, Info, Music, Users, Compass } from "lucide-react";

export const desktopConfig = {
  wallpaper: "/wallpapers/himalayas.jpg", // Placeholder until verified
  theme: "hyprland",
  gaps: 12,
  borderRadius: 12,
  blurStrength: 20,
};

export const desktopIcons = [
  { id: "Terminal", icon: Terminal, label: "Konsole", color: "text-[#22da6e]" },
  { id: "Projects", icon: FolderGit2, label: "Dolphin", color: "text-blue-500" },
  { id: "Skills", icon: Cpu, label: "System Info", color: "text-[#3daee9]" },
  { id: "Music", icon: Music, label: "Amarok", color: "text-orange-400" },
  { id: "ProjectDetail", icon: Info, label: "Project Info", color: "text-violet-400" },
  { id: "Contacts", icon: Users, label: "Contacts", color: "text-emerald-400" },
  { id: "Tour", icon: Compass, label: "OS Tour", color: "text-amber-400" },
];

export const socialIcons = [
  { id: "github", icon: Github, label: "github", url: "https://github.com/TANISHX1", color: "text-zinc-400" },
  { id: "linkedin", icon: Linkedin, label: "linkedin", url: "https://www.linkedin.com/in/tanish-shivhare-71b576222", color: "text-blue-400" },
  { id: "mail", icon: Mail, label: "email", url: "mailto:Tanishshivhare2@gmail.com", color: "text-red-400" },
];
