"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const profiles = [
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
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Negócios (Business)",
    description:
      "Focado na estratégia. Pesquisa o mercado, valida o problema com clientes, estrutura o modelo de negócio (como fazer dinheiro) e prepara o Pitch para os jurados.",
    idealFor:
      "Profissionais e estudantes de gestão, marketing, vendas, comunicação, direito ou curiosos com espírito empreendedor.",
    color: "from-blue-500 to-blue-600",
  },
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
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
    title: "Design",
    description:
      "Focado na experiência e estética. Cria a identidade visual da startup, desenha as interfaces (UI/UX) do produto e garante uma apresentação clara e cativante.",
    idealFor:
      "Designers gráficos, UX/UI, criativos, arquitetos e profissionais focados na jornada do cliente.",
    color: "from-pink-500 to-rose-600",
  },
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
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
    title: "Tecnologia (Tech)",
    description:
      "Construtores da solução. Avaliam a viabilidade técnica e desenvolvem o Produto Mínimo Viável (MVP) através de código, plataformas No-Code ou protótipos interativos.",
    idealFor:
      "Engenheiros de software, programadores, analistas de sistemas, estudantes de TI ou entusiastas de ferramentas digitais.",
    color: "from-techstars-green to-techstars-green",
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
            Qual será o seu papel? <br />
            <span className="text-techstars-green">Os 3 Perfis do Evento</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-xl text-gray-600 dark:text-techstars-slate max-w-3xl mx-auto"
          >
            Você se junta a uma equipe com base nas suas habilidades e paixões.
            Juntos, vocês complementarão um ao outro para criar algo
            extraordinário.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {profiles.map((profile, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative h-full flex flex-col p-8 bg-white dark:bg-zinc-900 rounded-3xl transition-all duration-300 border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-xl"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-techstars-green rounded-2xl mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <div className="text-techstars-green dark:text-black">
                    {profile.icon}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                  {profile.title}
                </h3>

                <div className="mb-6">
                  <h4 className="text-sm font-bold text-techstars-green uppercase tracking-wider mb-2">
                    O que faz
                  </h4>
                  <p className="text-gray-600 dark:text-techstars-slate leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <h4 className="text-sm font-bold text-techstars-green uppercase tracking-wider mb-2">
                    Ideal para
                  </h4>
                  <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                    {profile.idealFor}
                  </p>
                </div>
              </div>

              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                <div className="w-24 h-24 blur-3xl bg-techstars-green rounded-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
