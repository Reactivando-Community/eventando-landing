"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const difficultQuestions = [
  {
    question: "ESTE EVENTO É MESMO PARA MIM?",
    answer: "Se você se interessa por inovação e por criar soluções reais, sim. Recebemos desde estudantes até empreendedores em série de diversas áreas. O que importa é a vontade de criar."
  },
  {
    question: "PRECISO LEVAR UM TIME FORMADO?",
    answer: "Não! Todos chegam sem time e nós coordenamos a formação ali mesmo na sexta-feira. Interagir e formar grupos com pessoas que você nunca viu faz parte da mágica da metodologia."
  },
  {
    question: "PRECISO TER UMA IDEIA PRONTA?",
    answer: "Zero necessidade. Você pode apresentar uma ideia se quiser (e incentivos que sim!), mas também pode perfeitamente entrar no time de outra pessoa que teve uma proposta que você curtiu."
  },
  {
    question: "TENHO QUE PARTICIPAR DOS 3 DIAS?",
    answer: "Sim. A metodologia exige imersão total. Seu time precisará de você na validação e construção do projeto. Só participe se puder estar presente o final de semana inteiro."
  }
];

export default function BrutalistFaq() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-[#f4f4f0] brutal-border-y relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Header Block */}
        <div className="mb-16 w-full">
          <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter italic mb-4 drop-shadow-[4px_4px_0_#fff]">
            PERGUNTAS <br /> DIFÍCEIS.
          </h2>
          <div className="bg-black text-white text-xs md:text-sm font-black uppercase tracking-widest px-4 py-2 brutal-border inline-block shadow-[4px_4px_0_#000]">
            SEM LETRAS MIÚDAS. O JOGO É LIMPO.
          </div>
        </div>

        {/* 4 Questions Accordion */}
        <div className="w-full mb-12 flex flex-col gap-4 md:gap-6">
          {difficultQuestions.map((q, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`w-full ${isOpen ? 'bg-yellow-400' : 'bg-white'} brutal-border shadow-[6px_6px_0_#000] cursor-pointer hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#000] transition-colors`}
                onClick={() => toggle(idx)}
              >
                <div className="flex items-center justify-between p-4 md:p-6">
                  <span className="font-black text-black uppercase text-sm md:text-lg tracking-tight pr-4">
                    {q.question}
                  </span>
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-l-4 border-black pl-4 md:pl-6 text-2xl md:text-3xl font-black text-black">
                    {isOpen ? "−" : "+"}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t-4 border-black"
                    >
                      <div className="p-4 md:p-6 text-black font-black uppercase text-sm md:text-base leading-relaxed tracking-wide">
                        {q.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA Button */}
        <Link 
          href="/startup-weekend/faq" 
          className="bg-black text-yellow-400 border-4 border-black shadow-[6px_6px_0_#000] px-8 py-5 text-lg md:text-xl font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-black hover:shadow-[8px_8px_0_#000] hover:-translate-y-1 transition-all"
        >
          AINDA TEM DÚVIDA? &rarr;
        </Link>
      </div>
    </section>
  );
}
