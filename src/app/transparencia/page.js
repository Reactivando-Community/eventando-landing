"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import Image from "next/image";
import Link from "next/link";
import orcamento from "@/data/orcamento.json";

// Computed constants from budget data
const { participants, fixedStaff, mentorsPerTeam, participantsPerTeam, fixedItems, variableItems, sponsors } = orcamento.data;

const teams = Math.ceil(participants / participantsPerTeam);
const mentors = teams * mentorsPerTeam;
const totalHeadcount = participants + fixedStaff + mentors;
const totalFixed = fixedItems.reduce((sum, item) => sum + item.value, 0);
const variableCostPerPerson = variableItems.reduce((sum, item) => sum + item.value, 0);
const totalVariable = variableCostPerPerson * totalHeadcount;
const totalEventCost = totalFixed + totalVariable;
const costPerParticipant = totalEventCost / participants;

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Group variable items by day
const groupVariableItems = () => {
  const groups = [
    { label: "Sexta-feira", items: [] },
    { label: "Sábado", items: [] },
    { label: "Domingo", items: [] },
    { label: "Materiais", items: [] },
  ];

  variableItems.forEach((item) => {
    if (item.name.includes("Sexta")) {
      groups[0].items.push(item);
    } else if (item.name.includes("Sábado")) {
      groups[1].items.push(item);
    } else if (item.name.includes("Domingo")) {
      groups[2].items.push(item);
    } else {
      groups[3].items.push(item);
    }
  });

  return groups;
};

const variableGroups = groupVariableItems();

// Icons for fixed costs
const fixedCostIcons = {
  Hospedagem: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  Backdrop: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Passagens: (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
};

const getFixedCostIcon = (name) => {
  if (name.includes("Hospedagem")) return fixedCostIcons.Hospedagem;
  if (name.includes("Backdrop")) return fixedCostIcons.Backdrop;
  if (name.includes("Passagens")) return fixedCostIcons.Passagens;
  return fixedCostIcons.Backdrop;
};

// Day group icons
const groupIcons = {
  "Sexta-feira": "🌙",
  "Sábado": "☀️",
  "Domingo": "🌅",
  "Materiais": "📦",
};

// Sponsor tier visual config — ordered by hierarchy (highest first)
const tierConfig = {
  Prata: {
    gradient: "from-slate-400 to-slate-200",
    badge: "bg-slate-300/20 text-slate-300",
    cols: "grid-cols-1",
  },
  Bronze: {
    gradient: "from-amber-700 to-amber-500",
    badge: "bg-amber-700/20 text-amber-600",
    cols: "grid-cols-1 md:grid-cols-2",
  },
};

const tierOrder = ["Prata", "Bronze"];
const sponsorsByTier = tierOrder
  .map((tier) => ({
    tier,
    config: tierConfig[tier],
    items: sponsors.filter((s) => s.tier === tier),
  }))
  .filter((g) => g.items.length > 0);

export default function TransparenciaPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans">
      {/* Nav */}
      <nav className="py-6 px-6 border-b border-gray-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/startup-weekend"
            className="text-xl font-black text-black dark:text-white"
          >
            techstars_ Startup Weekend Anápolis
          </Link>
          <Link
            href="/startup-weekend"
            className="text-techstars-green hover:underline font-bold"
          >
            ← Voltar
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
              Portal da{" "}
              <span className="text-techstars-green">Transparência</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-techstars-slate max-w-3xl mx-auto leading-relaxed">
              O techstars_ Startup Weekend Anápolis é organizado 100% por voluntários. Não
              existe margem de lucro — cada real do ingresso é investido
              diretamente na experiência do evento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-24 px-6 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                value: formatCurrency(totalEventCost),
                label: "Custo Total do Evento",
                description: "Soma de todos os custos fixos e variáveis para realizar o evento.",
              },
              {
                value: `~${formatCurrency(costPerParticipant)}`,
                label: "Custo por Inscrito",
                description: "Valor necessário por participante para cobrir 100% dos custos.",
              },
              {
                value: `${participants} participantes`,
                label: `+ ${fixedStaff} organização + ${mentors} mentores`,
                description: `${totalHeadcount} pessoas no total que precisam ser alimentadas e atendidas durante o evento.`,
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-zinc-800/50 rounded-3xl border border-zinc-700/50"
              >
                <div className="text-4xl md:text-5xl font-black text-techstars-green mb-4">
                  {card.value}
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {card.label}
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fixed Costs */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-6 tracking-tight">
              Custos Fixos
            </h2>
            <p className="text-xl text-gray-600 dark:text-zinc-500 max-w-2xl mx-auto">
              Despesas que independem do número de participantes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fixedItems.map((item, i) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-techstars-green/10 text-techstars-green rounded-2xl flex items-center justify-center mb-6">
                  {getFixedCostIcon(item.name)}
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-4">
                  {item.name}
                </h3>
                <div className="text-3xl font-black text-techstars-green">
                  {formatCurrency(item.value)}
                </div>
              </motion.div>
            ))}
          </div>
          {/* Summary bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-techstars-green/10 border border-techstars-green/20 rounded-2xl flex items-center justify-between"
          >
            <span className="text-lg font-bold text-black dark:text-white">
              Total Custos Fixos
            </span>
            <span className="text-2xl font-black text-techstars-green">
              {formatCurrency(totalFixed)}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Variable Costs */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-6 tracking-tight">
              Custos Variáveis
            </h2>
            <p className="text-xl text-gray-600 dark:text-zinc-500 max-w-2xl mx-auto">
              Custo por pessoa × {totalHeadcount} pessoas ({participants}{" "}
              participantes + {fixedStaff} organização + {mentors} mentores)
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden shadow-sm"
          >
            {variableGroups.map((group, gi) => (
              <div key={group.label}>
                {/* Group header */}
                <div className="px-8 py-4 bg-gray-50 dark:bg-zinc-800/50 border-b border-gray-100 dark:border-zinc-800">
                  <span className="text-lg font-bold text-black dark:text-white">
                    <span className="mr-2">{groupIcons[group.label]}</span>
                    {group.label}
                  </span>
                </div>
                {/* Items */}
                {group.items.map((item, ii) => (
                  <div
                    key={item.id}
                    className={`px-8 py-4 flex items-center justify-between ${
                      ii < group.items.length - 1 || gi < variableGroups.length - 1
                        ? "border-b border-gray-50 dark:border-zinc-800/50"
                        : ""
                    }`}
                  >
                    <span className="text-gray-700 dark:text-zinc-300">
                      {item.name}
                    </span>
                    <span className="font-bold text-black dark:text-white">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            {/* Summary */}
            <div className="px-8 py-6 bg-zinc-900 dark:bg-zinc-800 border-t border-zinc-800 dark:border-zinc-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-zinc-300 font-medium">
                  Total por pessoa
                </span>
                <span className="text-xl font-black text-white">
                  {formatCurrency(variableCostPerPerson)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-300 font-medium">
                  Total variável ({variableCostPerPerson} × {totalHeadcount}{" "}
                  pessoas)
                </span>
                <span className="text-xl font-black text-techstars-green">
                  {formatCurrency(totalVariable)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Local Sponsors */}
      <section className="py-24 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Patrocinadores Locais
            </h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto">
              Empresas que investem no ecossistema de inovação de Anápolis
            </p>
          </div>

          <div className="space-y-12">
            {sponsorsByTier.map(({ tier, config, items }) => (
              <div key={tier}>
                <div className={`grid ${config.cols} gap-8`}>
                  {items.map((sponsor, i) => (
                    <motion.div
                      key={sponsor.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`rounded-3xl bg-gradient-to-br ${config.gradient} p-[2px]`}
                    >
                      <div className="bg-zinc-900 rounded-3xl p-10 flex flex-col items-center text-center h-full">
                        <span
                          className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-8 ${config.badge}`}
                        >
                          {tier}
                        </span>
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center ${
                            sponsor.name === "SENAI"
                              ? "bg-white rounded-xl p-4"
                              : ""
                          }`}
                        >
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            width={sponsor.name === "SENAI" ? 200 : 360}
                            height={sponsor.name === "SENAI" ? 80 : 144}
                            className={
                              sponsor.name === "SENAI"
                                ? "h-16 md:h-20 w-auto object-contain"
                                : "h-24 md:h-32 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                            }
                          />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Justification */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Big number */}
              <div className="p-10 md:p-16 flex flex-col justify-center">
                <div className="text-6xl md:text-7xl font-black text-techstars-green mb-4">
                  ~{formatCurrency(costPerParticipant)}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                  Custo por Inscrito
                </h3>
                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                  Este é o valor mínimo necessário por participante para cobrir
                  100% dos custos do evento. O cálculo divide o custo total (
                  {formatCurrency(totalEventCost)}) pelos {participants}{" "}
                  inscritos, garantindo que todos os custos fixos e variáveis
                  sejam cobertos.
                </p>
              </div>

              {/* Right: Breakdown */}
              <div className="p-10 md:p-16 bg-zinc-900 dark:bg-zinc-800 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-zinc-400 uppercase tracking-widest mb-8">
                  Para onde vai cada real
                </h4>
                <div className="space-y-6">
                  {[
                    {
                      label: "Alimentação (7 refeições)",
                      value: variableItems
                        .filter((i) => i.name.includes("Alimentação"))
                        .reduce((s, i) => s + i.value, 0) * totalHeadcount,
                      percent: (
                        (variableItems
                          .filter((i) => i.name.includes("Alimentação"))
                          .reduce((s, i) => s + i.value, 0) *
                          totalHeadcount *
                          100) /
                        totalEventCost
                      ).toFixed(0),
                      color: "bg-techstars-green",
                    },
                    {
                      label: "Materiais (kit + crachás)",
                      value: variableItems
                        .filter((i) => !i.name.includes("Alimentação"))
                        .reduce((s, i) => s + i.value, 0) * totalHeadcount,
                      percent: (
                        (variableItems
                          .filter((i) => !i.name.includes("Alimentação"))
                          .reduce((s, i) => s + i.value, 0) *
                          totalHeadcount *
                          100) /
                        totalEventCost
                      ).toFixed(0),
                      color: "bg-emerald-400",
                    },
                    {
                      label: "Custos fixos (facilitador + backdrop)",
                      value: totalFixed,
                      percent: ((totalFixed * 100) / totalEventCost).toFixed(0),
                      color: "bg-emerald-600",
                    },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-zinc-300">{item.label}</span>
                        <span className="text-white font-bold">
                          {formatCurrency(item.value)} ({item.percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-3">
                        <div
                          className={`${item.color} h-3 rounded-full transition-all`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Volunteer statement */}
            <div className="px-10 md:px-16 py-8 bg-techstars-green/10 border-t border-techstars-green/20 flex items-center gap-4">
              <svg
                className="w-8 h-8 text-techstars-green shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-lg font-bold text-black dark:text-white">
                Toda a equipe organizadora é 100% voluntária. Não há margem de
                lucro. Cada centavo é investido na experiência dos participantes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 px-6 bg-techstars-green">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_40px_100px_-20px_rgba(57,196,99,0.3)]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Garanta sua vaga
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Agora que você sabe como cada real é investido, faça parte dessa
                experiência transformadora.
              </p>
              <div className="pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={eventConfig.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-10 py-5 bg-techstars-green hover:bg-[#45d171] text-black font-extrabold text-2xl rounded-2xl shadow-2xl transition-all duration-300"
                  >
                    Fazer minha inscrição
                    <svg
                      className="w-6 h-6 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
