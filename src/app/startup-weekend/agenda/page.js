"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import { eventConfig } from "@/data/startup-weekend-event";

const scheduleData = [
  {
    dayName: "Sexta-feira",
    date: "1 de Maio",
    emoji: "🎤",
    accessLimit: "Acesso ao local até 23:30",
    accessNote: "Você pode ficar enquanto o local permitir",
    activities: [
      { time: "18:30", title: "Credenciamento", details: "Chegar no local e fazer o credenciamento" },
      { time: "18:50", title: "Coffee e networking", details: "Comer, compartilhar ideias, praticar o pitch e interagir com os outros participantes" },
      { time: "19:20", title: "Boas-Vindas", details: "Revisar a agenda para o final de semana e saber quem são os palestrantes e líderes de comunidade" },
      { time: "19:40", title: "Palestrante", details: "Ouça um empreendedor experiente e visionário" },
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

  const currentDay = scheduleData[activeDay];

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
              Agenda do{" "}
              <span className="text-techstars-green">Evento</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-techstars-slate max-w-3xl mx-auto leading-relaxed">
              3 dias intensos de imersão empreendedora.
              Confira a programação completa do Startup Weekend Anápolis — {eventConfig.dateFull}.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Day Tabs */}
      <section className="py-16 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {scheduleData.map((day, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveDay(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-6 rounded-2xl text-left transition-all duration-300 border ${
                  activeDay === index
                    ? "bg-techstars-green/10 border-techstars-green shadow-lg shadow-techstars-green/10"
                    : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <span className="text-3xl mb-3 block">{day.emoji}</span>
                <div className="text-lg font-bold text-white">{day.dayName}</div>
                <div className={`text-sm mt-1 ${
                  activeDay === index ? "text-techstars-green" : "text-techstars-slate"
                }`}>
                  {day.date}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Day header */}
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                  {currentDay.emoji} {currentDay.dayName}
                </h2>
                <p className="text-techstars-slate text-lg">
                  {currentDay.date} de 2026
                </p>
              </div>

              {/* Timeline items */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-[23px] md:left-[79px] top-0 bottom-0 w-0.5 bg-techstars-green/20" />

                {currentDay.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    className="relative flex gap-6 md:gap-8 mb-6 last:mb-0"
                  >
                    {/* Time */}
                    <div className="w-12 md:w-20 shrink-0 pt-6 text-right">
                      <span className="text-techstars-green font-bold text-sm md:text-lg">
                        {activity.time}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="relative shrink-0 pt-6">
                      <div className="w-3 h-3 rounded-full bg-techstars-green border-[3px] border-black ring-2 ring-techstars-green/30" />
                    </div>

                    {/* Card */}
                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {activity.title}
                      </h3>
                      <p className="text-techstars-slate leading-relaxed">
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
                transition={{ duration: 0.4, delay: currentDay.activities.length * 0.06 }}
                className="mt-10 bg-zinc-900/50 border border-techstars-green/20 rounded-xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-techstars-green/10 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-techstars-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold">{currentDay.accessLimit}</p>
                  <p className="text-techstars-slate text-sm mt-1">{currentDay.accessNote}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight">
            Garanta sua vaga
          </h2>
          <p className="text-xl text-gray-600 dark:text-techstars-slate mb-10">
            Inscrições abertas para o Startup Weekend Anápolis
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
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
