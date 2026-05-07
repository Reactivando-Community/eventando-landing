"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { eventConfig } from "@/data/startup-weekend-event";

// ==========================================
// CONFIGURAÇÃO DE LOTES — EDITE APENAS AQUI
// ==========================================
const LOTES = [
  {
    label: "1º LOTE",
    price: "R$ 270,00",
    priceNumber: 270,
    endDate: new Date("2026-04-01T23:59:59-03:00"),
    soldOut: true, // Override manual: forçar como esgotado
  },
  {
    label: "2º LOTE",
    price: "R$ 300,00",
    priceNumber: 300,
    endDate: new Date("2026-04-15T23:59:59-03:00"),
    soldOut: false,
  },
  {
    label: "3º LOTE",
    price: "R$ 330,00",
    priceNumber: 330,
    endDate: new Date("2026-04-25T23:59:59-03:00"),
    soldOut: false,
  },
];

function getLotStatus(lote, index, now) {
  if (lote.soldOut) return "esgotado";
  if (now > lote.endDate) return "esgotado";
  const previousActive = LOTES.slice(0, index).some(
    (prev) => !prev.soldOut && now <= prev.endDate
  );
  if (previousActive) return "proximo";
  return "ativo";
}

function formatEndDate(date) {
  return `${String(date.getDate()).padStart(2, "0")}/${String(
    date.getMonth() + 1
  ).padStart(2, "0")}`;
}

export default function StartupWeekendPricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { lotStatuses, activeLot } = useMemo(() => {
    const now = new Date();
    const statuses = LOTES.map((lote, i) => getLotStatus(lote, i, now));
    const activeIdx = statuses.indexOf("ativo");
    return {
      lotStatuses: statuses,
      activeLot: activeIdx >= 0 ? LOTES[activeIdx] : LOTES[LOTES.length - 1],
    };
  }, []);

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

            <h3 className="text-3xl md:text-4xl font-bold text-black tracking-[-0.04em] mb-8 leading-[1.05] font-sans text-left">
              <span className="lowercase">techstars_</span><br />
              <span className="whitespace-nowrap">Startup Weekend</span><br />
              <span className="text-[#0EA5E9]">Anápolis</span>
              <br />
              <span className="text-xl tracking-normal uppercase text-black">
                {"// 54H DE IMERSÃO TOTAL"}
              </span>
            </h3>

            <div className="space-y-4 relative z-10">
              {LOTES.map((lote, i) => {
                const status = lotStatuses[i];

                if (status === "esgotado") {
                  return (
                    <div
                      key={i}
                      className="w-full bg-gray-200 p-3 brutal-border shadow-[4px_4px_0_#000] flex justify-between items-center opacity-50 relative overflow-hidden"
                    >
                      <div className="flex flex-col">
                        <span className="font-black text-gray-500 uppercase line-through">
                          {lote.label}
                        </span>
                        <span className="text-xs text-gray-400 font-bold uppercase shrink-0">
                          Encerrado
                        </span>
                      </div>
                      <span className="font-black text-gray-400 text-xl lg:text-2xl line-through">
                        {lote.price}
                      </span>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-12deg] border-3 border-red-500 text-red-500 text-sm font-black uppercase px-3 py-0.5">
                        ESGOTADO
                      </div>
                    </div>
                  );
                }

                if (status === "ativo") {
                  return (
                    <div
                      key={i}
                      className="w-full bg-white p-3 brutal-border shadow-[6px_6px_0_#39C463] flex justify-between items-center ring-2 ring-techstars-green"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-black uppercase">
                            {lote.label}
                          </span>
                          <span className="bg-techstars-green text-black text-[9px] font-black uppercase px-2 py-0.5 border border-black">
                            ATIVO
                          </span>
                        </div>
                        <span className="text-xs text-red-600 font-bold uppercase shrink-0">
                          Encerra {formatEndDate(lote.endDate)}
                        </span>
                      </div>
                      <span className="font-black text-black text-xl lg:text-2xl">
                        {lote.price}
                      </span>
                    </div>
                  );
                }

                // proximo
                return (
                  <div
                    key={i}
                    className="w-full bg-white p-3 brutal-border shadow-[4px_4px_0_#000] flex justify-between items-center opacity-50"
                  >
                    <div className="flex flex-col">
                      <span className="font-black text-black uppercase">
                        {lote.label}
                      </span>
                      <span className="text-xs text-gray-500 font-bold uppercase shrink-0">
                        Encerra {formatEndDate(lote.endDate)}
                      </span>
                    </div>
                    <span className="font-black text-black text-xl lg:text-2xl">
                      {lote.price}
                    </span>
                  </div>
                );
              })}
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
                OFERTA ATUAL — {activeLot.label}
              </p>
              <div className="flex justify-center items-end gap-2 text-white">
                <span className="text-4xl md:text-5xl font-black italic">
                  R$ {activeLot.priceNumber}
                  <span className="text-2xl text-gray-300">,00</span>
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
            <p className="mt-3 text-[10px] font-bold text-black text-center leading-relaxed opacity-70">
              Ao comprar, você concorda com os{" "}
              <a
                href="https://www.techstars.com/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100"
              >
                Termos de Uso
              </a>{" "}
              e{" "}
              <a
                href="https://www.techstars.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100"
              >
                Política de Privacidade
              </a>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
