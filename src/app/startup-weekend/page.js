"use client";

import Image from "next/image";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendHero from "@/components/startup-weekend/StartupWeekendHero";
import StartupWeekendInfoSection from "@/components/startup-weekend/StartupWeekendInfoSection";
import StartupWeekendProfilesSection from "@/components/startup-weekend/StartupWeekendProfilesSection";
import StartupWeekendStatsSection from "@/components/startup-weekend/StartupWeekendStatsSection";
import WhatsAppCTA from "@/components/startup-weekend/WhatsAppCTA";
import { Faq } from "@/components/Faq";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

export default function StartupWeekendPage() {
  return (
    <main className="min-h-screen">
      <StartupWeekendHero />

      <StartupWeekendInfoSection />

      <StartupWeekendProfilesSection />

      <StartupWeekendStatsSection />

      <WhatsAppCTA />

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
            inscrições abertas
          </p>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-xl rounded-lg shadow-lg shadow-techstars-green/20 transition-all duration-300 transform hover:scale-105"
          >
            Fazer minha inscrição
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

      {/* Sponsors / Support - white logos on dark background */}
      <section className="py-24 px-6 bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Apoio
            </h2>
            <p className="text-xl text-zinc-400">
              Empresas e instituições que apoiam o evento
            </p>
          </div>

          {/* Global Partners - bigger section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-10 text-center tracking-tight">
              Patrocinadores Globais
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-14 min-h-[140px]">
              <a
                href="https://www.hsbcinnovationbanking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/HSBC-InnovationBanking-Logo-MONO-REV.png"
                  alt="HSBC Innovation Banking"
                  width={180}
                  height={56}
                  className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href="https://brex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/Brex White Logo.png"
                  alt="Brex"
                  width={160}
                  height={56}
                  className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href="https://startup.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/GoogleForStartups_Horizontal_W (1).png"
                  alt="Google for Startups"
                  width={200}
                  height={75}
                  className="h-14 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href="https://mercury.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/mercury-logo-wordmark-horizontal_mono white.png"
                  alt="Mercury"
                  width={160}
                  height={56}
                  className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
              <a
                href="https://www.deel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Image
                  src="/images/perks-deel-450x200-white.png"
                  alt="Deel"
                  width={200}
                  height={88}
                  className="h-14 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
          </div>

          {/* Local Partners */}
          <div className="w-full flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-8 text-center tracking-tight">
              Patrocinadores Locais
            </h3>
            <div className="flex justify-center w-full">
              <div className="inline-flex items-center justify-center gap-12 min-h-[100px]">
                <a
                  href="https://8020digital.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Image
                    src="/images/8020digital.png"
                    alt="8020 digital"
                    width={360}
                    height={144}
                    className="h-48 md:h-60 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </a>
                <a
                  href="https://flsoftwaresolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <Image
                    src="/images/flsoftwaresolutions.png"
                    alt="F&L Solutions"
                    width={360}
                    height={144}
                    className="h-56 md:h-72 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
