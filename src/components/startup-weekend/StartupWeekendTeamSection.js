"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import teamMembers from "@/data/team.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const photoPositionOverrides = {
  4: "object-top", // Raphaela
  5: "object-[center_10%]", // Alexandra
};

const windowColors = [
  "bg-blue-600",
  "bg-yellow-400",
  "bg-pink-500",
  "bg-techstars-green"
];

function TeamWindowCard({ member, index }) {
  const photoClass = photoPositionOverrides[member.id] || "object-center";
  const headerBg = windowColors[index % windowColors.length];
  const textColor = ["bg-yellow-400", "bg-techstars-green"].includes(headerBg) ? "text-black" : "text-white";
  
  // Create a scattered rotation feel
  const rotations = [-3, 2, -2, 4, -1, 3, 0];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.div
      variants={cardVariants}
      className="relative z-10 hover:z-50"
    >
      <div 
        style={{ transform: `rotate(${rotation}deg)` }}
        className="w-full bg-white brutal-border brutal-shadow shadow-[12px_12px_0px_#000] flex flex-col transform hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 group"
      >
        {/* Window Top Bar */}
        <div className={`w-full flex justify-between items-center px-4 py-3 border-b-4 border-black ${headerBg}`}>
          <span className={`font-mono font-black text-xs md:text-sm uppercase tracking-widest ${textColor} truncate mr-2`}>
            {member.name.split(" ")[0].toUpperCase()}_V1.EXE
          </span>
          <div className="flex space-x-1.5 shrink-0">
            <div className="w-5 h-5 flex items-center justify-center border-2 border-black bg-white select-none cursor-pointer hover:bg-gray-200">
               <span className="text-[10px] text-black font-bold mb-1">-</span>
            </div>
            <div className="w-5 h-5 flex items-center justify-center border-2 border-black bg-white select-none cursor-pointer hover:bg-gray-200">
               <div className="w-2.5 h-2.5 border-2 border-black" />
            </div>
            <div className="w-5 h-5 flex items-center justify-center border-2 border-black bg-white select-none cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
               <span className="text-[12px] font-black leading-none mb-0.5">×</span>
            </div>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-4 md:p-6 flex flex-col h-full bg-white">
          {/* Image Container with scrapbook mask */}
          <div className="relative w-full aspect-square mb-6 brutal-border bg-gray-50 overflow-hidden">
             {/* Fake scrapbook background blocks */}
             <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none z-10" />
             <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-60 mix-blend-multiply z-10 ${windowColors[(index + 1) % windowColors.length]}`} />
             <div className={`absolute bottom-0 left-0 w-full h-1/3 opacity-30 mix-blend-multiply z-10 ${windowColors[(index + 2) % windowColors.length]}`} />
             
             {/* The actual photo */}
             <Image
                src={member.photo}
                alt={member.name}
                fill
                className={`object-cover z-0 grayscale hover:grayscale-0 transition-all duration-500 ${photoClass}`}
                sizes="(max-width: 768px) 100vw, 33vw"
             />

             {/* Little tag inside the photo */}
             <div className="absolute bottom-2 right-2 bg-black text-techstars-green text-[10px] font-black uppercase px-2 py-1 brutal-border z-20 shadow-[2px_2px_0_#39C463]">
               &gt; SYS_SYNC
             </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-2xl font-black uppercase text-black w-full text-left leading-tight mb-1">
              {member.name}
            </h3>
            <h4 className="text-xs font-black uppercase text-gray-400 w-full text-left tracking-widest mb-4 border-b-2 border-black/10 pb-4">
              {member.role}
            </h4>

            {/* Companies row */}
            {member.companies && member.companies.length > 0 && (
              <div className="flex flex-col gap-2 w-full justify-start mt-auto mb-4">
                <span className="text-[10px] font-black uppercase text-black tracking-widest bg-yellow-400 self-start px-2 py-0.5 brutal-border">
                  JÁ ATUOU EM
                </span>
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  {member.companies.map((company, cIndex) => (
                    <div key={cIndex} className="bg-white p-1 md:p-1.5 brutal-border shadow-[2px_2px_0_#000] rounded-sm group/logo relative hover:-translate-y-1 transition-transform h-10 md:h-14 min-w-[60px] flex items-center justify-center">
                      <img 
                        src={company.logo}
                        alt={company.name}
                        className="max-h-full max-w-[80px] md:max-w-[100px] object-contain transition-all mix-blend-multiply"
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = '/images/TS_favcon.png'; // Fallback
                        }}
                      />
                      {/* Tooltip */}
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-[10px] font-bold px-2 py-1 brutal-border opacity-0 group-hover/logo:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags (replaces long bio text) */}
            <div className={`flex flex-wrap gap-2 w-full justify-start ${(!member.companies || member.companies.length === 0) ? 'mt-auto' : ''}`}>
              {member.tags && member.tags.map((tag, tIndex) => (
                <span 
                  key={tIndex} 
                  className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 brutal-border shadow-[2px_2px_0_#000] bg-white cursor-default hover:-translate-y-1 transition-transform ${
                    windowColors[tIndex % windowColors.length] === 'bg-black' ? 'hover:bg-yellow-400' : `hover:${windowColors[tIndex % windowColors.length]}`
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default function StartupWeekendTeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#f4f4f0] relative overflow-hidden brutal-border-b">
      {/* Background Dots */}
      <div className="absolute inset-0 dot-pattern opacity-60 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-24 flex flex-col items-center"
        >
          {/* Header to match the "O QUE VOCÊ VAI VENDER" block */}
          <motion.h2
            variants={cardVariants}
            className="text-6xl md:text-8xl font-black text-black uppercase mb-6 tracking-tighter drop-shadow-[4px_4px_0_#fff]"
          >
            QUEM ESTÁ <br />
            <span className="italic">POR TRÁS.</span>
          </motion.h2>

          <motion.div 
            variants={cardVariants}
            className="bg-black brutal-border p-4 shadow-[4px_4px_0_#9333ea] rotate-[-1deg] max-w-3xl"
          >
            <p className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">
              DO ACOMPANHAMENTO METODOLÓGICO À PONTARIA NAS VENDAS. SE TEM PROJETO E CORAGEM, A GENTE ACELERA.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
           initial="hidden"
           animate={isInView ? "visible" : "hidden"}
           variants={containerVariants}
           className="relative"
        >
           {/* Grid matching the scattered layout feel */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12 pb-16">
             {teamMembers.map((member, index) => (
                <TeamWindowCard key={member.id} member={member} index={index} />
             ))}
           </div>
        </motion.div>
      </div>
    </section>
  );
}
