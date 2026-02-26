"use client";

import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendHero from "@/components/startup-weekend/StartupWeekendHero";
import StartupWeekendInfoSection from "@/components/startup-weekend/StartupWeekendInfoSection";
import StartupWeekendStatsSection from "@/components/startup-weekend/StartupWeekendStatsSection";
import { Faq } from "@/components/Faq";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

export default function StartupWeekendPage() {
  return (
    <main className="min-h-screen">
      <StartupWeekendHero />

      <StartupWeekendInfoSection />

      <StartupWeekendStatsSection />

      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-gray-600 dark:text-techstars-slate">
            Tire suas dúvidas sobre o Techstars Startup Weekend Anápolis.
          </p>
        </div>
        <Faq />
      </section>

      {/* Registration CTA Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight">
            Garanta sua vaga
          </h2>
          <p className="text-xl text-gray-600 dark:text-techstars-slate mb-10">
            inscrições em breve
          </p>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-xl rounded-lg shadow-lg shadow-techstars-green/20 transition-all duration-300 transform hover:scale-105"
          >
            Pré Venda
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </section>

      {/* Sponsors / Support - placeholder */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 tracking-tight">
              Apoio
            </h2>
            <p className="text-xl text-gray-600 dark:text-techstars-slate">
              Empresas e instituições que apoiam o empreendedorismo na região
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 min-h-[120px]">
            {/* Add sponsor logos here - placeholder for now */}
            <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
              Em breve: parceiros e apoiadores
            </p>
          </div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
