"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import ApadrinhamentoForm from "@/components/startup-weekend/ApadrinhamentoForm";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";

const steps = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: "1. INSCREVA-SE",
    description: "Preencha o formulário bruto com seus dados reais e envie um vídeo contando por que você merece estar no Startup Weekend.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "2. AVALIAÇÃO",
    description: "Sem letras miúdas. Nossa coordenação vai analisar cada aplicação na unha para selecionar os perfis com maior potencial.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "3. GARANTA SUA VAGA",
    description: "Sendo aprovado, a gente banca 100% da sua participação e você entra de cabeça em 54 horas insanas de trabalho.",
  },
];

export default function ApadrinhamentoPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-yellow-400 selection:text-black">
      <StartupWeekendSEO />
      {/* Nav */}
      <nav className="py-4 px-6 border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/startup-weekend" className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter">
            Startup Weekend
          </Link>
          <Link href="/startup-weekend" className="text-black font-black uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_#9333ea] transition-all">
            &larr; VOLTAR
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 bg-techstars-green border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="bg-black text-yellow-400 text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-black inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
             NÃO TEM DESCULPA
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black uppercase tracking-tighter leading-none mb-6 drop-shadow-[4px_4px_0_#fff]">
            BOLSA <span className="bg-black text-white px-4 skew-x-12 inline-block">100%</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
            Não importa sua condição financeira agora. Importa o que você está disposto a fazer com a oportunidade.<br/>
            <span className="text-blue-600 block mt-2">{"//"} A bolsa é de 100%, mas a dedicação é toda sua.</span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-[#f4f4f0] border-b-4 border-black relative z-0">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0_#9333ea]">
              COMO FUNCIONA
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#000] relative hover:-translate-y-2 hover:-translate-x-2 transition-transform hover:shadow-[12px_12px_0_#000]">
                <div className="w-16 h-16 bg-yellow-400 border-4 border-black flex items-center justify-center mb-6 text-black shadow-[4px_4px_0_#000] transform -translate-y-4 -translate-x-4">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-black text-black uppercase mb-4 tracking-tight border-b-4 border-black pb-2 inline-block w-full">
                  {step.title}
                </h3>
                <p className="text-gray-800 font-bold text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-black relative border-t-8 border-yellow-400">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-12 text-center text-white">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-techstars-green drop-shadow-[4px_4px_0_#fff]">
              FAÇA SUA APLICAÇÃO
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-gray-400 border-b-2 border-dashed border-gray-600 inline-block pb-1">
              O PRAZO ESTÁ CORRENDO.
            </p>
          </div>
          <ApadrinhamentoForm />
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
