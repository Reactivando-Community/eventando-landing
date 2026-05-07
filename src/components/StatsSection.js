"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    number: "250+",
    label: "Participantes",
    description: "Esperados para esta edição",
  },
  {
    number: "15+",
    label: "Comunidades",
    description: "Participando do evento",
  },
  {
    number: "12ª",
    label: "Edição",
    description: "Crescendo a cada ano",
  },
  {
    number: "24",
    label: "Horas",
    description: "De conteúdo e networking",
  },
];

const testimonials = [
  {
    quote: (
      <>
        O techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span> mudou minha perspectiva sobre networking e aprendizado.
      </>
    ),
    author: "Ana Silva",
    role: "Desenvolvedora Frontend",
  },
  {
    quote:
      "Uma experiência incrível que conecta pessoas e conhecimento de forma única.",
    author: "Carlos Santos",
    role: "Tech Lead",
  },
  {
    quote: "O melhor evento de comunidade que já participei. Super recomendo!",
    author: "Mariana Costa",
    role: "Product Manager",
  },
];

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 noise-texture opacity-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Stats Grid */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  duration: 0.5,
                  type: "spring",
                }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-xl font-semibold text-primary-300 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-400 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>


        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-effect-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Faça parte de uma das comunidades parceiras
            </h3>
            <p className="text-gray-300 mb-6">
              Descubra e participe das comunidades de tecnologia da sua região
            </p>
            <a
              href="https://chat.whatsapp.com/KfVUo2fMste0WpJH0Gtdw0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-lg rounded-full shadow-2xl shadow-primary-500/25 transition-all duration-300 transform hover:scale-105"
            >
              Ver comunidades
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
