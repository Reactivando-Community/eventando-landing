"use client";

import Image from "next/image";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendHero from "@/components/startup-weekend/StartupWeekendHero";
import StartupWeekendInfoSection from "@/components/startup-weekend/StartupWeekendInfoSection";
import StartupWeekendProfilesSection from "@/components/startup-weekend/StartupWeekendProfilesSection";
import StartupWeekendTeasers from "@/components/startup-weekend/StartupWeekendTeasers";
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

      <StartupWeekendTeasers />

      <StartupWeekendStatsSection />

      <WhatsAppCTA />

      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4 tracking-tight">
            Perguntas frequentes
          </h2>
          <p className="text-lg text-gray-600 dark:text-techstars-slate mb-8">
            Tire suas dúvidas sobre o Techstars Startup Weekend Anápolis.
          </p>
          <a
            href={eventConfig.whatsappContact}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-white/10 dark:bg-zinc-900 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
          >
            <svg
              className="w-5 h-5 mr-2 text-techstars-green"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
            Tirar dúvida no WhatsApp
          </a>
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
