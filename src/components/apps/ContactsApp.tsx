"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowFrame } from "./WindowFrame";
import { friends, Friend } from "@/data/friends";
import { Github, Linkedin, Mail, Twitter, ExternalLink, User, Phone } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export const ContactsApp = React.memo(function ContactsApp({ 
  isActive, isMinimized, onClose, onMinimize, onClick, setIsDragging 
}: any) {
  const { theme } = useTheme();
  const isRice = theme === "rice";
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <WindowFrame 
      title="Contacts — Social Hub" 
      isActive={isActive} 
      isMinimized={isMinimized} 
      onClose={onClose} 
      onMinimize={onMinimize} 
      onClick={onClick} 
      width="w-[900px] max-w-[95vw]" 
      height="h-[600px]"
      initX={150}
      initY={100}
      onDragChange={setIsDragging}
    >
      <div className={`flex h-full overflow-hidden ${isRice ? 'bg-[#0a0a0c]/60' : 'bg-white/80'}`}>
        {/* Sidebar / List */}
        <div className={`w-1/3 border-r ${isRice ? 'border-purple-500/20 bg-black/40' : 'border-zinc-200 bg-zinc-50/50'} overflow-y-auto p-4 custom-scrollbar`}>
          <h2 className={`text-xs font-black uppercase tracking-widest mb-6 opacity-50 ${isRice ? 'text-purple-400' : 'text-zinc-500'}`}>
            My Connections
          </h2>
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3"
          >
            {friends.map((friend) => (
              <motion.div
                key={friend.id}
                variants={itemVariants}
                onClick={() => setSelectedFriend(friend)}
                className={`p-3 rounded-xl cursor-pointer transition-all border ${
                  selectedFriend?.id === friend.id
                    ? (isRice ? 'bg-purple-500/20 border-purple-500/50' : 'bg-blue-500/10 border-blue-500/30')
                    : (isRice ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white/50 border-transparent hover:bg-white group')
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center shadow-lg relative ${friend.avatar ? '' : `bg-gradient-to-br ${friend.color}`}`}>
                    {friend.avatar ? (
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                    ) : (
                      <User size={20} className="text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isRice ? 'text-white' : 'text-zinc-800'}`}>{friend.name}</h3>
                    <p className={`text-[10px] opacity-60 ${isRice ? 'text-purple-200' : 'text-zinc-500'}`}>{friend.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Detail View */}
        <div className="flex-1 overflow-y-auto p-8 relative custom-scrollbar">
          <AnimatePresence mode="wait">
            {selectedFriend ? (
              <motion.div
                key={selectedFriend.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="flex flex-col items-center text-center mb-10">
                  <div className={`relative w-32 h-32 rounded-3xl bg-gradient-to-br ${selectedFriend.color} p-1 mb-6 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500 group`}>
                    <div className="w-full h-full bg-[#0a0a0c] rounded-[22px] flex items-center justify-center overflow-hidden">
                      {selectedFriend.avatar ? (
                        <img src={selectedFriend.avatar} alt={selectedFriend.name} className="w-full h-full object-cover" />
                      ) : (
                        <User size={48} className="text-white opacity-80" />
                      )}
                    </div>
                  </div>
                  <h1 className={`text-3xl font-black mb-2 ${isRice ? 'text-white' : 'text-zinc-900'}`}>
                    {selectedFriend.name}
                  </h1>
                  <p className={`text-sm font-bold tracking-widest uppercase ${isRice ? 'text-purple-400' : 'text-blue-600'}`}>
                    {selectedFriend.role}
                  </p>
                </div>

                <div className={`p-6 rounded-2xl border mb-8 ${isRice ? 'bg-black/40 border-purple-500/20' : 'bg-white border-zinc-200'} shadow-sm`}>
                  <h4 className={`text-[10px] font-black uppercase tracking-tighter mb-4 opacity-50 ${isRice ? 'text-purple-300' : 'text-zinc-400'}`}>
                    Biography
                  </h4>
                  <p className={`text-sm leading-relaxed ${isRice ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {selectedFriend.bio}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {selectedFriend.links.github && (
                    <a href={selectedFriend.links.github} target="_blank" rel="noopener" className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isRice ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-zinc-200 hover:border-blue-500 text-zinc-700'}`}>
                      <div className="flex items-center gap-3">
                        <Github size={18} />
                        <span className="text-sm font-bold">GitHub</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                    </a>
                  )}
                  {selectedFriend.links.linkedin && (
                    <a href={selectedFriend.links.linkedin} target="_blank" rel="noopener" className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isRice ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-zinc-200 hover:border-blue-500 text-zinc-700'}`}>
                      <div className="flex items-center gap-3">
                        <Linkedin size={18} />
                        <span className="text-sm font-bold">LinkedIn</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                    </a>
                  )}
                  {selectedFriend.links.twitter && (
                    <a href={selectedFriend.links.twitter} target="_blank" rel="noopener" className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isRice ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-zinc-200 hover:border-blue-500 text-zinc-700'}`}>
                      <div className="flex items-center gap-3">
                        <Twitter size={18} />
                        <span className="text-sm font-bold">Twitter</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                    </a>
                  )}
                  {selectedFriend.links.email && (
                    <a href={`mailto:${selectedFriend.links.email}`} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isRice ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-zinc-200 hover:border-blue-500 text-zinc-700'}`}>
                      <div className="flex items-center gap-3">
                        <Mail size={18} />
                        <span className="text-sm font-bold">Email</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                    </a>
                  )}
                  {selectedFriend.links.phone && (
                    <a href={`tel:${selectedFriend.links.phone}`} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isRice ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' : 'bg-white border-zinc-200 hover:border-blue-500 text-zinc-700'}`}>
                      <div className="flex items-center gap-3">
                        <Phone size={18} />
                        <span className="text-sm font-bold">Call</span>
                      </div>
                      <ExternalLink size={14} className="opacity-40" />
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <User size={80} strokeWidth={1} className="mb-4" />
                <p className="font-bold tracking-widest uppercase text-xs">Select a contact to view details</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </WindowFrame>
  );
});
