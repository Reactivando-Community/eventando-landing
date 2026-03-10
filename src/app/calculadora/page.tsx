"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NewFooter from "@/components/NewFooter";

export default function CalculadoraPage() {
  // Inputs - Using string | number to allow empty state for better UX
  const [participants, setParticipants] = useState<number>(75);
  const [fixedCosts, setFixedCosts] = useState<number | "">(5000);
  const [variableCostPerPerson, setVariableCostPerPerson] = useState<
    number | ""
  >(330);
  const [ticketPriceFull, setTicketPriceFull] = useState<number | "">(270);
  const [staffCount, setStaffCount] = useState<number | "">(15);
  const [mentorsPerTeam, setMentorsPerTeam] = useState<number | "">(1);
  const [participantsPerTeam, setParticipantsPerTeam] = useState<number | "">(
    7.5,
  );

  // Distribution for custom simulation
  const [dist50Off, setDist50Off] = useState(50); // percentage
  const [dist25Off, setDist25Off] = useState(0); // percentage
  const [distFull, setDistFull] = useState(50); // percentage

  const [activePlan, setActivePlan] = useState("A");

  // Normalized values for calculations
  const nParticipants = participants || 0;
  const nFixedCosts = Number(fixedCosts) || 0;
  const nVariableCost = Number(variableCostPerPerson) || 0;
  const nTicketPrice = Number(ticketPriceFull) || 0;
  const nStaff = Number(staffCount) || 0;
  const nMentorsPerTeam = Number(mentorsPerTeam) || 0;
  const nParticipantsPerTeam = Number(participantsPerTeam) || 7.5;

  // Calculations
  const teams = Math.ceil(nParticipants / nParticipantsPerTeam);
  const mentors = Math.ceil(teams * nMentorsPerTeam);
  const headcount = nParticipants + mentors + nStaff;
  const variableCostsTotal = headcount * nVariableCost;
  const totalCost = nFixedCosts + variableCostsTotal;

  // Revenue calculation based on distribution
  const count50Off = Math.round((dist50Off / 100) * nParticipants);
  const count25Off = Math.round((dist25Off / 100) * nParticipants);
  const countFull = nParticipants - count50Off - count25Off;

  const revenue =
    count50Off * (nTicketPrice * 0.5) +
    count25Off * (nTicketPrice * 0.75) +
    countFull * nTicketPrice;

  const sponsorshipNeeded = totalCost - revenue;
  const breakEvenStatus = revenue >= totalCost;

  // Quick Plan Apply
  const applyPlanA = () => {
    setDist50Off(50);
    setDist25Off(0);
    setDistFull(50);
    setActivePlan("A");
  };

  const applyPlanB = () => {
    setDist50Off(100);
    setDist25Off(0);
    setDistFull(0);
    setActivePlan("B");
  };

  const applyPlanC = () => {
    setDist50Off(50);
    setDist25Off(25);
    setDistFull(25);
    setActivePlan("C");
  };

  // Helper for tooltips
  const InfoIcon = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2 align-middle">
      <div className="w-4 h-4 rounded-full border border-gray-600 flex items-center justify-center text-[10px] font-black cursor-help group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
        i
      </div>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-gray-900 border border-white/10 rounded-xl text-[10px] font-medium text-gray-300 opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-2xl z-50">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );

  // Helper to handle numeric input changes
  const handleNumChange =
    (setter: (val: number | "") => void, isFloat = false) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (val === "") {
        setter("");
      } else {
        setter(isFloat ? parseFloat(val) : parseInt(val, 10));
      }
    };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-100 font-sans selection:bg-primary-500/30">
      {/* Visual background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.03]"></div>
      </div>

      {/* Modern Header */}
      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/40 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight uppercase italic text-white flex items-center gap-2">
                FINANCE<span className="text-primary-500">LAB</span>
              </h1>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
                Startup Weekend Dashboard
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center bg-white/5 p-1 rounded-2xl border border-white/5 gap-1">
            {[
              {
                id: "A",
                label: "Plano A",
                desc: "Equilibrado: 50% Early Bird | 50% Cheio. Ideal para garantir fluxo inicial sem comprometer margem.",
              },
              {
                id: "B",
                label: "Plano B",
                desc: "Agressivo: 100% de desconto (Preço de Madrugada). Foco em lotação rápida, exige alto patrocínio.",
              },
              {
                id: "C",
                label: "Plano C",
                desc: "Escalonado: 50% Early | 25% Mid | 25% Full. Incentiva compra antecipada com lotes progressivos.",
              },
            ].map((p) => (
              <div key={p.id} className="group relative">
                <button
                  onClick={
                    p.id === "A"
                      ? applyPlanA
                      : p.id === "B"
                        ? applyPlanB
                        : applyPlanC
                  }
                  className={`px-6 py-2 text-xs font-black rounded-xl transition-all uppercase tracking-widest ${activePlan === p.id ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20 scale-105" : "text-gray-500 hover:text-gray-300 hover:bg-white/5"}`}
                >
                  {p.label}
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-4 bg-gray-900 border border-white/10 rounded-2xl text-[10px] font-bold text-primary-400 opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50 text-center shadow-2xl backdrop-blur-xl">
                  {p.desc}
                  <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 border-sm border-transparent border-b-gray-900 border-4"></div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/"
            className="group flex items-center gap-3 text-xs font-black text-gray-400 hover:text-white transition-all uppercase tracking-widest bg-white/5 px-6 py-3 rounded-2xl border border-white/5"
          >
            Voltar
            <svg
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Controls Side */}
          <div className="xl:col-span-4 space-y-6">
            {/* Quick Summary Card */}
            <div
              className={`p-8 rounded-[32px] border-l-8 transition-colors ${breakEvenStatus ? "bg-green-500/10 border-green-500" : "bg-primary-500/10 border-primary-500"}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">
                    Status da Operação
                  </span>
                  <h2 className="text-2xl font-black tracking-tighter">
                    {breakEvenStatus ? "Lucrativo ✅" : "Déficit Alvo 📉"}
                  </h2>
                </div>
                <div
                  className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${breakEvenStatus ? "bg-green-500 text-white" : "bg-primary-500 text-white"}`}
                >
                  {activePlan}
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed italic">
                {breakEvenStatus
                  ? "A arrecadação de ingressos supera os custos operacionais projetados."
                  : "É necessário apoio externo ou patrocínio para viabilizar este cenário."}
              </p>
            </div>

            {/* Parameters Section */}
            <div className="bg-[#141417] p-8 rounded-[40px] border border-white/5 shadow-2xl">
              <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                Input de Variáveis
              </h2>

              <div className="space-y-10">
                {/* Participants */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-black text-white/60 uppercase">
                      Público Alvo
                      <InfoIcon text="Quantidade total de participantes para os quais você pretende vender ingressos." />
                    </label>
                    <span className="text-3xl font-black text-primary-500 tabular-nums tracking-tighter">
                      {participants}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="150"
                    value={participants}
                    onChange={(e) => {
                      setParticipants(parseInt(e.target.value, 10));
                      setActivePlan("Simulação");
                    }}
                    className="w-full h-1.5 bg-white/5 rounded-full appearance-none cursor-pointer accent-primary-500 hover:accent-primary-400"
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-bold">
                    <span>MÍN. 25</span>
                    <span>MÁX. 150</span>
                  </div>
                </div>

                <hr className="border-white/5" />

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Preço Ingresso
                      <InfoIcon text="Preço base (cheio) do ingresso. Os descontos dos lotes serão aplicados sobre este valor." />
                    </label>
                    <div className="flex items-center gap-2 bg-white/5 p-4 rounded-3xl border border-white/5">
                      <span className="text-xs font-bold text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        value={ticketPriceFull}
                        onChange={handleNumChange(setTicketPriceFull)}
                        className="w-full bg-transparent font-black text-lg outline-none"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Organização Fixa
                      <InfoIcon text="Pessoas da staff e núcleo organizador que não pagam, mas consomem catering." />
                    </label>
                    <div className="flex items-center gap-2 bg-white/5 p-4 rounded-3xl border border-white/5">
                      <input
                        type="number"
                        value={staffCount}
                        onChange={handleNumChange(setStaffCount)}
                        className="w-full bg-transparent font-black text-lg outline-none text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Mentores / Equipe
                      <InfoIcon text="Proporção desejada de mentores por equipe formada." />
                    </label>
                    <div className="flex items-center gap-2 bg-white/5 p-4 rounded-3xl border border-white/5">
                      <input
                        type="number"
                        value={mentorsPerTeam}
                        onChange={handleNumChange(setMentorsPerTeam)}
                        className="w-full bg-transparent font-black text-lg outline-none text-center"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Pessoas / Equipe
                      <InfoIcon text="Média de participantes por time (usado para estimar o número de equipes)." />
                    </label>
                    <div className="flex items-center gap-2 bg-white/5 p-4 rounded-3xl border border-white/5">
                      <input
                        type="number"
                        step="0.5"
                        value={participantsPerTeam}
                        onChange={handleNumChange(setParticipantsPerTeam, true)}
                        className="w-full bg-transparent font-black text-lg outline-none text-center"
                        placeholder="7.5"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2 opacity-50">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Estimativa de Equipes
                    </label>
                    <div className="flex items-center justify-center p-4 rounded-3xl border border-dashed border-white/10">
                      <span className="font-black text-lg">{teams}</span>
                    </div>
                  </div>
                  <div className="space-y-2 opacity-50">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Total Mentores
                    </label>
                    <div className="flex items-center justify-center p-4 rounded-3xl border border-dashed border-white/10">
                      <span className="font-black text-lg">{mentors}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Custos Fixos de Estrutura
                      <InfoIcon text="Custos que não mudam com o número de pessoas (ex: facilitador, local, backdrop)." />
                    </label>
                    <input
                      type="number"
                      value={fixedCosts}
                      onChange={handleNumChange(setFixedCosts)}
                      className="w-full bg-white/5 p-5 rounded-3xl border border-white/5 font-black text-2xl focus:border-primary-500/50 outline-none transition-colors"
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase">
                      Catering / Materiais (Pessoa)
                      <InfoIcon text="Custo por cabeça para alimentação e kits durante os 3 dias para todos presentes (participantes + staff + mentores)." />
                    </label>
                    <input
                      type="number"
                      value={variableCostPerPerson}
                      onChange={handleNumChange(setVariableCostPerPerson)}
                      className="w-full bg-white/5 p-5 rounded-3xl border border-white/5 font-black text-2xl focus:border-primary-500/50 outline-none transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization Side */}
          <div className="xl:col-span-8 space-y-8 animate-fade-in">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: "Investimento Total",
                  value: totalCost,
                  sub: `${headcount} pessoas no evento`,
                  color: "text-white",
                },
                {
                  label: "Receita Ingressos",
                  value: revenue,
                  sub: `${nParticipants} pagantes previstos`,
                  color: "text-green-500",
                },
                {
                  label: "Meta Patrocínio",
                  value: sponsorshipNeeded,
                  sub: `${totalCost > 0 ? ((sponsorshipNeeded / totalCost) * 100).toFixed(1) : 0}% do OPEX`,
                  color: "text-primary-500",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-[#141417] p-8 rounded-[40px] border border-white/5 shadow-xl relative overflow-hidden group"
                >
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">
                    {stat.label}
                  </span>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span
                      className={`text-4xl font-black tracking-tighter ${stat.color} group-hover:scale-105 transition-transform origin-left inline-block`}
                    >
                      {stat.value.toLocaleString("pt-BR", {
                        maximumFractionDigits: 0,
                      })}
                    </span>
                    <span className="text-xs font-bold text-gray-600 uppercase italic">
                      BRL
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                    {stat.sub}
                  </p>
                  <div className="absolute right-[-10%] bottom-[-10%] w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-primary-500/5 transition-colors"></div>
                </div>
              ))}
            </div>

            {/* Main Visual Board */}
            <div className="bg-[#141417] p-10 rounded-[48px] border border-white/5 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                  <div>
                    <h3 className="text-3xl font-black tracking-tighter italic uppercase text-white mb-2">
                      Engenharia de Lotes
                    </h3>
                    <p className="text-gray-500 text-sm font-medium italic">
                      Distribuição proporcional baseada na demanda de mercado
                    </p>
                  </div>
                  {activePlan && (
                    <div className="bg-primary-500/5 border border-primary-500/20 px-6 py-4 rounded-[28px] max-w-sm animate-fade-in">
                      <div className="flex items-center gap-3 mb-1 text-primary-400">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          Estratégia {activePlan} Ativa
                        </span>
                      </div>
                      <p className="text-xs font-bold leading-relaxed text-gray-300 italic">
                        {activePlan === "A" &&
                          "Foco em equilíbrio: Garante receita rápida com o lote promocional e protege a margem final com 50% dos ingressos em preço cheio."}
                        {activePlan === "B" &&
                          "Crescimento Agressivo: Todos os participantes entram via subsídio. Ideal para maximizar alcance, dependendo 100% de patrocínio."}
                        {activePlan === "C" &&
                          "Escalonamento Progressivo: Modelo clássico de FOMO (Fear of Missing Out). Premia quem compra cedo e maximiza receita no final."}
                      </p>
                    </div>
                  )}
                  <div className="bg-white/5 px-8 py-5 rounded-[32px] border border-white/5 backdrop-blur-sm">
                    <span className="text-[10px] font-black text-gray-500 uppercase block mb-1">
                      Ticket Médio
                    </span>
                    <span className="text-2xl font-black text-primary-500 tracking-tighter italic">
                      {(revenue / nParticipants || 0).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  {[
                    {
                      label: "Madrugada (50% Off)",
                      count: count50Off,
                      price: nTicketPrice * 0.5,
                      bg: "bg-primary-500",
                    },
                    {
                      label: "Antecipado (25% Off)",
                      count: count25Off,
                      price: nTicketPrice * 0.75,
                      bg: "bg-blue-600",
                    },
                    {
                      label: "Full Price",
                      count: countFull,
                      price: nTicketPrice,
                      bg: "bg-white",
                    },
                  ].map((lot, i) => (
                    <div key={i} className="space-y-6">
                      <div className="flex justify-between items-end">
                        <div className="space-y-1">
                          <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">
                            {lot.label}
                          </span>
                          <p className="text-3xl font-black">
                            {lot.count}
                            <span className="text-xs text-gray-600 ml-1">
                              UN
                            </span>
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-black text-gray-500">
                            POR
                          </span>
                          <p className="text-lg font-black text-primary-500 tracking-tighter">
                            R$ {lot.price.toFixed(0)}
                          </p>
                        </div>
                      </div>
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${lot.bg} transition-all duration-[2s] ease-out-expo`}
                          style={{
                            width: `${nParticipants > 0 ? (lot.count / nParticipants) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
                        <span>Receita Prevista</span>
                        <span className="text-white">
                          {(lot.count * lot.price).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            maximumFractionDigits: 0,
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-16 border-t border-white/5">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-2">
                        Health Score Financeiro
                      </span>
                      <h4 className="text-3xl font-black tracking-tighter italic text-white flex items-center gap-4">
                        {totalCost > 0
                          ? Math.round((revenue / totalCost) * 100)
                          : 0}
                        %
                        <span
                          className={`text-xs px-3 py-1 rounded-lg uppercase tracking-widest not-italic ${breakEvenStatus ? "bg-green-500/20 text-green-500" : "bg-primary-500/20 text-primary-500"}`}
                        >
                          {breakEvenStatus
                            ? "AUTO-SUSTENTÁVEL"
                            : "NECESSITA APORTE"}
                        </span>
                      </h4>
                    </div>
                    <div className="text-right hidden md:block">
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                        Saldo Atual
                      </span>
                      <p
                        className={`text-2xl font-black tracking-tighter ${breakEvenStatus ? "text-green-500" : "text-primary-500"}`}
                      >
                        {(revenue - totalCost).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          maximumFractionDigits: 0,
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="h-4 bg-white/5 rounded-2xl p-1 shadow-inner flex overflow-hidden">
                    <div
                      className={`h-full rounded-xl transition-all duration-[2.5s] ease-out shadow-lg shadow-primary-500/10 ${breakEvenStatus ? "bg-gradient-to-r from-green-600 to-emerald-400" : "bg-gradient-to-r from-primary-600 to-primary-400"}`}
                      style={{
                        width: `${totalCost > 0 ? Math.min(100, (revenue / totalCost) * 100) : 0}%`,
                      }}
                    ></div>
                  </div>

                  <p className="mt-6 text-[10px] font-black text-gray-600 text-center uppercase tracking-[0.4em]">
                    COBERTURA DE INVESTIMENTO VIA TICKETING
                  </p>
                </div>
              </div>

              {/* Decorative background logo */}
              <div className="absolute right-[-5%] top-[-5%] w-96 h-96 border-[40px] border-white/5 rounded-full pointer-events-none"></div>
            </div>

            {/* Pro Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-primary-500 rounded-[48px] text-white flex flex-col justify-between group active:scale-95 transition-transform cursor-pointer shadow-2xl shadow-primary-500/20">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h5 className="text-2xl font-black italic uppercase tracking-tighter">
                    Investimento por Pessoa
                  </h5>
                  <p className="text-sm font-bold text-white/80 leading-relaxed italic">
                    Considerando todos os custos fixos e variáveis, cada pessoa
                    representa um investimento de{" "}
                    <span className="text-black bg-white px-2 py-0.5 rounded ml-1">
                      R${" "}
                      {(headcount > 0
                        ? totalCost / headcount
                        : 0
                      ).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                    </span>
                    .
                  </p>
                </div>
                <div className="mt-8 flex justify-end">
                  <svg
                    className="w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>
              </div>

              <div className="bg-[#141417] p-8 rounded-[48px] border border-white/10 flex flex-col justify-between">
                <div>
                  <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">
                    Métrica de Escalabilidade
                  </h5>
                  <p className="text-3xl font-black tracking-tighter italic mb-4">
                    COST PER HEAD
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-black text-white">
                      R${" "}
                      {(headcount > 0
                        ? totalCost / headcount
                        : 0
                      ).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase">
                      / pessoa
                    </span>
                  </div>
                </div>
                <div className="mt-6 flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full ${i <= 3 ? "bg-primary-500" : "bg-white/10"}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />

      <style jsx global>{`
        @keyframes ease-out-expo {
          from {
            width: 0;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
