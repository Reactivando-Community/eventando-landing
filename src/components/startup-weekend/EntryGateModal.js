"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { logEvent } from "@/lib/firebase";

const gatePhrases = [
  {
    id: "gate_B",
    headline: "⚠️ ATENÇÃO",
    question:
      "Este site contém oportunidades reais. Apenas para quem tem coragem de sair da zona de conforto.",
    accept: "Eu tenho coragem. Deixa eu entrar.",
    decline: "Não tenho coragem. Pode fechar.",
  },
  {
    id: "gate_D",
    headline: "⚠️ ACESSO RESTRITO",
    question:
      "Este site não é para qualquer pessoa. É apenas para quem está disposto a provar que merece uma oportunidade.",
    accept: "Eu mereço. Quero ver.",
    decline: "Melhor não. Não é pra mim.",
  },
  {
    id: "gate_E",
    headline: "⚠️ AVISO",
    question:
      "Ao entrar, você não poderá mais dizer que nunca teve uma oportunidade. Tem certeza que quer continuar?",
    accept: "Tenho certeza. Me mostra.",
    decline: "Prefiro continuar reclamando.",
  },
];

export default function EntryGateModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phrase, setPhrase] = useState(null);

  useEffect(() => {
    // Skip if already passed or if coming from a bolsa deep-link
    const params = new URLSearchParams(window.location.search);
    if (sessionStorage.getItem("sw_gate_passed") || params.get("bolsa") === "true") {
      return;
    }
    const p = gatePhrases[Math.floor(Math.random() * gatePhrases.length)];
    setPhrase(p);
    setIsOpen(true);
    logEvent("entry_gate_view", { variant_id: p.id });
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("sw_gate_passed", "true");
    logEvent("entry_gate_accepted", { variant_id: phrase.id });
    setIsOpen(false);
  };

  const handleDecline = () => {
    logEvent("entry_gate_declined", { variant_id: phrase.id });
    window.location.href = "https://www.google.com";
  };

  if (!phrase) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        >
          {/* Backdrop - fully opaque black */}
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md text-center"
          >
            {/* Warning stripes top */}
            <div className="w-full h-2 bg-[repeating-linear-gradient(90deg,#f59e0b_0px,#f59e0b_20px,#000_20px,#000_40px)] rounded-t-2xl" />

            <div className="bg-zinc-950 border border-yellow-500/20 rounded-b-2xl p-8 md:p-10 shadow-2xl shadow-yellow-500/5">
              {/* Warning icon */}
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-4xl">⚠️</span>
                </div>
              </div>

              {/* Headline */}
              <h2 className="text-yellow-500 font-black text-lg tracking-[0.2em] uppercase mb-6">
                {phrase.headline}
              </h2>

              {/* Question */}
              <p className="text-white text-xl md:text-2xl font-bold leading-snug mb-10 tracking-tight">
                {phrase.question}
              </p>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAccept}
                  className="w-full px-6 py-4 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-base rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-techstars-green/20"
                >
                  {phrase.accept}
                </button>
                <button
                  onClick={handleDecline}
                  className="w-full px-6 py-3 bg-transparent border border-white/10 text-zinc-600 hover:text-zinc-400 font-medium text-sm rounded-xl transition-all duration-300 hover:border-white/20"
                >
                  {phrase.decline}
                </button>
              </div>
            </div>

            {/* Warning stripes bottom */}
            <div className="w-full h-2 bg-[repeating-linear-gradient(90deg,#f59e0b_0px,#f59e0b_20px,#000_20px,#000_40px)] rounded-b-2xl mt-[-1px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
