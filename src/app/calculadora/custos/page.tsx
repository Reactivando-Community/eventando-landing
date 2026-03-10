"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import NewFooter from "@/components/NewFooter";

interface CostItem {
  id: string;
  name: string;
  value: number;
}

export default function CustosPage() {
  // Headcount State
  const [participants, setParticipants] = useState<number | "">(100);
  const [fixedStaff, setFixedStaff] = useState<number | "">(20);
  const [mentorsPerTeam, setMentorsPerTeam] = useState<number | "">(1);
  const [participantsPerTeam, setParticipantsPerTeam] = useState<number | "">(
    7.5,
  );

  // Dynamic Lists State
  const [fixedItems, setFixedItems] = useState<CostItem[]>([
    { id: "1", name: "Local do Evento", value: 5000 },
    { id: "2", name: "Som e Iluminação", value: 3500 },
    { id: "3", name: "Marketing e Tráfego", value: 2500 },
    { id: "4", name: "Limpeza e Segurança", value: 1500 },
  ]);

  const [variableItems, setVariableItems] = useState<CostItem[]>([
    { id: "v1", name: "Catering (3 dias)", value: 120 },
    { id: "v2", name: "Kit Participante (Camisa, Crachá, Caneca)", value: 45 },
    { id: "v3", name: "Seguro Evento", value: 10 },
  ]);

  // Normalizing variables for calculations
  const nParticipants = typeof participants === "number" ? participants : 0;
  const nFixedStaff = typeof fixedStaff === "number" ? fixedStaff : 0;
  const nMentorsPerTeam =
    typeof mentorsPerTeam === "number" ? mentorsPerTeam : 0;
  const nParticipantsPerTeam =
    typeof participantsPerTeam === "number" ? participantsPerTeam || 7.5 : 7.5;

  // Calculo de Equipes e Mentores
  const teams = Math.ceil(nParticipants / nParticipantsPerTeam);
  const mentors = teams * nMentorsPerTeam;
  const totalHeadcount = nParticipants + nFixedStaff + mentors;

  // Totals
  const totalFixed = fixedItems.reduce(
    (acc, item) => acc + (item.value || 0),
    0,
  );
  const variableCostPerPerson = variableItems.reduce(
    (acc, item) => acc + (item.value || 0),
    0,
  );
  const totalVariable = variableCostPerPerson * totalHeadcount;
  const totalEventCost = totalFixed + totalVariable;
  const costPerParticipant =
    nParticipants > 0 ? totalEventCost / nParticipants : 0;

  // Handlers for dynamic lists
  const addFixedItem = () => {
    setFixedItems([
      ...fixedItems,
      { id: Date.now().toString(), name: "Novo Item", value: 0 },
    ]);
  };

  const removeFixedItem = (id: string) => {
    setFixedItems(fixedItems.filter((item) => item.id !== id));
  };

  const updateFixedItem = (id: string, field: "name" | "value", val: any) => {
    setFixedItems(
      fixedItems.map((item) =>
        item.id === id ? { ...item, [field]: val } : item,
      ),
    );
  };

  // Budget Persistence State
  const [budgetTitle, setBudgetTitle] = useState("");
  const [activeBudgetId, setActiveBudgetId] = useState<string | null>(null);
  const [savedBudgets, setSavedBudgets] = useState<any[]>([]);

  // Load budgets on mount
  useEffect(() => {
    const saved = localStorage.getItem("sw_budgets");
    if (saved) setSavedBudgets(JSON.parse(saved));
  }, []);

  const saveCurrentBudget = () => {
    if (!budgetTitle) {
      alert("Dê um nome ao seu orçamento!");
      return;
    }

    const budgetData = {
      participants,
      fixedStaff,
      mentorsPerTeam,
      participantsPerTeam,
      fixedItems,
      variableItems,
    };

    if (activeBudgetId) {
      // Update existing
      const updated = savedBudgets.map((b) =>
        b.id === activeBudgetId
          ? {
              ...b,
              name: budgetTitle,
              data: budgetData,
              date: new Date().toLocaleDateString("pt-BR"),
            }
          : b,
      );
      setSavedBudgets(updated);
      localStorage.setItem("sw_budgets", JSON.stringify(updated));
    } else {
      // Create new
      const newBudget = {
        id: Date.now().toString(),
        name: budgetTitle,
        date: new Date().toLocaleDateString("pt-BR"),
        data: budgetData,
      };
      const updated = [...savedBudgets, newBudget];
      setSavedBudgets(updated);
      localStorage.setItem("sw_budgets", JSON.stringify(updated));
      setActiveBudgetId(newBudget.id);
    }
  };

  const startNewBudget = () => {
    setActiveBudgetId(null);
    setBudgetTitle("");
    // Optionally reset state to defaults
    setParticipants(100);
    setFixedStaff(20);
    setMentorsPerTeam(1);
    setParticipantsPerTeam(7.5);
    setFixedItems([
      { id: "1", name: "Local do Evento", value: 5000 },
      { id: "2", name: "Som e Iluminação", value: 3500 },
      { id: "3", name: "Marketing e Tráfego", value: 2500 },
      { id: "4", name: "Limpeza e Segurança", value: 1500 },
    ]);
    setVariableItems([
      { id: "v1", name: "Catering (3 dias)", value: 120 },
      {
        id: "v2",
        name: "Kit Participante (Camisa, Crachá, Caneca)",
        value: 45,
      },
      { id: "v3", name: "Seguro Evento", value: 10 },
    ]);
  };

  const loadBudget = (id: string) => {
    const budget = savedBudgets.find((b) => b.id === id);
    if (budget) {
      setActiveBudgetId(budget.id);
      setBudgetTitle(budget.name);
      setParticipants(budget.data.participants);
      setFixedStaff(budget.data.fixedStaff);
      setMentorsPerTeam(budget.data.mentorsPerTeam);
      setParticipantsPerTeam(budget.data.participantsPerTeam || 7.5);
      setFixedItems(budget.data.fixedItems);
      setVariableItems(budget.data.variableItems);
    }
  };

  const deleteBudget = (id: string) => {
    const updated = savedBudgets.filter((b) => b.id !== id);
    setSavedBudgets(updated);
    localStorage.setItem("sw_budgets", JSON.stringify(updated));
    if (activeBudgetId === id) {
      setActiveBudgetId(null);
      setBudgetTitle("");
    }
  };

  const addVariableItem = () => {
    setVariableItems([
      ...variableItems,
      { id: Date.now().toString(), name: "Novo Item", value: 0 },
    ]);
  };

  const removeVariableItem = (id: string) => {
    setVariableItems(variableItems.filter((item) => item.id !== id));
  };

  const updateVariableItem = (
    id: string,
    field: "name" | "value",
    val: any,
  ) => {
    setVariableItems(
      variableItems.map((item) =>
        item.id === id ? { ...item, [field]: val } : item,
      ),
    );
  };

  const exportToJSON = () => {
    const budgetData = {
      name: budgetTitle || "Orcamento_Evento",
      date: new Date().toLocaleDateString("pt-BR"),
      data: {
        participants,
        fixedStaff,
        mentorsPerTeam,
        participantsPerTeam,
        fixedItems,
        variableItems,
      },
    };
    const blob = new Blob([JSON.stringify(budgetData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${budgetData.name.toLowerCase().replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (json.data) {
          setBudgetTitle(json.name || "Orcamento Importado");
          setParticipants(json.data.participants);
          setFixedStaff(json.data.fixedStaff);
          setMentorsPerTeam(json.data.mentorsPerTeam);
          setParticipantsPerTeam(json.data.participantsPerTeam || 7.5);
          setFixedItems(json.data.fixedItems);
          setVariableItems(json.data.variableItems);
          setActiveBudgetId(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } catch (err) {
        alert(
          "Erro ao ler o arquivo JSON. Certifique-se de que é um formato válido.",
        );
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

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

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-gray-100 font-sans">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-50 bg-[#0A0A0B]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/calculadora"
              className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 hover:bg-white/10 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <div>
              <h1 className="text-sm font-black italic uppercase tracking-widest text-white">
                Engenharia de Custos
              </h1>
              <p className="text-[10px] font-bold text-gray-500 uppercase">
                Detalhamento Financeiro
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black text-gray-500 uppercase block">
              Custo Bruto p/ Participante
            </span>
            <span className="text-2xl font-black text-primary-500 italic tracking-tighter">
              {costPerParticipant.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Headcount & Parameters */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-[#141417] p-8 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden">
              <h3 className="text-xl font-black italic uppercase text-white mb-8">
                Público & Headcount
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-gray-500 uppercase block mb-2">
                    Participantes (Pagantes)
                  </label>
                  <input
                    type="number"
                    value={participants}
                    onChange={(e) =>
                      setParticipants(
                        e.target.value === "" ? "" : parseInt(e.target.value),
                      )
                    }
                    className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 font-black text-xl focus:border-primary-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-2">
                      Org. Fixa
                    </label>
                    <input
                      type="number"
                      value={fixedStaff}
                      onChange={(e) =>
                        setFixedStaff(
                          e.target.value === "" ? "" : parseInt(e.target.value),
                        )
                      }
                      className="w-full bg-white/5 p-3 rounded-2xl border border-white/5 font-bold text-lg focus:border-primary-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-500 uppercase block mb-2">
                      Mentores / Equipe
                    </label>
                    <input
                      type="number"
                      value={mentorsPerTeam}
                      onChange={(e) =>
                        setMentorsPerTeam(
                          e.target.value === "" ? "" : parseInt(e.target.value),
                        )
                      }
                      className="w-full bg-white/5 p-3 rounded-2xl border border-white/5 font-bold text-lg focus:border-primary-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-bold uppercase">
                      Estimativa de Equipes
                    </span>
                    <span className="text-white font-black">{teams}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 font-bold uppercase">
                      Total de Mentores
                    </span>
                    <span className="text-white font-black">{mentors}</span>
                  </div>
                  <div className="flex justify-between items-center bg-primary-500/10 p-4 rounded-2xl">
                    <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">
                      Headcount Total
                    </span>
                    <span className="text-2xl font-black text-white italic tracking-tighter">
                      {totalHeadcount}
                    </span>
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase text-center font-bold">
                    Total de pessoas que consumirão infra (comida/espaço)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-primary-500 rounded-[40px] p-8 text-white shadow-2xl">
              <h4 className="text-xl font-black italic uppercase mb-2">
                Resumo OPEX
              </h4>
              <p className="text-sm font-bold text-white/70 mb-8 italic leading-relaxed">
                Considerando gastos fixos e variáveis por cabeça.
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-[10px] font-black uppercase">
                    Custo Fixo Total
                  </span>
                  <span className="text-xl font-black tracking-tighter">
                    {totalFixed.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <span className="text-[10px] font-black uppercase">
                    Variável Total ({totalHeadcount} pessoas)
                  </span>
                  <span className="text-xl font-black tracking-tighter">
                    {totalVariable.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
                <div className="pt-4 flex justify-between items-end">
                  <span className="text-[10px] font-black uppercase">
                    Total do Evento
                  </span>
                  <span className="text-3xl font-black tracking-tighter italic">
                    {totalEventCost.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#141417] p-8 rounded-[40px] border border-white/5 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-black italic uppercase text-white">
                  Meus Orçamentos
                </h4>
                {activeBudgetId && (
                  <button
                    onClick={startNewBudget}
                    className="text-[9px] font-black uppercase text-primary-500 hover:text-primary-400 underline underline-offset-4"
                  >
                    Novo Orçamento
                  </button>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <input
                  type="text"
                  placeholder="Nome do orçamento..."
                  value={budgetTitle}
                  onChange={(e) => setBudgetTitle(e.target.value)}
                  className="w-full bg-white/5 p-4 rounded-2xl border border-white/5 font-bold outline-none focus:border-white/20"
                />
                <button
                  onClick={saveCurrentBudget}
                  className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors"
                >
                  {activeBudgetId ? "Salvar Alterações" : "Salvar Orçamento"}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={exportToJSON}
                    className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Exportar
                  </button>
                  <label className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest py-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    Importar
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {savedBudgets.map((budget) => (
                  <div
                    key={budget.id}
                    className={`group flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                      activeBudgetId === budget.id
                        ? "bg-primary-500/10 border-primary-500/50"
                        : "bg-white/5 border-white/5 hover:border-white/10"
                    }`}
                    onClick={() => loadBudget(budget.id)}
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-xs font-black uppercase truncate text-white">
                        {budget.name}
                      </p>
                      <p className="text-[10px] font-bold text-gray-500">
                        {budget.date}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteBudget(budget.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-500 hover:text-primary-500 transition-all"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                {savedBudgets.length === 0 && (
                  <p className="text-[10px] font-bold text-gray-600 text-center py-4 uppercase">
                    Nenhum orçamento salvo
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Lists */}
          <div className="xl:col-span-8 space-y-8 animate-fade-in">
            {/* Custo Fixo Section */}
            <div className="bg-[#141417] p-8 rounded-[48px] border border-white/5">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black italic uppercase text-white">
                    Custos Fixos
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                    Independem do número de pessoas
                  </p>
                </div>
                <button
                  onClick={addFixedItem}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  + Adicionar Item
                </button>
              </div>

              <div className="space-y-4">
                {fixedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white/[0.02] p-2 pl-6 rounded-3xl border border-white/5 group hover:border-white/10 transition-colors"
                  >
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        updateFixedItem(item.id, "name", e.target.value)
                      }
                      className="flex-1 bg-transparent border-none outline-none font-bold text-gray-300 focus:text-white"
                    />
                    <div className="relative w-48">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">
                        R$
                      </span>
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) =>
                          updateFixedItem(
                            item.id,
                            "value",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-white/5 py-4 pl-12 pr-4 rounded-2xl border border-white/5 font-black text-right focus:border-white/20 outline-none"
                      />
                    </div>
                    <button
                      onClick={() => removeFixedItem(item.id)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custo Variável Section */}
            <div className="bg-[#141417] p-8 rounded-[48px] border border-white/5">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-2xl font-black italic uppercase text-white">
                    Custos Variáveis (Individual)
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
                    Custo por cabeça / kit / alimentação
                  </p>
                </div>
                <button
                  onClick={addVariableItem}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest transition-all"
                >
                  + Adicionar Item
                </button>
              </div>

              <div className="space-y-4">
                {variableItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-white/[0.02] p-2 pl-6 rounded-3xl border border-white/5 group hover:border-white/10 transition-colors"
                  >
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        updateVariableItem(item.id, "name", e.target.value)
                      }
                      className="flex-1 bg-transparent border-none outline-none font-bold text-gray-300 focus:text-white"
                    />
                    <div className="relative w-48">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">
                        R$
                      </span>
                      <input
                        type="number"
                        value={item.value}
                        onChange={(e) =>
                          updateVariableItem(
                            item.id,
                            "value",
                            parseInt(e.target.value) || 0,
                          )
                        }
                        className="w-full bg-white/5 py-4 pl-12 pr-4 rounded-2xl border border-white/5 font-black text-right focus:border-white/20 outline-none"
                      />
                    </div>
                    <button
                      onClick={() => removeVariableItem(item.id)}
                      className="w-12 h-12 flex items-center justify-center text-gray-600 hover:text-primary-500 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}

                {variableItems.length === 0 && (
                  <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-[40px]">
                    <p className="text-gray-600 font-black uppercase tracking-widest italic">
                      Nenhum custo variável listado
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Strategic Comparison */}
            <div className="bg-[#141417] p-10 rounded-[48px] border border-white/5 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="space-y-4">
                  <span className="text-[10px] font-black text-primary-500 uppercase tracking-[0.3em]">
                    Custo por Participante
                  </span>
                  <h5 className="text-4xl font-black italic tracking-tighter text-white">
                    {costPerParticipant.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                      maximumFractionDigits: 0,
                    })}
                  </h5>

                  <p className="text-sm font-bold text-gray-500 leading-relaxed italic">
                    Este é o custo unitário bruto considerando toda a
                    infraestrutura e logística dividida pelos {nParticipants}{" "}
                    pagantes.
                  </p>
                </div>
                <div className="bg-white/5 rounded-[32px] p-8 flex flex-col justify-center border border-white/5">
                  <span className="text-[10px] font-black text-gray-500 uppercase block mb-4">
                    Eficiência de Headcount
                  </span>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-black italic">
                        {((nParticipants / totalHeadcount) * 100).toFixed(1)}%
                      </p>
                      <p className="text-[10px] font-bold text-gray-600">
                        PAGANTES / TOTAL
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-black italic">
                        {((totalVariable / totalEventCost) * 100).toFixed(1)}%
                      </p>
                      <p className="text-[10px] font-bold text-gray-600">
                        VARIAVEL / TOTAL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute right-[-10%] bottom-[-10%] w-64 h-64 bg-primary-500 opacity-[0.03] blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </main>

      <NewFooter />
    </div>
  );
}
