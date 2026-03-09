"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, GitBranch, Star, Activity } from "lucide-react";

export function Projects({ repos }: { repos: any[] }) {
  if (!repos || repos.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-black text-green-500 font-mono min-h-screen relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border-b border-green-900/50 pb-4"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight flex items-center gap-4">
            <Activity className="w-10 h-10 animate-pulse text-green-400" />
            System Monitor - Active Projects
          </h2>
          <p className="mt-2 text-green-700">PID COMMAND %CPU %MEM USER TIME</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {repos.map((repo, i) => (
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              key={repo.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(0, 255, 65, 0.05)" }}
              className="group flex flex-col p-6 rounded border border-[#222] hover:border-green-500 bg-[#0a0a0a] transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 text-xs text-green-900 group-hover:text-green-500 transition-colors">
                [PID: {repo.id.toString().slice(-4)}]
              </div>
              
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-[#111] rounded border border-[#333] group-hover:border-green-500/50">
                  <Terminal className="text-green-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 group-hover:text-white transition-colors">{repo.name}</h3>
                  <div className="flex gap-4 text-xs mt-2 text-green-700">
                    <span className="flex items-center gap-1"><Cpu size={12} /> {Math.floor(Math.random() * 20 + 1)}.{Math.floor(Math.random() * 9)}%</span>
                    <span className="flex items-center gap-1"><GitBranch size={12} /> {repo.forks_count} forks</span>
                    <span className="flex items-center gap-1"><Star size={12} /> {repo.stargazers_count} stars</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow mt-2 text-sm text-green-600 font-light leading-relaxed">
                &gt; {repo.description || "System utility component without description initialized."}
              </div>

              {repo.language && (
                <div className="mt-6 pt-4 border-t border-[#1a1a1a] text-xs font-bold text-green-800 group-hover:text-green-400">
                  <span className="bg-[#111] px-2 py-1 rounded">LANG: {repo.language}</span>
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
