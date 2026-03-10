"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-black relative overflow-hidden">
      <div className="absolute inset-0 noise-texture opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-techstars-green/5 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {eventConfig.stats.map((stat, index) => (
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
              <div className="text-xl font-bold text-techstars-green mb-1">
                {stat.label}
              </div>
              <div className="text-techstars-slate text-sm opacity-80">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 max-w-3xl mx-auto shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
              Pronto para viver a experiência?
            </h3>
            <p className="text-techstars-slate text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              <strong>O Startup Weekend é para todos!</strong>
              <br />
              <br />
              Este é o ambiente perfeito para{" "}
              <strong>criar novas ideias do zero</strong> e explorar um espaço
              de <strong>inovação na prática</strong>. O evento é{" "}
              <strong>100% inclusivo</strong> e aberto a pessoas de{" "}
              <strong>todas as idades</strong> (a partir dos 18 anos) e de{" "}
              <strong>qualquer área profissional</strong>. Não precisa ter
              equipe formada nem uma ideia genial para participar – basta trazer
              sua energia.
              <br />
              <br />
              Durante as 54 horas, você terá{" "}
              <strong>acesso exclusivo a mentores</strong> que são profissionais
              de destaque no mercado. Eles estarão lado a lado com a sua equipe
              para <strong>validar o projeto</strong> e guiar a construção da
              sua solução, desde o rascunho até o <strong>pitch final</strong>.
            </p>
            <a
              href={eventConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-10 py-5 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-xl rounded-lg shadow-lg shadow-techstars-green/20 transition-all duration-300 transform hover:scale-105"
            >
              Fazer minha inscrição
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
