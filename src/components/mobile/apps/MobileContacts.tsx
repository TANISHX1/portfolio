"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MobileFrame } from "../MobileFrame";
import { friends, Friend } from "@/data/friends";
import { useTheme } from "@/context/ThemeContext";
import { Search, Github, Linkedin, Mail, Twitter } from "lucide-react";

export const MobileContacts = React.memo(function MobileContacts({ onClose }: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const [search, setSearch] = useState("");

  const filteredFriends = friends.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.role.toLowerCase().includes(search.toLowerCase()) ||
    f.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MobileFrame title="Contacts" onClose={onClose}>
      <div className={`p-4 h-full flex flex-col ${isRice ? 'text-purple-100' : 'text-zinc-200'}`}>
        <div className="relative mb-6 mt-2">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
          <input 
            type="text" 
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-[13px] outline-none focus:border-white/30 transition-colors ${isRice ? 'focus:border-purple-500/50' : 'focus:border-emerald-500/50'}`}
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4 pb-12">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-10 opacity-50 text-sm">No contacts found.</div>
          ) : (
            filteredFriends.map((friend, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={friend.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${friend.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {friend.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      friend.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px]">{friend.name}</h3>
                    <p className={`text-[11px] uppercase tracking-wider font-bold ${isRice ? 'text-purple-400' : 'text-emerald-400'}`}>{friend.role}</p>
                  </div>
                </div>

                <p className="text-[12px] opacity-70 leading-relaxed mb-4 line-clamp-3">
                  {friend.bio}
                </p>

                <div className="flex gap-2">
                  {friend.links.github && (
                    <a href={friend.links.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                      <Github size={16} />
                    </a>
                  )}
                  {friend.links.linkedin && (
                    <a href={friend.links.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-blue-400">
                      <Linkedin size={16} />
                    </a>
                  )}
                  {friend.links.twitter && (
                    <a href={friend.links.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sky-400">
                      <Twitter size={16} />
                    </a>
                  )}
                  {friend.links.email && (
                    <a href={`mailto:${friend.links.email}`} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-red-400">
                      <Mail size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </MobileFrame>
  );
});
