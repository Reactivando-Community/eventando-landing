"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendPricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 px-6 bg-black brutal-border-y overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center">
        {/* Title */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-24"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter italic leading-none drop-shadow-[4px_4px_0_#9333ea]">
            A MATEMÁTICA
            <br />
            NÃO MENTE.
          </h2>
        </motion.div>

        {/* Comparison Cards */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-0 w-full max-w-5xl relative min-h-[500px] mb-12">
          {/* Left Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 bg-[#e2e2e2] brutal-border p-6 md:p-8 shrink-0 z-0 relative shadow-[8px_8px_0_#9333ea]"
          >
            <h3 className="text-2xl font-black text-black uppercase tracking-tighter mb-2">
              CAMINHO TRADICIONAL
            </h3>
            <p className="text-gray-500 font-mono text-xs uppercase mb-8 tracking-widest">
              {"// Lento. Burocrático. Caro."}
            </p>
            <div className="space-y-6 relative">
              {/* Stamp */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-15deg] border-4 border-red-500 text-red-500 text-4xl md:text-5xl font-black uppercase px-4 py-2 opacity-50 pointer-events-none whitespace-nowrap z-20 brutal-border">
                MUITO CARO
              </div>

              <div>
                <p className="text-xs font-black text-gray-500 uppercase mb-1">
                  MBA / ESPECIALIZAÇÃO
                </p>
                <div className="w-full bg-gray-300 p-3 brutal-border-sm text-black font-bold">
                  R$ 8.000+
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-gray-500 uppercase mb-1">
                  MENTORIAS E CONSULTORIA
                </p>
                <div className="w-full bg-gray-300 p-3 brutal-border-sm text-black font-bold">
                  R$ 2.000 / MÊS
                </div>
              </div>
              <div>
                <p className="text-xs font-black text-gray-500 uppercase mb-1">
                  CUSTO DE ERRO DE PRODUTO
                </p>
                <div className="w-full bg-gray-300 p-3 brutal-border-sm text-black font-bold">
                  R$ INESTIMÁVEL
                </div>
              </div>
            </div>

            <div className="mt-8 bg-[#2d2d2d] text-center p-6 brutal-border">
              <p className="text-xs text-gray-400 font-black uppercase mb-2 tracking-widest">
                CUSTO DA LENTIDÃO
              </p>
              <div className="text-3xl md:text-4xl font-black text-white">
                R$ 10.000<span className="text-xl">,00+</span>
              </div>
            </div>
          </motion.div>

          {/* VS CIRCLE */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:-ml-20 w-16 h-16 bg-white border-4 border-black rounded-full items-center justify-center z-20 shadow-[4px_4px_0_#9333ea]"
          >
            <span className="font-black text-2xl">VS</span>
          </motion.div>

          {/* Right Smart Way */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-[55%] bg-yellow-400 brutal-border p-6 md:p-8 shrink-0 z-10 lg:-ml-4 shadow-[12px_12px_0_#fff] hover:-translate-y-2 hover:-translate-x-2 transition-transform mt-8 lg:mt-0"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-1 brutal-border shadow-[2px_2px_0_#000]">
                THE SMART WAY
              </div>
              <div className="text-3xl">⚡</div>
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter mb-8 leading-none">
              techstars_ STARTUP WEEKEND
              <br />
              <span className="text-xl tracking-normal">
                {"// 54H DE IMERSÃO TOTAL"}
              </span>
            </h3>

            <div className="space-y-4 relative z-10">
              <div className="w-full bg-white p-3 brutal-border shadow-[4px_4px_0_#000] flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div className="flex flex-col">
                  <span className="font-black text-black uppercase">
                    1º LOTE
                  </span>
                  <span className="text-xs text-red-600 font-bold uppercase shrink-0">
                    Encerra 31/03
                  </span>
                </div>
                <span className="font-black text-black text-xl lg:text-2xl">
                  R$ 270,00
                </span>
              </div>

              <div className="w-full bg-white p-3 brutal-border shadow-[4px_4px_0_#000] flex justify-between items-center opacity-70">
                <div className="flex flex-col">
                  <span className="font-black text-black uppercase">
                    2º LOTE
                  </span>
                  <span className="text-xs text-gray-500 font-bold uppercase shrink-0">
                    Encerra 15/04
                  </span>
                </div>
                <span className="font-black text-black text-xl lg:text-2xl">
                  R$ 300,00
                </span>
              </div>

              <div className="w-full bg-white p-3 brutal-border shadow-[4px_4px_0_#000] flex justify-between items-center opacity-70">
                <div className="flex flex-col">
                  <span className="font-black text-black uppercase">
                    3º LOTE
                  </span>
                  <span className="text-xs text-gray-500 font-bold uppercase shrink-0">
                    Encerra 25/04
                  </span>
                </div>
                <span className="font-black text-black text-xl lg:text-2xl">
                  R$ 330,00
                </span>
              </div>
            </div>

            <div className="mt-8 bg-black text-center p-6 brutal-border relative">
              <div className="absolute top-4 right-4 text-techstars-green">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <p className="text-xs text-techstars-green font-black uppercase mb-1 tracking-widest">
                OFERTA ATUAL
              </p>
              <div className="flex justify-center items-end gap-2 text-white">
                <span className="text-4xl md:text-5xl font-black italic">
                  R$ 270<span className="text-2xl text-gray-300">,00</span>
                </span>
              </div>
            </div>

            <a
              href={eventConfig.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-black text-white px-6 py-5 mt-4 font-black uppercase text-lg md:text-xl text-center border-4 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0_#000] transition-all block"
            >
              GARANTIR INGRESSO &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
