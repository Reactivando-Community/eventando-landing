"use client";

import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendHero from "@/components/startup-weekend/StartupWeekendHero";
import StartupWeekendInfoSection from "@/components/startup-weekend/StartupWeekendInfoSection";
import StartupWeekendStatsSection from "@/components/startup-weekend/StartupWeekendStatsSection";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

export default function StartupWeekendPage() {
  return (
    <main className="min-h-screen">
      <StartupWeekendHero />

      <StartupWeekendInfoSection />

      <StartupWeekendStatsSection />

      {/* Registration CTA Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Garanta sua vaga
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Vagas limitadas. Não espere para se juntar a outros empreendedores
            apaixonados e transformar ideias em realidade.
          </p>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Fazer inscrição
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
      <section className="py-20 px-6 bg-white dark:bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Apoio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Empresas e instituições que apoiam o empreendedorismo na região
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-12 min-h-[120px]">
            {/* Add sponsor logos here - placeholder for now */}
            <p className="text-gray-500 dark:text-gray-500 text-sm">
              Em breve: parceiros e apoiadores
            </p>
          </div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
