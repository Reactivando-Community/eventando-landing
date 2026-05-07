"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import { eventConfig } from "@/data/startup-weekend-event";

const scheduleData = [
  {
    dayName: "Sexta-feira",
    date: "1 de Maio",
    emoji: "🎤",
    accessLimit: "Acesso ao local até 23:30",
    accessNote: "Você pode ficar enquanto o local permitir",
    activities: [
      { time: "18:00", title: "Credenciamento", details: "Chegar no local e fazer o credenciamento" },
      { time: "18:30", title: "Coffee e networking", details: "Comer, compartilhar ideias, praticar o pitch e interagir com os outros participantes" },
      { time: "19:00", title: "Boas-Vindas", details: "Revisar a agenda para o final de semana e saber quem são os palestrantes e líderes de comunidade" },
      { time: "19:20", title: "Palestrante", details: "Ouça um empreendedor experiente e visionário" },
      { time: "20:00", title: "Quebra-gelo", details: "Quebra-gelo divertido para se preparar para os pitches" },
      { time: "20:20", title: "Pitches", details: "O facilitador dá um passo a passo do processo de pitches e, em seguida, os pitches começam!" },
      { time: "21:45", title: "Votação", details: "Os participantes votam nas ideias que desejam trabalhar durante o fim de semana" },
      { time: "22:00", title: "Formação de times", details: "Todos aqueles cujas ideias foram escolhidas farão uma rápida recapitulação de sua ideia e todos os participantes selecionarão suas equipes" },
      { time: "22:30", title: "Início dos trabalhos", details: "As equipes encontram um espaço para o trabalho do fim de semana, se conhecem e fazem um levantamento das habilidades" },
    ],
  },
  {
    dayName: "Sábado",
    date: "2 de Maio",
    emoji: "🛠️",
    accessLimit: "Acesso ao local das 8:00 até 22:00",
    accessNote: "Você pode chegar e ficar enquanto o local permitir",
    activities: [
      { time: "08:45", title: "Café da manhã", details: "Chegue ao local e tome um café da manhã" },
      { time: "09:30", title: "Anúncios matinais", details: "Revisão da agenda do dia, foco das equipes e o processo de mentoria da tarde" },
      { time: "10:00", title: "Ao trabalho", details: "As equipes organizam seus espaços e começam a trabalhar" },
      { time: "12:00", title: "Almoço", details: "Pausa para almoço" },
      { time: "13:00", title: "Check-ins", details: "Check-ins pós-almoço, relatórios de status e pedidos de ajuda" },
      { time: "14:00", title: "Mentorias", details: "Reuniões individuais com mentores e equipes para orientação e ajuda" },
      { time: "18:30", title: "Jantar", details: "Pausa para jantar" },
      { time: "19:30", title: "Check-ins", details: "Check-ins pós-jantar, relatórios de status e pedidos de ajuda" },
      { time: "21:00", title: "Avisos de encerramento", details: "Reagrupar e encerrar o dia" },
    ],
  },
  {
    dayName: "Domingo",
    date: "3 de Maio",
    emoji: "🏆",
    accessLimit: "Acesso ao local das 8:00 até 22:00",
    accessNote: "Você pode chegar e ficar enquanto o local permitir",
    activities: [
      { time: "09:00", title: "Café da manhã", details: "Chegue ao local e tome um café da manhã simples" },
      { time: "09:30", title: "Anúncios matinais", details: "Revisão da agenda do dia, foco das equipes, critérios de avaliação e o processo de tech check e pitches" },
      { time: "10:00", title: "Ao trabalho", details: "As equipes trabalham para finalizar seu MVP e começam a montar suas apresentações" },
      { time: "12:00", title: "Almoço", details: "Pausa para almoço" },
      { time: "13:00", title: "Check-ins", details: "Check-ins pós-almoço, relatórios de status e pedidos de ajuda" },
      { time: "14:00", title: "Pré-pitches", details: "Cada equipe terá a chance de fazer tech checks e praticar suas apresentações" },
      { time: "15:00", title: "Coffee-break", details: "Um lanche leve antes dos pitches" },
      { time: "15:30", title: "Início do Encerramento", details: "Preparação para os pitches finais" },
      { time: "18:00", title: "Pitches finais", details: "Cada equipe tem cinco minutos para apresentar seu negócio, seguido de cinco minutos de perguntas dos jurados" },
      { time: "19:30", title: "Deliberação do júri", details: "Tempo para networking enquanto os jurados decidem os vencedores" },
      { time: "19:50", title: "Equipes vencedoras", details: "As equipes vencedoras são anunciadas e premiadas" },
      { time: "20:15", title: "Encerramento", details: "Encerramento oficial do evento" },
      { time: "20:30", title: "Comemorações & Networking", details: "Comemorações e networking antes de todos irem para casa" },
      { time: "22:00", title: "Todos vão para casa", details: "Fim do evento" },
    ],
  },
];

export default function StartupWeekendAgendaPage() {
  const [activeDay, setActiveDay] = useState(0);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 500) {
      setShowFloatingNav(true);
    } else {
      setShowFloatingNav(false);
    }
  });

  const currentDay = scheduleData[activeDay];

  return (
    <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-techstars-green selection:text-black relative overflow-x-hidden">
      <StartupWeekendSEO />

      {/* Nav */}
      <nav className="py-4 px-4 sm:px-6 border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-3">
          <Link href="/startup-weekend" className="text-lg sm:text-xl md:text-2xl font-black text-black tracking-tighter hover:text-techstars-green transition-colors text-center">
            techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span>
          </Link>
          <Link href="/startup-weekend" className="text-black font-black uppercase hover:bg-black hover:text-white px-3 py-1 sm:px-4 sm:py-2 border-4 border-black shadow-[4px_4px_0_#39C463] transition-all text-xs sm:text-sm md:text-base whitespace-nowrap">
            &larr; VOLTAR
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 bg-yellow-400 border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="bg-black text-white text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-black inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
             54H DE IMERSÃO
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-[4px_4px_0_#fff]">
            AGENDA DO <br/>
            <span className="bg-black text-yellow-400 px-4 inline-block transform rotate-1 mt-2">EVENTO</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform -rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
            3 dias intensos de imersão empreendedora.<br/>
            <span className="text-blue-600 block mt-2">{"//"} techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span> — {eventConfig.dateFull}</span>
          </p>
        </div>
      </section>

      {/* Day Tabs */}
      <section className="py-16 px-6 bg-black border-b-4 border-black relative z-0">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {scheduleData.map((day, index) => {
              const isActive = activeDay === index;
              return (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`relative p-6 border-4 border-black text-left transition-transform transform uppercase tracking-tighter hover:-translate-y-1 hover:-translate-x-1 ${
                    isActive
                      ? "bg-techstars-green shadow-[8px_8px_0_#fff] scale-105 z-10"
                      : "bg-white shadow-[6px_6px_0_#39C463]"
                  }`}
                >
                  <span className="text-4xl mb-3 block drop-shadow-[2px_2px_0_#000]">{day.emoji}</span>
                  <div className="text-2xl font-black text-black">{day.dayName}</div>
                  <div className={`text-sm mt-1 font-bold ${isActive ? "text-black" : "text-gray-600"}`}>
                    {day.date}
                  </div>
                  {isActive && (
                    <div className="absolute top-4 right-4 bg-black text-white text-[10px] px-2 py-1 font-black shadow-[2px_2px_0_#fff] rotate-[-5deg]">
                       SELECIONADO
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section id="timeline-section" className="py-24 px-6 bg-[#f4f4f0] border-b-4 border-black">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Day header */}
              <div className="text-center mb-16 inline-block w-full">
                <div className="bg-black text-white border-4 border-black shadow-[8px_8px_0_#39C463] px-8 py-4 inline-block transform rotate-[-1deg]">
                   <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter drop-shadow-[2px_2px_0_#39C463]">
                     {currentDay.emoji} {currentDay.dayName}
                   </h2>
                   <p className="text-techstars-green text-xl font-bold mt-2">
                     {currentDay.date} de 2026
                   </p>
                </div>
              </div>

              {/* Timeline items */}
              <div className="relative">
                {/* Vertical line dotted */}
                <div className="absolute left-[36px] md:left-[118px] top-4 bottom-0 w-0 border-l-4 border-black border-dashed" />

                {currentDay.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative flex flex-col md:flex-row md:gap-10 mb-10 md:mb-10 last:mb-0 group hover:z-10"
                  >
                    <div className="flex md:contents w-full">
                      {/* Time */}
                      <div className="w-16 sm:w-20 md:w-28 shrink-0 pt-2 text-right">
                         <span className="bg-black text-techstars-green font-black text-sm sm:text-lg md:text-xl px-1 sm:px-3 py-1 border-4 border-black inline-block transform rotate-[-2deg] shadow-[3px_3px_0_#000] md:shadow-[4px_4px_0_#000] group-hover:rotate-0 transition-transform">
                           {activity.time}
                         </span>
                      </div>

                      {/* Dot */}
                      <div className="relative shrink-0 pt-3 z-10">
                        <div className="w-6 h-6 rounded-full bg-yellow-400 border-4 border-black shadow-[2px_2px_0_#000] ml-[24px] sm:ml-[10px] md:ml-[1px]" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="flex-1 min-w-0 bg-white border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0_#000] transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[10px_10px_0_#000] mt-3 md:mt-0 ml-[36px] sm:ml-[44px] md:ml-0 z-10 relative">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-black text-black uppercase tracking-tight mb-2 break-words">
                        {activity.title}
                      </h3>
                      <p className="text-black font-bold text-sm sm:text-base leading-relaxed break-words">
                        {activity.details}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Venue access limit */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: currentDay.activities.length * 0.05 }}
                className="mt-16 bg-blue-600 border-4 border-black p-8 flex flex-col md:flex-row items-center md:items-start gap-6 shadow-[8px_8px_0_#000] transform rotate-1"
              >
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shrink-0 shadow-[4px_4px_0_#000] rotate-[-5deg]">
                  <span className="text-3xl">⏰</span>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-white text-2xl font-black uppercase drop-shadow-[2px_2px_0_#000]">{currentDay.accessLimit}</p>
                  <p className="text-yellow-400 font-bold text-lg mt-2 uppercase">{currentDay.accessNote}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 px-6 bg-pink-500 relative overflow-hidden text-center z-10 border-t-8 border-t-yellow-400 border-b-4 border-b-black">
         <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
         <div className="max-w-4xl mx-auto bg-white border-4 border-black p-12 shadow-[12px_12px_0_#000] relative z-10 transform -rotate-1">
          <h2 className="text-5xl md:text-6xl font-black text-black uppercase mb-6 tracking-tighter">
            GARANTA SUA VAGA
          </h2>
          <p className="text-xl font-bold text-black mb-10 uppercase bg-techstars-green border-4 border-black inline-block px-4 py-1 rotate-1 shadow-[6px_6px_0_#000]">
            INSCRIÇÕES ABERTAS
          </p>
          <br/>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-black text-techstars-green font-black text-2xl uppercase border-4 border-black shadow-[8px_8px_0_#39C463] transition-all transform hover:-translate-y-1 hover:shadow-[12px_12px_0_#39C463]"
          >
            FAZER MINHA INSCRIÇÃO
            <svg
              className="w-6 h-6 ml-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Floating Mobile/Desktop Day Selector */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.div
            initial={{ y: 100, opacity: 0, x: "-50%" }}
            animate={{ y: 0, opacity: 1, x: "-50%" }}
            exit={{ y: 100, opacity: 0, x: "-50%" }}
            className="fixed bottom-4 sm:bottom-8 left-1/2 z-50 w-[95%] sm:w-auto max-w-lg"
          >
            <div className="bg-black border-4 border-black p-1 sm:p-2 shadow-[8px_8px_0_#39C463] flex gap-1 sm:gap-2">
              {scheduleData.map((day, index) => {
                const isActive = activeDay === index;
                const shortName = day.dayName.split('-')[0];
                return (
                  <button
                    key={index}
                    onClick={() => {
                        setActiveDay(index);
                        document.getElementById("timeline-section")?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex-1 flex flex-col items-center justify-center py-2 px-2 sm:px-6 transition-all border-4 ${
                      isActive
                        ? "bg-techstars-green border-black text-black shadow-[4px_4px_0_#fff] scale-105 z-10"
                        : "bg-white border-transparent text-black hover:bg-gray-200"
                    }`}
                  >
                    <span className="text-xl sm:text-2xl mb-1">{day.emoji}</span>
                    <span className="font-black uppercase text-[10px] sm:text-xs tracking-tighter">
                      <span className="hidden sm:inline">{day.dayName}</span>
                      <span className="sm:hidden">{shortName}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StartupWeekendFooter />
    </main>
  );
}
