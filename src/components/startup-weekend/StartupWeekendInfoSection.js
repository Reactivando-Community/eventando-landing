"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const infoCards = [
  {
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    title: "Sexta: Pitch & Forme seu time",
    description:
      "Apresente sua ideia em 60 segundos ou junte-se ao time de alguém. No final da noite, as melhores ideias viram times prontos para o fim de semana.",
    color: "bg-blue-600",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Sábado & Dom: Construa",
    description: "Mentores especializados ajudam sua equipe a validar o problema, criar o MVP e preparar o pitch final.",
    color: "bg-yellow-400",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Conexões reais",
    description: "Conheça desenvolvedores, designers e empreendedores. Networking real, ideias reais.",
    color: "bg-pink-500",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Domingo: Demo e Prêmios",
    description: "Apresente seu pitch para juízes. Os melhores projetos ganham reconhecimento.",
    color: "bg-techstars-green",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
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

export default function StartupWeekendInfoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#f4f4f0] relative overflow-hidden brutal-border-y">
      <div className="absolute inset-0 dot-pattern opacity-50 z-0 bg-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Top Header Block matching the standard */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-24 flex flex-col items-center"
        >
          {/* Small black label like 'O CAMINHO DO PRODUTOR' */}
          <div className="bg-black text-white font-black text-xs px-4 py-2 uppercase brutal-border mb-6 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            A JORNADA DO PARTICIPANTE
          </div>

          <motion.h2
            variants={cardVariants}
            className="text-6xl md:text-8xl font-black text-black uppercase mb-6 tracking-tight drop-shadow-[4px_4px_0px_#fff]"
          >
            O QUE ESPERAR.
          </motion.h2>

          {/* Yellow subtitle block */}
          <motion.div
            variants={cardVariants}
            className="bg-yellow-400 brutal-border p-4 shadow-[4px_4px_0_#000] rotate-[-1deg] max-w-4xl"
          >
            <p className="text-xl md:text-3xl font-black uppercase text-black">
              EXPERIENCIE A VIDA DE STARTUP EM 54 HORAS. Valide sua ideia e crie conexões.
            </p>
          </motion.div>
        </motion.div>

        {/* Timeline Grid */}
        <div className="relative max-w-5xl mx-auto py-10">
          {/* Vertical Spine */}
          <div className="absolute left-[5%] md:left-1/2 top-0 bottom-0 w-2 bg-black transform -translate-x-1/2" />

          {infoCards.map((card, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`relative flex items-center justify-between mb-24 w-full flex-row ${
                  isLeft ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Empty side desktop */}
                <div className="hidden md:block w-5/12" />

                {/* Central Diamond Node */}
                <div className="absolute left-[5%] md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white border-4 border-black rotate-45 flex items-center justify-center shadow-[2px_2px_0_#000] z-20">
                    <div className={`w-3 h-3 ${card.color}`} />
                  </div>
                </div>

                {/* The Card */}
                <div className="w-[85%] md:w-5/12 pl-6 md:pl-0">
                  <div className="relative bg-white brutal-border brutal-shadow-sm p-8 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0px_#000] transition-all group">
                    
                    {/* Badge inside top right */}
                    <div className={`absolute top-4 right-4 text-white text-[10px] font-black uppercase px-2 py-1 border-2 border-black ${card.color}`}>
                      ETAPA_0{index + 1}
                    </div>

                    {/* Icon floating block */}
                    <div className={`w-14 h-14 ${card.color} border-4 border-black mb-6 flex items-center justify-center transform -rotate-3 group-hover:rotate-0 transition-transform shadow-[4px_4px_0_#000]`}>
                      <div className="text-white">
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-black italic uppercase text-black mb-4">
                      {card.title}.
                    </h3>
                    <p className="font-bold text-black uppercase text-sm md:text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
