"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import ApadrinhamentoForm from "@/components/startup-weekend/ApadrinhamentoForm";

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "Inscreva-se",
    description: "Preencha o formulário com seus dados e envie um vídeo curto contando por que você quer participar.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Avaliação",
    description: "Nossa equipe irá avaliar as inscrições e selecionar os candidatos que mais se encaixam no programa.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Participe!",
    description: "Se selecionado, você receberá um ingresso gratuito para o Startup Weekend, totalmente patrocinado.",
  },
];

export default function ApadrinhamentoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans">
      {/* Nav */}
      <nav className="py-6 px-6 border-b border-gray-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/startup-weekend"
            className="text-xl font-black text-black dark:text-white"
          >
            Startup Weekend Anápolis
          </Link>
          <Link
            href="/startup-weekend"
            className="text-techstars-green hover:underline font-bold"
          >
            &larr; Voltar
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 overflow-hidden bg-white dark:bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-techstars-green/5 to-transparent dark:from-techstars-green/10" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tight leading-tight max-w-5xl mx-auto">
              Programa de{" "}
              <span className="text-techstars-green">Bolsa 100%</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-techstars-slate max-w-3xl mx-auto leading-relaxed">
              Não importa de onde você vem. Importa o que você tá disposto a fazer.
              A bolsa é 100%, mas o esforço é seu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Como funciona
            </h2>
            <p className="text-xl text-techstars-slate max-w-2xl mx-auto">
              O processo é simples e transparente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center"
              >
                <div className="w-16 h-16 bg-techstars-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-techstars-green">
                  {step.icon}
                </div>
                <div className="text-techstars-green font-bold text-sm mb-2">
                  Passo {index + 1}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-techstars-slate leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ApadrinhamentoForm />
          </motion.div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
