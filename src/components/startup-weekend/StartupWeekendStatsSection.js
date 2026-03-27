"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendStatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-[#f4f4f0] overflow-x-hidden relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-4 bg-black z-20" />
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        {/* Comparison Block (Reference: O MODELO FALIU) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[550px]">
          
          {/* Left Text Base */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-5/12 z-20"
          >
            <div className="bg-pink-500 text-white text-xs font-black uppercase px-3 py-1 brutal-border inline-block mb-6 shadow-[2px_2px_0_#000] rotate-[-2deg]">
              Nua e Crua 💀
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-8 drop-shadow-[4px_4px_0_#fff]">
              PALESTRAS<br/>NÃO CRIAM<br/><span className="italic">STARTUPS.</span>
            </h2>
            
            <div className="border-l-8 border-black pl-6 py-2 bg-white/50 backdrop-blur-sm brutal-border shadow-[4px_4px_0_#000]">
              <p className="font-black text-xl md:text-2xl uppercase leading-relaxed text-black">
                VOCÊ VAI A EVENTOS, OUVE HORAS DE TEORIA E VOLTA PARA CASA SEM NADA. 
                <span className="bg-techstars-green text-black px-2 py-1 mx-2 brutal-border inline-block rotate-2 my-1 shadow-[2px_2px_0_#000]">A INOVAÇÃO EXIGE AÇÃO.</span> 
                CHEGA DE FICAR SÓ NA PLATEIA ANOTANDO DICAS QUE VOCÊ NUNCA APLICA.
              </p>
            </div>
          </motion.div>

          {/* Right Cards Overlapping Base */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-7/12 relative mt-16 md:mt-24 lg:mt-0 flex justify-end h-[550px] lg:h-[600px]"
          >
             {/* Back Card: Evento Tradicional */}
             <div className="absolute top-0 right-8 lg:right-24 w-[90%] md:w-[80%] max-w-sm bg-gray-200 brutal-border p-8 shadow-[6px_6px_0_#000] rotate-[-3deg] z-0">
                <div className="bg-[#bc3c3c] text-white text-[10px] font-black uppercase px-2 py-1 brutal-border inline-block mb-6 shadow-[2px_2px_0_#000]">
                  SYSTEM_ERROR_01
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-gray-400 uppercase tracking-tighter mb-8 leading-none">
                  EVENTO<br/>COMUM
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-gray-500 font-bold uppercase text-sm md:text-base">
                    <div className="w-5 h-5 shrink-0 border-2 border-gray-400 flex items-center justify-center text-[10px]">x</div>
                    <span className="line-through decoration-2 decoration-gray-400">Palestras passivas</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-500 font-bold uppercase text-sm md:text-base">
                    <div className="w-5 h-5 shrink-0 border-2 border-gray-400 flex items-center justify-center text-[10px]">x</div>
                    <span className="line-through decoration-2 decoration-gray-400">Networking forçado</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-500 font-bold uppercase text-sm md:text-base">
                    <div className="w-5 h-5 shrink-0 border-2 border-gray-400 flex items-center justify-center text-[10px]">x</div>
                    <span className="line-through decoration-2 decoration-gray-400">Ideias na gaveta</span>
                  </li>
                  <li className="flex items-center gap-4 text-gray-500 font-bold uppercase text-sm md:text-base">
                    <div className="w-5 h-5 shrink-0 border-2 border-gray-400 flex items-center justify-center text-[10px]">x</div>
                    <span className="line-through decoration-2 decoration-gray-400">Esquecido em 2 dias</span>
                  </li>
                </ul>
             </div>

             {/* Front Neon Card: techstars_ Startup Weekend */}
             <div className="absolute top-14 md:top-24 right-2 lg:right-0 w-[95%] md:w-[85%] max-w-md bg-yellow-400 brutal-border p-6 md:p-8 shadow-[8px_8px_0_#000] rotate-[2deg] z-10 transition-transform hover:-translate-y-2 hover:-translate-x-2">
                
                {/* VS Badge overlapping both */}
                <div className="absolute -left-4 md:-left-8 top-[25%] md:top-[30%] transform -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000] z-20 rotate-[-10deg]">
                  <span className="font-black text-xl md:text-2xl">VS</span>
                </div>

                <div className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-1 brutal-border inline-block mb-6 shadow-[2px_2px_0_#000]">
                  NEW_ERA_2024
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter leading-tight mb-8">
                  STARTUP<br/>WEEKEND
                </h3>
                <ul className="space-y-5 mb-10">
                  <li className="flex items-center gap-4 text-black font-black uppercase text-base md:text-lg">
                    <div className="w-6 h-6 shrink-0 border-4 border-black bg-white flex items-center justify-center text-sm shadow-[2px_2px_0_#000]">✓</div>
                    Mão na massa imediata
                  </li>
                  <li className="flex items-center gap-4 text-black font-black uppercase text-base md:text-lg">
                    <div className="w-6 h-6 shrink-0 border-4 border-black bg-white flex items-center justify-center text-sm shadow-[2px_2px_0_#000]">✓</div>
                    Mentoria de especialistas
                  </li>
                  <li className="flex items-center gap-4 text-black font-black uppercase text-base md:text-lg">
                    <div className="w-6 h-6 shrink-0 border-4 border-black bg-white flex items-center justify-center text-sm shadow-[2px_2px_0_#000]">✓</div>
                    Derruba validações falhas
                  </li>
                  <li className="flex items-center gap-4 text-black font-black uppercase text-base md:text-lg">
                    <div className="w-6 h-6 shrink-0 border-4 border-black bg-white flex items-center justify-center text-sm shadow-[2px_2px_0_#000]">✓</div>
                    Nasce um novo founder
                  </li>
                </ul>

                <a 
                  href={eventConfig.registrationUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center items-center bg-black text-white px-6 py-5 font-black uppercase text-lg text-center border-4 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0_#000] transition-all"
                >
                  DOMINE O JOGO &rarr;
                </a>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
