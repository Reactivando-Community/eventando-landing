"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import hubCommunity from "@/network/hub-community";
import EventFeedbackAnalytics from "@/components/startup-weekend/EventFeedbackAnalytics";

const allowedEmails = () =>
  (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

const isAllowed = (email) => {
  if (!email) return false;
  const allow = allowedEmails();
  if (!allow.length) return true; // if not configured, allow all logged-in users
  return allow.includes(email.toLowerCase());
};

export default function PesquisaAdminPage() {
  const { user, token, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [responses, setResponses] = useState(null);
  const [error, setError] = useState("");
  const [authorized, setAuthorized] = useState(null); // null = checking, true/false = decided

  // Auth gate
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push("/?login=true");
      return;
    }
    setAuthorized(isAllowed(user?.email));
  }, [authLoading, isAuthenticated, user, router]);

  // Fetch data
  useEffect(() => {
    if (!authorized || !token) return;
    let cancelled = false;
    hubCommunity.eventFeedback
      .getAll(token)
      .then((res) => {
        if (cancelled) return;
        const data = res.data?.data || [];
        // Strapi v5 returns flat fields directly on each entry; meals is populated array
        setResponses(data);
      })
      .catch((err) => {
        if (cancelled) return;
        const status = err.response?.status;
        if (status === 401 || status === 403) {
          setError("Sem permissão. Confira seu papel na conta Strapi (Organizer).");
        } else {
          setError("Não foi possível carregar as respostas.");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [authorized, token]);

  if (authLoading || authorized === null) {
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

  if (authorized === false) {
    return (
      <div className="min-h-screen bg-[#f4f4f0] flex items-center justify-center px-4">
        <div className="brutal-card bg-yellow-300 p-10 max-w-lg text-center">
          <h1 className="text-3xl font-black uppercase tracking-tighter mb-3">
            Acesso restrito
          </h1>
          <p className="font-bold text-sm mb-6">
            Esta página é exclusiva para organizadores. Entre em contato se acredita que deveria ter acesso.
          </p>
          <Link href="/startup-weekend" className="brutal-btn-white inline-block px-6 py-3 text-sm">
            Voltar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f4f4f0]">
      <header className="bg-black text-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12">
          <Link
            href="/startup-weekend"
            className="inline-block text-techstars-green font-black uppercase text-xs tracking-widest mb-4 hover:underline"
          >
            ← VOLTAR
          </Link>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                Analytics da Pesquisa
              </h1>
              <p className="text-white/70 font-bold mt-2">
                Respostas agregadas do feedback pós-evento.
              </p>
            </div>
            <Link
              href="/startup-weekend/pesquisa"
              className="brutal-btn-yellow inline-block px-5 py-3 text-xs self-start"
            >
              Ver formulário
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-14">
        {error && (
          <div className="bg-red-500 border-4 border-black text-white p-4 shadow-[6px_6px_0_#000] font-black uppercase tracking-widest text-sm text-center mb-8">
            {error}
          </div>
        )}

        {responses === null && !error && (
          <div className="brutal-card bg-white p-10 text-center">
            <p className="font-black uppercase tracking-widest animate-pulse">
              Carregando respostas...
            </p>
          </div>
        )}

        {responses !== null && <EventFeedbackAnalytics responses={responses} />}
      </section>
    </main>
  );
}
