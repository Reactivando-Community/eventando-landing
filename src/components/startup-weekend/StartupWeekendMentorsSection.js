"use client";

import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import mentors from "@/data/mentores.json";

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

const windowColors = [
  "bg-purple-600",
  "bg-orange-500",
  "bg-teal-500",
  "bg-rose-500",
];

const BIO_TRUNCATE_LENGTH = 150;

function MentorWindowCard({ member, index }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const headerBg = windowColors[index % windowColors.length];
  const textColor = ["bg-orange-500"].includes(headerBg)
    ? "text-black"
    : "text-white";

  const rotations = [-3, 2, -2, 4, -1, 3, 0, -4, 1];
  const rotation = rotations[index % rotations.length];

  const needsTruncation = member.bio.length > BIO_TRUNCATE_LENGTH;
  const displayBio =
    needsTruncation && !isExpanded
      ? member.bio.substring(0, BIO_TRUNCATE_LENGTH).trimEnd() + "..."
      : member.bio;

  return (
    <motion.div variants={cardVariants} className="relative z-10 hover:z-50">
      <div
        style={{ transform: `rotate(${rotation}deg)` }}
        className="w-full bg-white brutal-border brutal-shadow shadow-[12px_12px_0px_#000] flex flex-col transform hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 group"
      >
        {/* Window Top Bar */}
        <div
          className={`w-full flex justify-between items-center px-4 py-3 border-b-4 border-black ${headerBg}`}
        >
          <span
            className={`font-mono font-black text-xs md:text-sm uppercase tracking-widest ${textColor} truncate mr-2`}
          >
            {member.name.split(" ")[0].toUpperCase()}_MENTOR.EXE
          </span>
          <div className="flex space-x-1.5 shrink-0">
            <div className="w-5 h-5 flex items-center justify-center border-2 border-black bg-white select-none cursor-pointer hover:bg-gray-200">
              <span className="text-[10px] text-black font-bold mb-1">-</span>
            </div>
            <div className="w-5 h-5 flex items-center justify-center border-2 border-black bg-white select-none cursor-pointer hover:bg-gray-200">
              <div className="w-2.5 h-2.5 border-2 border-black" />
            </div>
            <div className="w-5 h-5 flex items-center justify-center border-2 border-black bg-white select-none cursor-pointer hover:bg-red-500 hover:text-white transition-colors">
              <span className="text-[12px] font-black leading-none mb-0.5">
                ×
              </span>
            </div>
          </div>
        </div>

        {/* Window Content */}
        <div className="p-4 md:p-6 flex flex-col h-full bg-white">
          {/* Image Container */}
          <div className="relative w-full aspect-square mb-6 brutal-border bg-gray-50 overflow-hidden">
            <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none z-10" />
            <div
              className={`absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-60 mix-blend-multiply z-10 ${windowColors[(index + 1) % windowColors.length]}`}
            />
            <div
              className={`absolute bottom-0 left-0 w-full h-1/3 opacity-30 mix-blend-multiply z-10 ${windowColors[(index + 2) % windowColors.length]}`}
            />

            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover z-0 grayscale hover:grayscale-0 transition-all duration-500 object-center"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-0">
                <svg
                  className="w-1/2 h-1/2 text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            )}

            <div className="absolute bottom-2 right-2 bg-black text-techstars-green text-[10px] font-black uppercase px-2 py-1 brutal-border z-20 shadow-[2px_2px_0_#39C463]">
              &gt; MENTOR
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <h3 className="text-2xl font-black uppercase text-black w-full text-left leading-tight mb-1">
              {member.name}
            </h3>
            <h4 className="text-xs font-black uppercase text-gray-400 w-full text-left tracking-widest mb-4 border-b-2 border-black/10 pb-4">
              {member.role}
            </h4>

            {/* Bio */}
            <div className="mt-auto">
              <AnimatePresence mode="wait">
                <motion.p
                  key={isExpanded ? "full" : "truncated"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm text-gray-700 leading-relaxed whitespace-pre-line"
                >
                  {displayBio}
                </motion.p>
              </AnimatePresence>

              {needsTruncation && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-3 bg-black text-techstars-green text-[10px] font-black uppercase px-3 py-1.5 brutal-border cursor-pointer hover:bg-gray-900 transition-colors shadow-[2px_2px_0_#000]"
                >
                  {isExpanded ? "VER MENOS −" : "VER MAIS +"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function StartupWeekendMentorsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#f4f4f0] relative overflow-hidden">
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
          <motion.h2
            variants={cardVariants}
            className="text-6xl md:text-8xl font-black text-black uppercase mb-6 tracking-tighter drop-shadow-[4px_4px_0_#fff]"
          >
            CONHEÇA SEUS <br />
            <span className="italic">MENTORES.</span>
          </motion.h2>

          <motion.div
            variants={cardVariants}
            className="bg-black brutal-border p-4 shadow-[4px_4px_0_#f97316] rotate-[-1deg] max-w-3xl"
          >
            <p className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">
              PROFISSIONAIS E ESPECIALISTAS PRONTOS PARA GUIAR SUA EQUIPE
              DURANTE AS 54 HORAS.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mt-12 pb-16">
            {mentors.map((member, index) => (
              <MentorWindowCard key={member.id} member={member} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
