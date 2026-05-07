"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const profiles = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Negócios (Business)",
    description: "Focado na estratégia. Pesquisa o mercado, valida o problema com clientes, estrutura o modelo de negócio (como fazer dinheiro) e prepara o Pitch para os jurados.",
    idealFor: "Profissionais e estudantes de gestão, marketing, vendas, ou curiosos empreendedores.",
    color: "bg-blue-600 text-white", // In reference it's purple/blue
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Design",
    description: "Focado na experiência e estética. Cria a identidade visual da startup, desenha as interfaces (UI/UX) do produto e garante uma apresentação clara e cativante.",
    idealFor: "Designers gráficos, UX/UI, arquitetos e profissionais focados no cliente.",
    color: "bg-blue-600 text-white", // In reference it's purple/blue
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Tecnologia (Tech)",
    description: "Construtores da solução. Avaliam a viabilidade técnica e desenvolvem o Produto Mínimo Viável (MVP) através de código, Nocode ou protótipos interativos.",
    idealFor: "Engenheiros, programadores, estudantes e entusiastas de ferramentas digitais.",
    color: "bg-blue-600 text-white", // In reference it's purple/blue
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

export default function StartupWeekendProfilesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 bg-[#f4f4f0] relative overflow-hidden brutal-border-b">
      {/* Target style dots */}
      <div className="absolute inset-0 dot-pattern opacity-60 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Container */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-start justify-between mb-24 gap-12"
        >
          <div className="flex-1 space-y-8">
            <motion.h2 variants={cardVariants} className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85]">
              Nós somos <br />
              <span className="bg-black text-white px-4 py-2 inline-block drop-shadow-[8px_8px_0px_#9333ea] mt-2 mb-2 lg:mb-0">
                O EVENTO.
              </span>
            </motion.h2>

            <motion.div variants={cardVariants} className="flex items-stretch gap-6">
              <div className="w-2 bg-black shrink-0" />
              <p className="text-xl md:text-2xl font-black uppercase text-black max-w-lg leading-snug">
                Qual será o seu papel? Junte-se com base nas suas habilidades. Criem algo extraordinário juntos.
              </p>
            </motion.div>
          </div>

          <motion.div variants={cardVariants} className="hidden lg:flex flex-1 justify-center relative">
            {/* Purple Floating Star Badge */}
            <div className="absolute brutal-border bg-blue-600 flex flex-col items-center justify-center p-6 w-52 h-52 rotate-[-20deg] shadow-[8px_8px_0_#9333ea] hover:rotate-[-10deg] transition-all duration-300 z-20 top-[-20px] left-20">
              <span className="text-white text-5xl mb-2">⭐</span>
              <span className="text-white font-black uppercase text-center text-xl leading-tight">
                100%<br />
                Prático
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Cards Row - Connected horizontally */}
        <div className="relative w-full py-8 mt-12 lg:mt-0">
          {/* Horizontal connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-black hidden lg:block border-y border-black transform -translate-y-1/2 opacity-100 z-0" />
          
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 relative z-10"
          >
            {profiles.map((profile, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative h-full flex flex-col bg-white brutal-border p-8 lg:p-10 shadow-[8px_8px_0_#000] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0px_#000] transition-all"
              >
                {/* Floating Icon inside card */}
                <div className={`w-16 h-16 brutal-border shadow-[4px_4px_0_#9333ea] flex items-center justify-center transform -rotate-6 group-hover:rotate-0 transition-transform mb-8 ${profile.color}`}>
                  {profile.icon}
                </div>

                <h3 className="text-2xl lg:text-3xl font-black uppercase text-black mb-4 tracking-tight">
                  {profile.title}
                </h3>

                <p className="font-black text-black/80 text-sm md:text-base leading-relaxed mb-12">
                  {profile.description}
                </p>

                {/* Bottom right numbering badge */}
                <div className="absolute -bottom-4 right-8 bg-black text-yellow-400 font-black text-xl px-4 py-1 brutal-border shadow-[4px_4px_0_#000]">
                  0{index + 1}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
