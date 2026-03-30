"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import Image from "next/image";
import Link from "next/link";
import orcamento from "@/data/orcamento.json";

// Destructure new schema
const { participants, totalPeople, despesas, contingencia, sponsors } = orcamento.data;

// Category totals
const totalGeral = despesas.geral.reduce((sum, item) => sum + item.value, 0);
const totalSuprimentos = despesas.suprimentos.reduce((sum, item) => sum + item.value, 0);

const alimentacaoDays = [
  { key: "sexta", label: "Sexta-feira", icon: "🌙", items: despesas.alimentacao.sexta },
  { key: "sabado", label: "Sábado", icon: "☀️", items: despesas.alimentacao.sabado },
  { key: "domingo", label: "Domingo", icon: "🌅", items: despesas.alimentacao.domingo },
];
const totalAlimentacao = alimentacaoDays.reduce(
  (sum, day) => sum + day.items.reduce((s, item) => s + item.value, 0),
  0
);

const totalDiversos = despesas.diversos.reduce((sum, item) => sum + item.value, 0);

const totalDespesas = totalGeral + totalSuprimentos + totalAlimentacao + totalDiversos + contingencia.value;
const costPerParticipant = totalDespesas / participants;

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Category config for the detailed view and breakdown bars
const categories = [
  { key: "alimentacao", label: "Alimentação", icon: "🍽️", total: totalAlimentacao, color: "bg-pink-500" },
  { key: "suprimentos", label: "Suprimentos", icon: "📦", total: totalSuprimentos, color: "bg-blue-500" },
  { key: "diversos", label: "Diversos", icon: "🎁", total: totalDiversos, color: "bg-purple-500" },
  { key: "geral", label: "Geral", icon: "⚙️", total: totalGeral, color: "bg-yellow-400" },
  { key: "contingencia", label: "Contingência (10%)", icon: "🛡️", total: contingencia.value, color: "bg-orange-400" },
];

// Sponsor tier visual config
const tierConfig = {
  Platina: { bg: "bg-blue-600", cols: "grid-cols-1" },
  Prata: { bg: "bg-gray-300", cols: "grid-cols-1 md:grid-cols-2" },
  Bronze: { bg: "bg-orange-400", cols: "grid-cols-1 md:grid-cols-3" },
};

const tierOrder = ["Platina", "Prata", "Bronze"];
const sponsorsByTier = tierOrder
  .map((tier) => ({
    tier,
    config: tierConfig[tier],
    items: sponsors.filter((s) => s.tier === tier),
  }))
  .filter((g) => g.items.length > 0);

export default function TransparenciaPage() {
  const [openCategories, setOpenCategories] = useState({ alimentacao: true });
  const [openDays, setOpenDays] = useState({ "Sexta-feira": true });

  const toggleCategory = (key) => {
    setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDay = (label) => {
    setOpenDays((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-techstars-green selection:text-black relative overflow-x-hidden">
      <StartupWeekendSEO />

      {/* Nav */}
      <nav className="py-4 px-4 sm:px-6 border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center sm:justify-between items-center gap-3">
          <Link href="/startup-weekend" className="text-lg sm:text-xl md:text-2xl font-black text-black uppercase tracking-tighter hover:text-techstars-green transition-colors text-center">
            techstars_ Startup Weekend
          </Link>
          <Link href="/startup-weekend" className="text-black font-black uppercase hover:bg-black hover:text-white px-3 py-1 sm:px-4 sm:py-2 border-4 border-black shadow-[4px_4px_0_#39C463] transition-all text-xs sm:text-sm md:text-base whitespace-nowrap">
            &larr; VOLTAR
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 bg-pink-500 border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="bg-black text-white text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-white inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
             A VERDADE NUA E CRUA
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-[4px_4px_0_#fff]">
            PORTAL DA <br/>
            <span className="bg-black text-white px-4 inline-block transform rotate-1 mt-2">TRANSPARÊNCIA</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform -rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
            O evento é 100% organizado por voluntários. NENHUM centavo de lucro.<br/>
            <span className="text-blue-600 block mt-2">{"//"} Veja exatamente onde seu dinheiro é investido.</span>
          </p>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-24 px-6 bg-black border-b-4 border-black relative z-0">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                value: formatCurrency(totalDespesas),
                label: "Custo Total do Evento",
                description: "Soma de todos os custos operacionais previstos para realizar o evento.",
                color: "bg-yellow-400"
              },
              {
                value: `~${formatCurrency(costPerParticipant)}`,
                label: "Custo por Inscrito",
                description: "Valor mínimo necessário por participante para cobrir 100% dos custos.",
                color: "bg-blue-600"
              },
              {
                value: `${participants} Participantes`,
                label: `+ ${totalPeople - participants} entre org e mentores`,
                description: `${totalPeople} pessoas no total que precisam ser alimentadas e atendidas.`,
                color: "bg-techstars-green"
              },
            ].map((card, i) => (
              <div key={i} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#39C463] relative hover:-translate-y-2 hover:-translate-x-2 transition-transform hover:shadow-[12px_12px_0_#39C463]">
                <div className={`absolute -top-6 -right-6 w-12 h-12 border-4 border-black ${card.color} rounded-full z-0 flex items-center justify-center font-black text-xl`}>{i+1}</div>
                <div className="text-4xl md:text-5xl font-black text-black mb-4 relative z-10 drop-shadow-[2px_2px_0_#39C463]">
                  {card.value}
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-4 tracking-tight border-b-4 border-black pb-2 inline-block">
                  {card.label}
                </h3>
                <p className="text-black font-bold text-base leading-relaxed break-words">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Justification / Breakdown */}
      <section className="py-24 px-6 bg-[#f4f4f0] border-b-4 border-black border-t-8 border-t-yellow-400">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0_#000] overflow-hidden flex flex-col md:flex-row transform rotate-1 hover:rotate-0 transition-transform">
            {/* Left: Big number */}
            <div className="w-full md:w-1/2 p-8 md:p-16 border-b-4 md:border-b-0 md:border-r-4 border-black flex flex-col justify-center bg-yellow-400">
              <div className="text-6xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tighter mb-4 drop-shadow-[4px_4px_0_#fff]">
                ~{formatCurrency(costPerParticipant)}
              </div>
              <div className="flex items-start">
                  <h3 className="text-3xl font-black text-black uppercase tracking-tighter mb-6 bg-white border-4 border-black inline-block px-4 py-2 transform -rotate-1 shadow-[4px_4px_0_#000]">
                    CUSTO POR INSCRITO
                  </h3>
              </div>
              <p className="text-black font-bold text-lg leading-relaxed">
                Este é o valor mínimo por participante para cobrir TODOS os custos operacionais (
                <span className="bg-black text-white px-2 py-0.5 mx-1 inline-block transform rotate-1">{formatCurrency(totalDespesas)}</span>
                ) dividido pelos <span className="bg-black text-white px-2 py-0.5 mx-1 inline-block transform -rotate-1">{participants}</span> inscritos garantidos.
              </p>
            </div>

            {/* Right: Breakdown bars */}
            <div className="w-full md:w-1/2 p-8 md:p-16 bg-black flex flex-col justify-center">
              <h4 className="text-xl md:text-3xl font-black text-techstars-green uppercase tracking-tighter mb-8 drop-shadow-[2px_2px_0_#000]">
                COMO CADA REAL É ALOCADO
              </h4>
              <div className="space-y-8">
                {categories.map((cat) => {
                  const percent = ((cat.total * 100) / totalDespesas).toFixed(0);
                  return (
                    <div key={cat.key} className="relative">
                      <div className="flex flex-col xl:flex-row xl:justify-between text-sm mb-2 gap-2 items-start xl:items-end">
                        <span className="text-white font-black uppercase tracking-tight">{cat.icon} {cat.label}</span>
                        <span className="text-techstars-green font-black text-lg md:text-xl bg-black border-2 border-techstars-green px-2 py-0.5 shadow-[2px_2px_0_#39C463]">
                          {formatCurrency(cat.total)} <span className="text-white ml-1">({percent}%)</span>
                        </span>
                      </div>
                      <div className="w-full bg-zinc-800 border-2 border-black h-6 lg:h-8 shadow-[2px_2px_0_#fff]">
                        <div
                          className={`${cat.color} h-full border-r-2 border-black transition-all duration-1000`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-12 bg-blue-600 border-4 border-black p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-[8px_8px_0_#000] transform -rotate-1 hover:rotate-0 transition-transform">
             <div className="bg-white border-4 border-black w-20 h-20 flex items-center justify-center text-4xl shadow-[4px_4px_0_#000] rotate-3 shrink-0">🤝</div>
             <p className="text-white font-black text-xl md:text-2xl uppercase drop-shadow-[2px_2px_0_#000] text-center md:text-left leading-snug tracking-tighter">
               A EQUIPE ORGANIZADORA É 100% VOLUNTÁRIA. NÃO HÁ LUCRO. CADA CENTAVO FOCA NA EXPERIÊNCIA DOS PARTICIPANTES.
             </p>
          </div>
        </div>
      </section>

      {/* Detailed Costs — Category-based accordion */}
      <section className="py-24 px-6 bg-techstars-green border-b-4 border-black relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4 drop-shadow-[4px_4px_0_#fff] text-center">
            DETALHAMENTO
          </h2>
          <p className="text-black font-bold text-xl uppercase bg-white border-4 border-black px-4 py-2 inline-block mb-12 shadow-[4px_4px_0_#000] rotate-[-1deg] mx-auto block text-center">
            Todas as despesas previstas, item por item
          </p>

          <div className="bg-white border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
            {/* Geral */}
            <CategoryAccordion
              label="Geral"
              icon="⚙️"
              total={totalGeral}
              isOpen={openCategories.geral}
              onToggle={() => toggleCategory("geral")}
            >
              {despesas.geral.map((item) => (
                <ItemRow key={item.id} name={item.name} value={item.value} />
              ))}
            </CategoryAccordion>

            {/* Suprimentos */}
            <CategoryAccordion
              label="Suprimentos"
              icon="📦"
              total={totalSuprimentos}
              isOpen={openCategories.suprimentos}
              onToggle={() => toggleCategory("suprimentos")}
            >
              {despesas.suprimentos.map((item) => (
                <ItemRow
                  key={item.id}
                  name={item.name}
                  value={item.value}
                  unitCost={item.unitCost}
                  totalPeople={totalPeople}
                />
              ))}
            </CategoryAccordion>

            {/* Alimentação — nested day accordion */}
            <CategoryAccordion
              label="Alimentação"
              icon="🍽️"
              total={totalAlimentacao}
              isOpen={openCategories.alimentacao}
              onToggle={() => toggleCategory("alimentacao")}
            >
              {alimentacaoDays.map((day) => {
                const dayTotal = day.items.reduce((s, item) => s + item.value, 0);
                return (
                  <div key={day.key} className="border-b-2 border-gray-200 last:border-0">
                    <button
                      onClick={() => toggleDay(day.label)}
                      className="w-full bg-gray-50 hover:bg-gray-100 transition-colors px-4 py-3 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{day.icon}</span>
                        <span className="text-lg font-black text-black uppercase tracking-tighter">{day.label}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-gray-600">{formatCurrency(dayTotal)}</span>
                        <span className="text-xl font-black w-6 text-center">
                          {openDays[day.label] ? "−" : "+"}
                        </span>
                      </div>
                    </button>
                    <AnimatePresence initial={false}>
                      {openDays[day.label] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-3 flex flex-col gap-2">
                            {day.items.map((item) => (
                              <ItemRow
                                key={item.id}
                                name={item.name}
                                value={item.value}
                                unitCost={item.unitCost}
                                totalPeople={totalPeople}
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </CategoryAccordion>

            {/* Diversos */}
            <CategoryAccordion
              label="Diversos"
              icon="🎁"
              total={totalDiversos}
              isOpen={openCategories.diversos}
              onToggle={() => toggleCategory("diversos")}
            >
              {despesas.diversos.map((item) => (
                <ItemRow
                  key={item.id}
                  name={item.name}
                  value={item.value}
                  unitCost={item.unitCost}
                  totalPeople={totalPeople}
                />
              ))}
            </CategoryAccordion>

            {/* Contingência */}
            <CategoryAccordion
              label={`Contingência (${contingencia.percent}%)`}
              icon="🛡️"
              total={contingencia.value}
              isOpen={openCategories.contingencia}
              onToggle={() => toggleCategory("contingencia")}
              dashed
            >
              <div className="px-4 py-3 text-sm font-bold text-gray-600">
                Reserva de {contingencia.percent}% sobre as despesas para cobrir imprevistos.
              </div>
            </CategoryAccordion>

            {/* Grand Total */}
            <div className="bg-black text-white p-8 border-t-8 border-yellow-400 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Despesa Total</span>
              <span className="text-4xl md:text-5xl font-black text-techstars-green drop-shadow-[4px_4px_0_#000]">{formatCurrency(totalDespesas)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Local Sponsors */}
      {sponsorsByTier.length > 0 && (
      <section className="py-24 px-6 bg-black border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 drop-shadow-[4px_4px_0_#39C463]">
              QUEM TORNA POSSÍVEL
            </h2>
            <div className="bg-white text-black font-black text-lg md:text-2xl uppercase px-8 py-3 border-4 border-black shadow-[6px_6px_0_#fff] rotate-[-1deg]">
               Empresas que investem no ecossistema
            </div>
          </div>

          <div className="space-y-24">
            {sponsorsByTier.map(({ tier, config, items }) => (
              <div key={tier} className="relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
                  <span className="bg-black text-techstars-green border-4 border-techstars-green px-8 py-3 text-2xl md:text-3xl font-black uppercase tracking-widest shadow-[6px_6px_0_#fff] inline-block rotate-1">
                    COTA {tier}
                  </span>
                </div>
                <div className={`grid ${config.cols} gap-10 bg-zinc-900 border-4 border-techstars-green p-12 pt-20 shadow-[12px_12px_0_#39C463]`}>
                  {items.map((sponsor) => (
                    <a
                      key={sponsor.name}
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#000] hover:shadow-[16px_16px_0_#000] hover:-translate-y-2 hover:-translate-x-2 transition-all flex items-center justify-center h-56 md:h-64 group"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={sponsor.name === "SENAI" ? 200 : 360}
                        height={sponsor.name === "SENAI" ? 80 : 144}
                        className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                          sponsor.name === "SENAI" ? "h-24 md:h-28 w-auto" : "h-32 md:h-40 w-auto invert"
                        }`}
                      />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Registration CTA */}
      <section className="py-24 px-6 bg-yellow-400 relative overflow-hidden text-center z-10 border-b-4 border-black">
         <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
         <div className="max-w-4xl mx-auto bg-black border-4 border-black p-12 md:p-16 shadow-[16px_16px_0_#fff] relative z-10 transform rotate-1">
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase mb-8 tracking-tighter drop-shadow-[4px_4px_0_#39C463]">
            VOCÊ ENTENDEU O RECADO!
          </h2>
          <p className="text-xl md:text-2xl font-bold text-black uppercase bg-white border-4 border-black inline-block px-6 py-3 rotate-[-1deg] shadow-[6px_6px_0_#000] mb-12 max-w-2xl leading-relaxed">
            Agora que sabe como cada real é investido, faça parte dessa experiência transformadora.
          </p>
          <br/>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col sm:flex-row items-center justify-center gap-4 px-10 py-6 bg-techstars-green hover:bg-white text-black font-black text-2xl md:text-3xl uppercase border-4 border-black shadow-[12px_12px_0_#000] hover:shadow-[16px_16px_0_#000] transition-all transform hover:-translate-y-1 hover:-translate-x-1"
          >
            <span>COMPRAR MEU INGRESSO</span>
            <svg
              className="w-8 h-8 shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}

// ── Sub-components ──────────────────────────────────────────

function CategoryAccordion({ label, icon, total, isOpen, onToggle, dashed, children }) {
  return (
    <div className={`border-b-4 border-black last:border-0 ${dashed ? "border-dashed" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full bg-yellow-400 hover:bg-yellow-500 transition-colors px-6 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl bg-white border-2 border-black inline-flex justify-center p-1 shadow-[2px_2px_0_#000] shrink-0">{icon}</span>
          <span className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter">{label}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-lg md:text-xl font-black text-black">{formatCurrency(total)}</span>
          <span className="text-3xl font-black w-8 text-center">{isOpen ? "−" : "+"}</span>
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-white"
          >
            <div className="p-6 flex flex-col gap-3 border-t-4 border-black">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ItemRow({ name, value, unitCost, totalPeople }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-50 border-2 border-black px-4 py-3 hover:bg-gray-100">
      <div className="flex flex-col w-full sm:w-2/3 mb-1 sm:mb-0">
        <span className="text-black font-bold uppercase text-sm break-words">{name}</span>
        {unitCost != null && (
          <span className="text-xs text-gray-500 font-semibold">
            {formatCurrency(unitCost)}/pessoa × {totalPeople} = {formatCurrency(value)}
          </span>
        )}
      </div>
      <span className={`text-black bg-white px-2 py-0.5 border-2 border-black font-black text-lg md:text-xl shrink-0 shadow-[2px_2px_0_#39C463] ${value === 0 ? "opacity-40" : ""}`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}
