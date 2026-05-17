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
    id: "rahul-yadav",
    name: "Rahul Yadav",
    role: "Full Stack & Vision Developer",
    bio: "Versatile developer bridging systems programming and modern web technologies. Experienced in building robust full-stack applications in TypeScript and developing computer vision solutions like virtual tripwire intrusion systems with OpenCV. Actively solving complex algorithmic challenges in C++.",
    avatar: "/avatars/rahul.jpg",
    color: "from-blue-600 to-indigo-500",
    links: {
      github: "https://github.com/rahul-ydv101",
      linkedin: "https://www.linkedin.com/in/rahulydv101?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "rahulyadavofficial776@gmail.com",
      phone: "9770508470"
    }
  },
  {
    id: "lavanya-bajpai",
    name: "Lavanya Bajpai",
    role: "Full Stack & ML Developer",
    bio: "Innovative developer with a strong focus on Python-based machine learning applications and interactive web development. Creator of intelligent image detection tools, with experience architecting comprehensive systems like seat allocation platforms and modern TypeScript applications.",
    avatar: "/avatars/lavanya_.png",
    color: "from-pink-600 to-rose-500",
    links: {
      github: "https://github.com/Lavanya-Bajpai",
      linkedin: "https://www.linkedin.com/in/lavanya-bajpai-0932a332a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      email: "lavanya1007bajpai@gmail.com"
    }
  },
  {
    id: "seahcodes",
    name: "Shruti Tiwari",
    role: "Frontend & UI Developer",
    bio: "Creative developer focused on crafting intuitive user experiences and practical applications. Experienced in building responsive tools like academic planners and currency converters, blending foundational low-level programming with modern JavaScript logic.",
    avatar: "/avatars/shruti.jpg",
    color: "from-emerald-600 to-teal-500",
    links: {
      github: "https://github.com/seahcodes",
      linkedin: "https://www.linkedin.com/in/shruti-tiwari-6a558633a/",
      email: "seah4393@gmail.com"
    }
  }
];
