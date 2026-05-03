"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import hubCommunity from "@/network/hub-community";
import hubCommunityApi from "@/network/hub-community/api";
import TeamCard from "./TeamCard";

export default function TeamSection() {
  const { user, token, refreshUser } = useAuth();
  const [view, setView] = useState("options"); // options | create | browse
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const [fullTeam, setFullTeam] = useState(null);
  const userTeamRef = user?.team;

  // Fetch full team data (with lead/members populated) when user has a team
  const fetchFullTeam = async () => {
    if (!userTeamRef) {
      setFullTeam(null);
      return;
    }
    try {
      if (userTeamRef.documentId) {
        const res = await hubCommunity.team.get(token, userTeamRef.documentId);
        setFullTeam(res.data?.data || null);
      } else {
        // Fallback: /users/me may not return documentId on the team relation
        const res = await hubCommunity.team.list(token);
        const match = (res.data?.data || []).find((t) => t.id === userTeamRef.id);
        setFullTeam(match || null);
      }
    } catch {
      setFullTeam(null);
    }
  };

  useEffect(() => {
    fetchFullTeam();
  }, [userTeamRef?.documentId, userTeamRef?.id]);

  const userTeam = fullTeam || userTeamRef;

  const fetchTeams = async () => {
    try {
      const res = await hubCommunity.team.list(token);
      setTeams(res.data?.data || []);
    } catch {
      setError("Erro ao carregar times.");
    }
  };

  useEffect(() => {
    if (view === "browse") {
      fetchTeams();
    }
  }, [view]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    setError("");

    if (!teamName.trim()) {
      setError("Digite o nome do time.");
      return;
    }

    setIsLoading(true);
    try {
      // Create team (backend auto-sets logged user as lead)
      const res = await hubCommunity.team.create(token, {
        name: teamName.trim(),
        eventId: process.env.NEXT_PUBLIC_EVENT_DOCUMENT_ID || undefined,
      });
      const newTeam = res.data?.data;

      // Join the team (update user's team relation)
      await hubCommunityApi.put(
        `/users/${user.id}`,
        { team: newTeam.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await refreshUser();
      setTeamName("");
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Erro ao criar time.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async (team) => {
    setError("");
    setIsLoading(true);
    try {
      await hubCommunityApi.put(
        `/users/${user.id}`,
        { team: team.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await refreshUser();
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Erro ao entrar no time.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeaveTeam = async () => {
    setError("");
    setIsLoading(true);
    try {
      await hubCommunity.team.leave(token, userTeam?.documentId);
      await refreshUser();
      setFullTeam(null);
      setView("options");
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Erro ao sair do time.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeLead = async (newLeadId) => {
    setError("");
    setIsLoading(true);
    try {
      await hubCommunity.team.changeLead(token, userTeam?.documentId, newLeadId);
      await refreshUser();
      await fetchFullTeam();
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Erro ao transferir liderança.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadPresentation = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("A apresentação deve ser um arquivo PDF.");
      return;
    }

    setError("");
    setIsUploading(true);
    setUploadProgress(0);

    try {
      await hubCommunity.team.uploadPresentation(
        token,
        userTeam.documentId,
        file,
        (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      );
      await fetchFullTeam();
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Erro ao enviar a apresentação.";
      setError(message);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      e.target.value = ""; // Reset input
    }
  };

  // ── User already has a team ──
  if (userTeam) {
    const members = userTeam.members || [];
    const lead = userTeam.lead;
    const isCurrentUserLead = lead?.id === user?.id;

    return (
      <div className="space-y-6">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#39C463]">
          <div className="border-b-4 border-black pb-4 mb-6">
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter">
              {userTeam.name}
            </h2>
            {lead && (
              <p className="text-gray-600 font-bold mt-1">
                Líder: {lead.name || lead.username}
              </p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-black font-black uppercase text-sm mb-3">
              MEMBROS ({members.length})
            </h3>
            {members.length > 0 ? (
              <div className="space-y-2">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center gap-3 bg-[#f4f4f0] border-2 border-black px-4 py-2"
                  >
                    <div className="w-8 h-8 bg-techstars-green border-2 border-black flex items-center justify-center font-black text-black text-sm">
                      {(member.name || member.username || "?")[0].toUpperCase()}
                    </div>
                    <span className="font-bold text-black">
                      {member.name || member.username}
                    </span>
                    {member.id === lead?.id ? (
                      <span className="ml-auto bg-yellow-400 border-2 border-black px-2 py-0.5 text-xs font-black uppercase">
                        LÍDER
                      </span>
                    ) : isCurrentUserLead && (
                      <button
                        onClick={() => handleChangeLead(member.id)}
                        disabled={isLoading}
                        className="ml-auto border-2 border-black bg-white text-black px-2 py-0.5 text-xs font-black uppercase hover:bg-yellow-400 transition-colors disabled:opacity-50"
                      >
                        TORNAR LÍDER
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 font-bold text-sm">
                Nenhum membro ainda.
              </p>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-black font-black uppercase text-sm mb-3">
              APRESENTAÇÃO (PDF)
            </h3>
            {userTeam.presentation ? (
              <div className="bg-[#f4f4f0] border-2 border-black p-4 mb-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-black block mb-1">
                    Arquivo enviado com sucesso! 🎉
                  </span>
                  <span className="text-gray-600 text-sm font-bold">
                    Se precisar reenviar, fale com a organização para liberar o envio novamente.
                  </span>
                </div>
              </div>
            ) : (
              <div className="bg-[#f4f4f0] border-2 border-black p-4 mb-3 border-dashed">
                <label className="cursor-pointer flex flex-col items-center justify-center p-4">
                  <span className="text-3xl mb-2">📄</span>
                  <span className="font-bold text-black uppercase text-sm mb-2 text-center">
                    Nenhuma apresentação enviada
                  </span>
                  <span className="brutal-btn-white px-4 py-2 text-xs border-2 border-black bg-white hover:bg-yellow-400 font-black uppercase">
                    {isUploading ? "ENVIANDO..." : "ENVIAR PDF"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleUploadPresentation}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            )}
            
            {isUploading && (
              <div className="w-full bg-gray-200 border-2 border-black h-4 mt-2">
                <div
                  className="bg-techstars-green h-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-100 border-4 border-red-600 text-red-800 px-4 py-3 font-bold text-sm mb-4">
              {error}
            </div>
          )}

          <button
            onClick={handleLeaveTeam}
            disabled={isLoading}
            className="brutal-btn-white px-6 py-3 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "SAINDO..." : "SAIR DO TIME"}
          </button>
        </div>
      </div>
    );
  }

  // ── Browse teams view ──
  if (view === "browse") {
    const filteredTeams = teams.filter((t) =>
      t.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("options")}
          className="text-white font-black uppercase text-sm underline underline-offset-4 decoration-techstars-green decoration-4 hover:text-techstars-green transition-colors"
        >
          ← VOLTAR
        </button>

        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar time por nome..."
            className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
          />
        </div>

        {error && (
          <div className="bg-red-100 border-4 border-red-600 text-red-800 px-4 py-3 font-bold text-sm">
            {error}
          </div>
        )}

        {filteredTeams.length > 0 ? (
          <div className="space-y-4">
            {filteredTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onJoin={handleJoinTeam}
                isLoading={isLoading}
                currentUserId={user?.id}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#f4f4f0] border-4 border-black p-8 text-center">
            <p className="text-black font-black uppercase text-lg">
              {teams.length === 0
                ? "NENHUM TIME ENCONTRADO"
                : "SEM RESULTADOS PARA A BUSCA"}
            </p>
            <p className="text-gray-600 font-bold text-sm mt-2">
              Que tal criar o seu próprio time?
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Create team view ──
  if (view === "create") {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setView("options")}
          className="text-white font-black uppercase text-sm underline underline-offset-4 decoration-techstars-green decoration-4 hover:text-techstars-green transition-colors"
        >
          ← VOLTAR
        </button>

        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#39C463]">
          <h2 className="text-2xl font-black text-black uppercase tracking-tighter mb-6 border-b-4 border-black pb-4">
            CRIAR TIME
          </h2>

          <form onSubmit={handleCreateTeam} className="space-y-5">
            <div>
              <label className="block text-black font-black uppercase text-sm mb-2">
                NOME DO TIME *
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Ex: Os Inovadores"
                className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-100 border-4 border-red-600 text-red-800 px-4 py-3 font-bold text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="brutal-btn w-full px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "CRIANDO..." : "CRIAR TIME →"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Default: options view ──
  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-100 border-4 border-red-600 text-red-800 px-4 py-3 font-bold text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => {
            setError("");
            setView("create");
          }}
          className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_#39C463] hover:-translate-y-2 hover:shadow-[10px_10px_0_#39C463] transition-all text-left group"
        >
          <div className="w-14 h-14 bg-techstars-green border-4 border-black flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
            <span className="text-2xl font-black text-black">+</span>
          </div>
          <h3 className="text-2xl font-black text-black uppercase tracking-tight">
            CRIAR UM TIME
          </h3>
          <p className="text-gray-600 font-bold text-sm mt-2">
            Monte seu time e lidere a inovação.
          </p>
        </button>

        <button
          onClick={() => {
            setError("");
            setView("browse");
          }}
          className="bg-white border-4 border-black p-8 shadow-[6px_6px_0_#000] hover:-translate-y-2 hover:shadow-[10px_10px_0_#000] transition-all text-left group"
        >
          <div className="w-14 h-14 bg-yellow-400 border-4 border-black flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
            <span className="text-2xl font-black text-black">→</span>
          </div>
          <h3 className="text-2xl font-black text-black uppercase tracking-tight">
            ENTRAR EM UM TIME
          </h3>
          <p className="text-gray-600 font-bold text-sm mt-2">
            Encontre um time e junte-se à equipe.
          </p>
        </button>
      </div>
    </div>
  );
}
