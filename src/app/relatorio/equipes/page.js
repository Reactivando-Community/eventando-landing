"use client";

import { useState, useEffect } from "react";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import Link from "next/link";
import hubCommunityApi from "@/network/hub-community/api";

export default function RelatorioEquipesPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedTeamId, setCopiedTeamId] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        const EVENT_DOCUMENT_ID = process.env.NEXT_PUBLIC_EVENT_DOCUMENT_ID;
        const params = {
          "populate[lead][fields][0]": "name",
          "populate[lead][fields][1]": "username",
          "populate[members][fields][0]": "name",
          "populate[members][fields][1]": "username",
          "pagination[pageSize]": 100,
        };
        if (EVENT_DOCUMENT_ID) {
          params["filters[event][documentId][$eq]"] = EVENT_DOCUMENT_ID;
        }

        const res = await hubCommunityApi.get("/teams", { params });
        setTeams(res.data.data);
      } catch (error) {
        console.error("Erro ao carregar equipes", error);
      } finally {
        setLoading(false);
      }
    }
    loadTeams();
  }, []);

  const handleCopyMembers = (team) => {
    const leadName = team.lead?.name || team.lead?.username || "";
    const membersNames = team.members?.map(m => m.name || m.username) || [];
    
    const allNames = Array.from(new Set([leadName, ...membersNames].filter(Boolean)));
    const textToCopy = allNames.join("\n");
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedTeamId(team.id);
    setTimeout(() => setCopiedTeamId(null), 2000);
  };

  return (
    <>
      <StartupWeekendSEO title="Relatório de Equipes - Startup Weekend" />
      
      <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-techstars-green selection:text-black relative overflow-x-hidden">
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
        <section className="relative py-24 px-6 bg-[#39C463] border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
          <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
            <div className="bg-black text-white text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-white inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
               EQUIPES FORMADAS
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-[4px_4px_0_#fff]">
              RELATÓRIO <br/>
              <span className="bg-black text-white px-4 inline-block transform rotate-1 mt-2">DE TIMES</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform -rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
              Lista completa de todos os times e seus respectivos membros.<br/>
              <span className="text-pink-600 block mt-2">{"//"} Copie os nomes facilmente para certificados e listas.</span>
            </p>
          </div>
        </section>

        {/* Teams List */}
        <section className="py-24 px-6 bg-black border-b-4 border-black relative z-0 min-h-[50vh]">
          <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative z-10">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0_#39C463] px-12 py-8">
                  <p className="text-black font-black uppercase text-xl animate-pulse">
                    CARREGANDO EQUIPES...
                  </p>
                </div>
              </div>
            ) : teams.length === 0 ? (
              <div className="flex justify-center py-20">
                <div className="bg-white border-4 border-black shadow-[8px_8px_0_#ff0000] px-12 py-8 text-center">
                  <p className="text-black font-black uppercase text-xl">
                    NENHUMA EQUIPE ENCONTRADA.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teams.map((team) => {
                  const leadName = team.lead?.name || team.lead?.username || "";
                  const membersNames = team.members?.map(m => m.name || m.username) || [];
                  const allNames = Array.from(new Set([leadName, ...membersNames].filter(Boolean)));
                  
                  return (
                    <div key={team.id} className="bg-white border-4 border-black flex flex-col shadow-[8px_8px_0_#39C463] hover:-translate-y-2 transition-transform hover:shadow-[12px_12px_0_#39C463]">
                      <div className="p-6 border-b-4 border-black bg-yellow-400">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-2xl font-black text-black uppercase tracking-tighter break-words">
                            {team.name || "Time Sem Nome"}
                          </h3>
                          {team.stage && (
                            <span className="bg-black text-white text-xs font-bold px-2 py-1 uppercase whitespace-nowrap">
                              {team.stage}
                            </span>
                          )}
                        </div>
                        <p className="text-black font-bold mt-2">
                          {allNames.length} {allNames.length === 1 ? 'membro' : 'membros'}
                        </p>
                      </div>
                      <div className="p-6 flex-grow bg-gray-50">
                        <ul className="space-y-2">
                          {allNames.map((name, index) => (
                            <li key={index} className="text-black font-bold flex items-center gap-2">
                              <span className="w-1.5 h-1.5 bg-techstars-green rounded-full inline-block"></span>
                              {name}
                            </li>
                          ))}
                          {allNames.length === 0 && (
                            <li className="text-gray-500 font-bold italic">Sem membros</li>
                          )}
                        </ul>
                      </div>
                      <div className="p-4 border-t-4 border-black bg-white">
                        <button
                          onClick={() => handleCopyMembers(team)}
                          className={`w-full font-black uppercase px-4 py-3 border-4 border-black transition-all ${
                            copiedTeamId === team.id
                              ? "bg-techstars-green text-black shadow-[4px_4px_0_#000]"
                              : "bg-black text-white hover:bg-techstars-green hover:text-black shadow-[4px_4px_0_#39C463]"
                          }`}
                        >
                          {copiedTeamId === team.id ? "COPIADO! ✓" : "COPIAR MEMBROS"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <StartupWeekendFooter />
      </main>
    </>
  );
}
