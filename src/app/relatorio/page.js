"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import Link from "next/link";
import relatorio from "@/data/relatorio_final.json";

const { receitas, despesas, totais } = relatorio.data;

const formatCurrency = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function RelatorioPage() {
  const [openCategories, setOpenCategories] = useState({
    ingressos: true,
    patrocinadores: true,
    geral: false,
    suprimentos: false,
    facilitador: false,
    alimentacao: false,
    diversos: false
  });

  const [openDays, setOpenDays] = useState({ "Sábado": true });

  const toggleCategory = (key) => {
    setOpenCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleDay = (label) => {
    setOpenDays((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const totalAlimentacao =
    despesas.alimentacao.sexta.reduce((s, i) => s + i.value, 0) +
    despesas.alimentacao.sabado.reduce((s, i) => s + i.value, 0) +
    despesas.alimentacao.domingo.reduce((s, i) => s + i.value, 0);

  const alimentacaoDays = [
    { key: "sexta", label: "Sexta-feira", icon: "🌙", items: despesas.alimentacao.sexta },
    { key: "sabado", label: "Sábado", icon: "☀️", items: despesas.alimentacao.sabado },
    { key: "domingo", label: "Domingo", icon: "🌅", items: despesas.alimentacao.domingo },
  ];

  return (
    <>
      <StartupWeekendSEO title="Relatório de Receitas e Despesas - Startup Weekend" />
      
      {/* ── VISUALIZAÇÃO EM TELA ── */}
      <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-techstars-green selection:text-black relative overflow-x-hidden print:hidden">
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
        <section className="relative py-24 px-6 bg-pink-500 border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
            <div className="bg-black text-white text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-white inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
               TRANSPARÊNCIA TOTAL
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-[4px_4px_0_#fff]">
              RELATÓRIO <br/>
              <span className="bg-black text-white px-4 inline-block transform rotate-1 mt-2">FINAL</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform -rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
              Acompanhe exatamente todas as entradas e saídas financeiras do evento.<br/>
              <span className="text-blue-600 block mt-2">{"//"} A verdade nua e crua do nosso balanço.</span>
            </p>
            <button 
              onClick={() => window.print()} 
              className="mt-8 bg-white text-black font-black uppercase px-6 py-4 border-4 border-black shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:shadow-[10px_10px_0_#000] transition-all flex items-center gap-3 transform rotate-1"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              BAIXAR EM PDF
            </button>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="py-24 px-6 bg-black border-b-4 border-black relative z-0">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#39C463] relative hover:-translate-y-2 hover:-translate-x-2 transition-transform hover:shadow-[12px_12px_0_#39C463]">
                <div className="absolute -top-6 -right-6 w-12 h-12 border-4 border-black bg-blue-500 rounded-full z-0 flex items-center justify-center font-black text-xl">R</div>
                <div className="text-4xl md:text-5xl font-black text-black mb-4 relative z-10 drop-shadow-[2px_2px_0_#39C463]">
                  {formatCurrency(totais.receitaTotal)}
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-4 tracking-tight border-b-4 border-black pb-2 inline-block">
                  Receita Total
                </h3>
                <p className="text-black font-bold text-base leading-relaxed break-words">
                  Soma de todos os valores arrecadados com ingressos e patrocínios.
                </p>
              </div>
              
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#ff0000] relative hover:-translate-y-2 hover:-translate-x-2 transition-transform hover:shadow-[12px_12px_0_#ff0000]">
                <div className="absolute -top-6 -right-6 w-12 h-12 border-4 border-black bg-yellow-400 rounded-full z-0 flex items-center justify-center font-black text-xl">D</div>
                <div className="text-4xl md:text-5xl font-black text-black mb-4 relative z-10 drop-shadow-[2px_2px_0_#ff0000]">
                  {formatCurrency(totais.despesaTotal)}
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-4 tracking-tight border-b-4 border-black pb-2 inline-block">
                  Despesa Total
                </h3>
                <p className="text-black font-bold text-base leading-relaxed break-words">
                  Todos os custos envolvidos na realização do evento.
                </p>
              </div>
              
              <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#39C463] relative hover:-translate-y-2 hover:-translate-x-2 transition-transform hover:shadow-[12px_12px_0_#39C463]">
                <div className="absolute -top-6 -right-6 w-12 h-12 border-4 border-black bg-techstars-green rounded-full z-0 flex items-center justify-center font-black text-xl">=</div>
                <div className="text-4xl md:text-5xl font-black text-black mb-4 relative z-10 drop-shadow-[2px_2px_0_#39C463]">
                  {formatCurrency(totais.resultadoLiquido)}
                </div>
                <h3 className="text-xl font-black text-black uppercase mb-4 tracking-tight border-b-4 border-black pb-2 inline-block">
                  Resultado Líquido
                </h3>
                <p className="text-black font-bold text-base leading-relaxed break-words">
                  Saldo final positivo entre receitas e despesas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Receitas */}
        <section className="py-24 px-6 bg-blue-500 border-b-4 border-black relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-[4px_4px_0_#000] text-center">
              RECEITAS
            </h2>
            <p className="text-black font-bold text-xl uppercase bg-white border-4 border-black px-4 py-2 inline-block mb-12 shadow-[4px_4px_0_#000] rotate-[-1deg] mx-auto block text-center">
              De onde veio o dinheiro
            </p>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
              {/* Ingressos */}
              <CategoryAccordion
                label="Ingressos"
                icon="🎟️"
                total={receitas.ingressos.reduce((sum, item) => sum + item.value, 0)}
                isOpen={openCategories.ingressos}
                onToggle={() => toggleCategory("ingressos")}
                color="bg-techstars-green"
              >
                {receitas.ingressos.map((item) => (
                  <ItemRow key={item.id} name={item.name} value={item.value} />
                ))}
              </CategoryAccordion>

              {/* Patrocinadores */}
              <CategoryAccordion
                label="Patrocinadores"
                icon="🤝"
                total={receitas.patrocinadores.reduce((sum, item) => sum + item.value, 0)}
                isOpen={openCategories.patrocinadores}
                onToggle={() => toggleCategory("patrocinadores")}
                color="bg-techstars-green"
              >
                {receitas.patrocinadores.map((item) => (
                  <ItemRow key={item.id} name={item.name} value={item.value} />
                ))}
              </CategoryAccordion>
              
              <div className="bg-black text-white p-8 border-t-8 border-techstars-green flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Receita Total</span>
                <span className="text-4xl md:text-5xl font-black text-techstars-green drop-shadow-[4px_4px_0_#000]">{formatCurrency(totais.receitaTotal)}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Despesas */}
        <section className="py-24 px-6 bg-yellow-400 border-b-4 border-black relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter mb-4 drop-shadow-[4px_4px_0_#fff] text-center">
              DESPESAS
            </h2>
            <p className="text-black font-bold text-xl uppercase bg-white border-4 border-black px-4 py-2 inline-block mb-12 shadow-[4px_4px_0_#000] rotate-[1deg] mx-auto block text-center">
              Onde o dinheiro foi investido
            </p>

            <div className="bg-white border-4 border-black shadow-[8px_8px_0_#000] overflow-hidden">
              {/* Geral */}
              <CategoryAccordion
                label="Geral"
                icon="⚙️"
                total={despesas.geral.reduce((sum, item) => sum + item.value, 0)}
                isOpen={openCategories.geral}
                onToggle={() => toggleCategory("geral")}
                color="bg-pink-500"
              >
                {despesas.geral.map((item) => (
                  <ItemRow key={item.id} name={item.name} value={item.value} payer={item.payer} />
                ))}
              </CategoryAccordion>

              {/* Suprimentos */}
              <CategoryAccordion
                label="Suprimentos"
                icon="📦"
                total={despesas.suprimentos.reduce((sum, item) => sum + item.value, 0)}
                isOpen={openCategories.suprimentos}
                onToggle={() => toggleCategory("suprimentos")}
                color="bg-pink-500"
              >
                {despesas.suprimentos.map((item) => (
                  <ItemRow key={item.id} name={item.name} value={item.value} payer={item.payer} />
                ))}
              </CategoryAccordion>
              
              {/* Facilitador */}
              <CategoryAccordion
                label="Facilitador/a do Startup Weekend"
                icon="🎤"
                total={despesas.facilitador.reduce((sum, item) => sum + item.value, 0)}
                isOpen={openCategories.facilitador}
                onToggle={() => toggleCategory("facilitador")}
                color="bg-pink-500"
              >
                {despesas.facilitador.map((item) => (
                  <ItemRow key={item.id} name={item.name} value={item.value} payer={item.payer} />
                ))}
              </CategoryAccordion>

              {/* Alimentação — nested day accordion */}
              <CategoryAccordion
                label="Alimentação"
                icon="🍽️"
                total={totalAlimentacao}
                isOpen={openCategories.alimentacao}
                onToggle={() => toggleCategory("alimentacao")}
                color="bg-pink-500"
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
                                <ItemRow key={item.id} name={item.name} value={item.value} payer={item.payer} />
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
                total={despesas.diversos.reduce((sum, item) => sum + item.value, 0)}
                isOpen={openCategories.diversos}
                onToggle={() => toggleCategory("diversos")}
                color="bg-pink-500"
              >
                {despesas.diversos.map((item) => (
                  <ItemRow key={item.id} name={item.name} value={item.value} payer={item.payer} />
                ))}
              </CategoryAccordion>

              {/* Contingência */}
              <CategoryAccordion
                label="Despesa Imprevista (10%)"
                icon="🛡️"
                total={despesas.imprevista.value}
                isOpen={true}
                onToggle={() => {}}
                dashed
                color="bg-pink-500"
              >
                <ItemRow 
                  name="Despesa Imprevista" 
                  value={despesas.imprevista.value} 
                  payer={despesas.imprevista.payer} 
                />
              </CategoryAccordion>

              {/* Grand Total */}
              <div className="bg-black text-white p-8 border-t-8 border-pink-500 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Despesa Total</span>
                <span className="text-4xl md:text-5xl font-black text-pink-500 drop-shadow-[4px_4px_0_#000]">{formatCurrency(totais.despesaTotal)}</span>
              </div>
            </div>
          </div>
        </section>

        <StartupWeekendFooter />
      </main>

      {/* ── VISUALIZAÇÃO PARA IMPRESSÃO (PDF) ── */}
      <div className="hidden print:block p-8 bg-white text-black min-h-screen font-sans">
        <div className="text-center mb-8 border-b-4 border-black pb-6">
          <div className="inline-block bg-black text-white px-4 py-1 text-sm font-black uppercase tracking-widest mb-4">
            TRANSPARÊNCIA TOTAL
          </div>
          <h1 className="text-5xl font-black uppercase tracking-tighter">Relatório Final</h1>
          <h2 className="text-2xl font-bold mt-2 text-gray-600">Startup Weekend Anápolis</h2>
        </div>
        
        {/* Resumo */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="border-4 border-black p-4 text-center bg-gray-50">
             <div className="text-sm font-black uppercase tracking-wider mb-2">Receita Total</div>
             <div className="text-2xl font-black text-blue-600">{formatCurrency(totais.receitaTotal)}</div>
          </div>
          <div className="border-4 border-black p-4 text-center bg-gray-50">
             <div className="text-sm font-black uppercase tracking-wider mb-2">Despesa Total</div>
             <div className="text-2xl font-black text-red-600">{formatCurrency(totais.despesaTotal)}</div>
          </div>
          <div className="border-4 border-black p-4 text-center bg-[#39C463] text-black">
             <div className="text-sm font-black uppercase tracking-wider mb-2">Resultado Líquido</div>
             <div className="text-2xl font-black">{formatCurrency(totais.resultadoLiquido)}</div>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          {/* Coluna Receitas */}
          <div>
            <h3 className="text-xl font-black uppercase border-b-4 border-black mb-4 pb-2 bg-blue-500 text-white px-4 py-2 inline-block">Receitas</h3>
            
            <div className="mb-4">
              <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Ingressos</h4>
              <div className="space-y-1">
                {receitas.ingressos.map(i => <PrintRow key={i.id} name={i.name} value={i.value} />)}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Patrocinadores</h4>
              <div className="space-y-1">
                {receitas.patrocinadores.map(i => <PrintRow key={i.id} name={i.name} value={i.value} />)}
              </div>
            </div>
          </div>

          {/* Coluna Despesas */}
          <div>
            <h3 className="text-xl font-black uppercase border-b-4 border-black mb-4 pb-2 bg-yellow-400 text-black px-4 py-2 inline-block">Despesas</h3>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Geral</h4>
                <div className="space-y-1">
                  {despesas.geral.map(i => <PrintRow key={i.id} name={i.name} value={i.value} payer={i.payer} />)}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Suprimentos</h4>
                <div className="space-y-1">
                  {despesas.suprimentos.map(i => <PrintRow key={i.id} name={i.name} value={i.value} payer={i.payer} />)}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Facilitador(a)</h4>
                <div className="space-y-1">
                  {despesas.facilitador.map(i => <PrintRow key={i.id} name={i.name} value={i.value} payer={i.payer} />)}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Diversos & Imprevistos</h4>
                <div className="space-y-1">
                  {despesas.diversos.map(i => <PrintRow key={i.id} name={i.name} value={i.value} payer={i.payer} />)}
                  <PrintRow name="Despesa Imprevista (10%)" value={despesas.imprevista.value} payer={despesas.imprevista.payer} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-bold text-lg border-b-2 border-gray-300 mb-2">Alimentação</h4>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {alimentacaoDays.map(day => (
                  <div key={day.key}>
                    <h5 className="font-bold text-sm text-gray-600 uppercase mb-1">{day.label}</h5>
                    <div className="space-y-1">
                      {day.items.map(i => <PrintRow key={i.id} name={i.name} value={i.value} payer={i.payer} />)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm font-bold text-gray-500 border-t-2 border-gray-200 pt-4">
          Relatório gerado automaticamente através do portal de transparência.
        </div>
      </div>
    </>
  );
}

// ── Sub-components ──────────────────────────────────────────

function CategoryAccordion({ label, icon, total, isOpen, onToggle, dashed, children, color = "bg-yellow-400" }) {
  const hoverColor = color === "bg-yellow-400" ? "hover:bg-yellow-500" : (color === "bg-pink-500" ? "hover:bg-pink-600" : "hover:bg-techstars-green-dark");

  return (
    <div className={`border-b-4 border-black last:border-0 ${dashed ? "border-dashed" : ""}`}>
      <button
        onClick={onToggle}
        className={`w-full ${color} transition-colors px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-left gap-4 hover:opacity-90`}
      >
        <div className="flex items-center gap-4">
          <span className="text-3xl bg-white border-2 border-black inline-flex justify-center p-1 shadow-[2px_2px_0_#000] shrink-0 text-black">{icon}</span>
          <span className="text-xl md:text-2xl font-black text-black uppercase tracking-tighter">{label}</span>
        </div>
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <span className="text-lg md:text-xl font-black text-black">{formatCurrency(total)}</span>
          <span className="text-3xl font-black w-8 text-center text-black">{isOpen ? "−" : "+"}</span>
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

function ItemRow({ name, value, payer }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center bg-gray-50 border-2 border-black px-4 py-3 hover:bg-gray-100">
      <div className="flex flex-col w-full sm:w-2/3 mb-1 sm:mb-0">
        <span className="text-black font-bold uppercase text-sm break-words">{name}</span>
        {payer && (
          <span className="text-xs text-blue-600 font-bold uppercase mt-1">
            Pago por: {payer}
          </span>
        )}
      </div>
      <span className={`text-black bg-white px-2 py-0.5 border-2 border-black font-black text-lg md:text-xl shrink-0 shadow-[2px_2px_0_#000] mt-2 sm:mt-0 ${value === 0 ? "opacity-40" : ""}`}>
        {formatCurrency(value)}
      </span>
    </div>
  );
}

function PrintRow({ name, value, payer }) {
  return (
    <div className="flex justify-between border-b-2 border-gray-200 py-1.5 items-center">
      <div className="flex flex-col">
        <span className="font-bold text-sm leading-tight text-black">{name}</span>
        {payer && <span className="text-[10px] text-gray-500 font-bold uppercase">Pago por: {payer}</span>}
      </div>
      <span className="font-black text-sm text-black">{formatCurrency(value)}</span>
    </div>
  );
}
