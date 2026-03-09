import { Terminal, Cpu, FolderGit2, Github, Linkedin, Mail } from "lucide-react";

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
];

export const socialIcons = [
  { id: "github", icon: Github, label: "github", url: "https://github.com/TANISHX1", color: "text-zinc-400" },
  { id: "linkedin", icon: Linkedin, label: "linkedin", url: "https://www.linkedin.com/in/tanish-shivhare-71b576222", color: "text-blue-400" },
  { id: "mail", icon: Mail, label: "email", url: "mailto:Tanishshivhare2@gmail.com", color: "text-red-400" },
];
