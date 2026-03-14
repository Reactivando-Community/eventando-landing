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

const membersById = Object.fromEntries(teamMembers.map((m) => [m.id, m]));

const rows = [
  [membersById[7]], // Vinícius
  [membersById[1], membersById[4], membersById[5]], // Pedro, Raphaela, Alexandra
  [membersById[2], membersById[3], membersById[6]], // Fábio, Roberto, Lucas
];

const photoPositionOverrides = {
  4: "object-top", // Raphaela
  5: "object-[center_10%]", // Alexandra – higher crop
};

function TeamCard({ member }) {
  const photoClass = photoPositionOverrides[member.id] || "";

  return (
    <motion.div
      key={member.id}
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="group relative flex flex-col items-center p-8 bg-white dark:bg-zinc-900 rounded-3xl transition-all duration-300 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl"
    >
      <div className="relative w-32 h-32 mb-6">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className={`rounded-full object-cover ${photoClass}`}
          sizes="128px"
        />
      </div>
      <h3 className="text-xl font-bold text-black dark:text-white mb-1 text-center">
        {member.name}
      </h3>
      <p className="text-sm font-semibold text-techstars-green mb-4 text-center">
        {member.role}
      </p>
      <p className="text-gray-600 dark:text-techstars-slate text-sm leading-relaxed text-center">
        {member.bio}
      </p>
    </motion.div>
  );
}

export default function StartupWeekendTeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2
            variants={cardVariants}
            className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight"
          >
            Quem são os organizadores?
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-600 dark:text-techstars-slate max-w-3xl mx-auto"
          >
            Conheça o time organizador do Techstars Startup Weekend Anápolis
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col gap-8"
        >
          {/* Row 1: Vinícius centered */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/3 lg:w-1/3 px-0">
              <TeamCard member={rows[0][0]} />
            </div>
          </div>

          {/* Row 2: Pedro, Raphaela, Alexandra */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rows[1].map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>

          {/* Row 3: Fábio, Roberto, Lucas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rows[2].map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
