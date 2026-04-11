"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import TeamSection from "@/components/dashboard/TeamSection";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/?login=true");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0_#39C463] px-12 py-8">
          <p className="text-black font-black uppercase text-xl animate-pulse">
            CARREGANDO...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b-4 border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="/startup-weekend"
            className="text-white font-black uppercase text-sm hover:text-techstars-green transition-colors"
          >
            ← VOLTAR
          </a>
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-sm hidden sm:block">
              {user?.name || user?.username}
            </span>
            <button
              onClick={signOut}
              className="border-2 border-white/40 text-white font-black uppercase text-xs px-4 py-2 hover:bg-white hover:text-black transition-all"
            >
              SAIR
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            SEU TIME
          </h1>
          <p className="text-white/60 font-bold mt-2">
            Crie ou entre em um time para o Startup Weekend.
          </p>
        </div>

        <TeamSection />
      </main>
    </div>
  );
}
