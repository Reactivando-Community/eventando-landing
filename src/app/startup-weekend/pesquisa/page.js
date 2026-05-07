"use client";

import Link from "next/link";
import EventFeedbackForm from "@/components/startup-weekend/EventFeedbackForm";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

export default function PesquisaPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f0]">
      {/* Hero */}
      <section className="relative bg-black text-white border-b-4 border-black overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24">
          <Link
            href="/startup-weekend"
            className="inline-block text-techstars-green font-black uppercase text-sm tracking-widest mb-6 hover:underline"
          >
            ← VOLTAR
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none mb-4">
            Pesquisa de
            <br />
            <span className="text-techstars-green">Feedback</span>
          </h1>
          <p className="text-white/80 font-bold text-base md:text-lg max-w-2xl">
            Sua opinião desenha o próximo Startup Weekend Anápolis. Leva uns 5 minutos.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <EventFeedbackForm />
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
