"use client";

export default function TeamCard({ team, onJoin, isLoading, currentUserId }) {
  const lead = team.lead;
  const members = team.members || [];
  const isAlreadyMember = members.some((m) => m.id === currentUserId) || lead?.id === currentUserId;

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_#000] transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-black text-black uppercase tracking-tight truncate">
            {team.name}
          </h3>
          {lead && (
            <p className="text-gray-600 font-bold text-sm mt-1">
              Líder: {lead.name || lead.username}
            </p>
          )}
          <p className="text-gray-500 font-bold text-sm mt-1">
            {members.length} {members.length === 1 ? "membro" : "membros"}
          </p>
        </div>

        <button
          onClick={() => onJoin(team)}
          disabled={isLoading || isAlreadyMember}
          className={
            isAlreadyMember
              ? "border-4 border-gray-300 bg-gray-100 text-gray-400 px-5 py-2 font-black uppercase text-sm cursor-not-allowed"
              : "brutal-btn px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          }
        >
          {isAlreadyMember ? "JÁ ENTROU" : "ENTRAR"}
        </button>
      </div>
    </div>
  );
}
