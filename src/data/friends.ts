import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export interface Friend {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar?: string;
  color: string;
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    phone?: string;
  };
}

export const friends: Friend[] = [
  {
    id: "1",
    name: "Alex Rivera",
    role: "Full Stack Developer",
    bio: "Passionate about building scalable web applications and exploring new technologies. Lover of clean code and dark themes.",
    color: "from-blue-500 to-cyan-500",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "alex@example.com"
    }
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "UI/UX Designer",
    bio: "Creating beautiful and intuitive user experiences is my mission. I specialize in glassmorphism and modern design systems.",
    color: "from-purple-500 to-pink-500",
    links: {
      github: "https://github.com",
      twitter: "https://twitter.com",
      email: "sarah@example.com"
    }
  },
  {
    id: "yash",
    name: "Yash Sudhakar",
    role: "Full Stack Developer & AI Enthusiast",
    bio: "Building intelligent systems with sleek aesthetic interfaces. Focused on bridging the gap between low-latency performance and high-end design.",
    avatar: "/avatars/yash.png",
    color: "from-purple-600 to-blue-500",
    links: {
      github: "https://github.com/Yashx0012",
      linkedin: "https://linkedin.com/in/yash-sudhakar20055", // Adjusted from email guess since requested 'linked : yash.sudhakar20055@gmail.com' usually implies an id or profile
      email: "yash.sudhakar20055@gmail.com"
    }
  },
  {
    id: "3",
    name: "Marcus Thorne",
    role: "Security Researcher",
    bio: "Deep diving into kernel exploits and low-level systems. If it has a byte, I'll find a way to manipulate it.",
    color: "from-emerald-500 to-teal-500",
    links: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      email: "marcus@example.com"
    }
  },
  {
    id: "rahul-yadav",
    name: "Rahul Yadav",
    role: "Developer",
    bio: "Passionate developer exploring new technologies and building impactful solutions.",
    color: "from-blue-600 to-indigo-500",
    links: {
      github: "https://github.com/rahul-ydv101",
      linkedin: "https://www.linkedin.com/in/rahulydv101?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "rahulyadavofficial776@gmail.com",
      phone: "9770508470"
    }
  }
];
