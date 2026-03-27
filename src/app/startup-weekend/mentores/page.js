"use client";

import ComingSoonSection from "@/components/startup-weekend/ComingSoonSection";
import WhatsAppCTA from "@/components/startup-weekend/WhatsAppCTA";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import Link from "next/link";

export default function MentorsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Simple Header */}
      <nav className="py-6 px-6 border-b border-gray-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/startup-weekend"
            className="text-xl font-black text-black dark:text-white"
          >
            techstars_ Startup Weekend Anápolis
          </Link>
          <Link
            href="/startup-weekend"
            className="text-techstars-green hover:underline font-bold"
          >
            ← Voltar
          </Link>
        </div>
      </nav>

      <ComingSoonSection
        pageTitle="Conheça Nossos Mentores"
        title="Grandes nomes do mercado estão chegando!"
        subtitle="Estamos selecionando a dedo os melhores profissionais e especialistas para guiar a sua equipe durante as 54 horas. Fique ligado para descobrir quem serão os seus mentores."
      />

      <WhatsAppCTA />

      <StartupWeekendFooter />
    </main>
  );
}
