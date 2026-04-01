import Image from "next/image";

import { eventConfig } from "@/data/startup-weekend-event";

// ==========================================
// LOTES — mesma config do PricingSection
// ==========================================
const LOTES = [
  { label: "1º LOTE", short: "Lote 1", endDate: new Date("2026-04-01T23:59:59-03:00"), soldOut: true },
  { label: "2º LOTE", short: "Lote 2", endDate: new Date("2026-04-15T23:59:59-03:00"), soldOut: false },
  { label: "3º LOTE", short: "Lote 3", endDate: new Date("2026-04-25T23:59:59-03:00"), soldOut: false },
];

function getActiveLot() {
  const now = new Date();
  for (let i = 0; i < LOTES.length; i++) {
    const lote = LOTES[i];
    if (lote.soldOut) continue;
    if (now > lote.endDate) continue;
    return { lot: lote, index: i };
  }
  return { lot: LOTES[LOTES.length - 1], index: LOTES.length - 1 };
}

function getEsgotadosText() {
  const esgotados = LOTES.filter((l, i) => l.soldOut || new Date() > l.endDate);
  if (esgotados.length === 0) return "";
  const names = esgotados.map((l) => l.short.toUpperCase()).join(" E ");
  const { lot } = getActiveLot();
  return `🔥 ${names} ESGOTADO — ${lot.short.toUpperCase()} ABERTO POR TEMPO LIMITADO — GARANTA SUA VAGA • `;
}

export default function StartupWeekendHero() {
  return (
    <section className="relative min-h-[100vh] flex flex-col bg-[#f4f4f0] overflow-hidden">
      {/* Top Warning Marquee */}
      <div className="w-full bg-black border-y-4 border-black py-2 overflow-hidden flex whitespace-nowrap z-20 relative brutal-shadow-sm">
        <div className="animate-marquee inline-flex items-center font-black text-white uppercase text-sm tracking-widest">
          {Array(6).fill(getEsgotadosText()).join("")}
        </div>
      </div>

      {/* Container - Split Layout */}
      <div className="flex flex-col lg:flex-row flex-1 relative z-10">

        {/* Left Panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-16 lg:py-24 border-b-4 lg:border-b-0 lg:border-r-4 border-black relative">
          <div className="absolute inset-0 dot-pattern opacity-50 z-0" />

          <div className="relative z-10 max-w-xl mx-auto lg:mx-0">
            {/* Badges */}
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black text-base sm:text-lg md:text-xl font-black uppercase brutal-shadow-md brutal-border hover:shadow-[6px_6px_0px_#000] transition-all transform rotate-1">
                🗓  {eventConfig.dateFull}
              </span>
            </div>

            {/* Logo text - Event Name */}
            <h1 className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[5.5rem] font-bold text-black leading-[1.05] tracking-[-0.04em] mb-8 font-sans text-left">
              <span className="lowercase">techstars_</span><br />
              <span className="whitespace-nowrap">Startup Weekend</span><br />
              <span className="text-[#0EA5E9]">Anápolis</span>
            </h1>

            {/* Tagline */}
            <p className="text-[15px] lg:text-[20px] text-black font-normal leading-[1.25] tracking-[-0.02em] mb-8 max-w-md bg-white p-4 brutal-border brutal-shadow-sm rotate-1 font-sans">
              Chega de só ter ideias. Entregamos ferramentas, contexto e mentores de peso. Valide seu projeto, nós ajudamos a acelerar. Experiencie a vida de startup em 54h.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <a
                href={eventConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brutal-btn flex items-center justify-center px-8 py-4 text-lg w-full sm:w-auto"
              >
                Garantir minha vaga
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#bolsa"
                className="brutal-btn-white flex items-center justify-center px-8 py-4 text-lg w-full sm:w-auto"
              >
                🔥 Quero a Bolsa 100%
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 relative bg-[#f4f4f0]">
          {/* Subtle noise and dots */}
          <div className="absolute inset-0 dot-pattern opacity-50 z-0" />

          <div className="relative z-10 w-full max-w-md">
            {/* The Image Card Background Decorations */}
            <div className="absolute inset-0 bg-techstars-green brutal-border rotate-[-6deg] translate-y-4 -translate-x-4 max-w-md" />
            <div className="absolute inset-0 bg-yellow-400 brutal-border rotate-[3deg] translate-y-2 translate-x-2 max-w-md" />
            <div className="absolute inset-0 bg-pink-500 brutal-border rotate-[-2deg] translate-y-6 translate-x-3 max-w-md" />

            {/* Image Card */}
            <div className="relative bg-white brutal-border brutal-shadow-sm p-4 rotate-0 max-w-xl w-full">
              {/* Fake Window Header */}
              <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-black rounded-full" />
                  <span className="font-black text-black text-xs uppercase tracking-widest leading-none mt-1">Status de Vagas</span>
                </div>
                <div className="bg-black text-techstars-green px-3 py-1 text-[10px] font-black uppercase brutal-shadow-sm">
                  {getActiveLot().lot.short}
                </div>
              </div>

              {/* Photo placeholder */}
              <div className="relative aspect-[4/3] md:aspect-[16/10] w-full brutal-border mb-4 bg-gray-200 overflow-hidden group">
                <Image
                  src="/images/imagem-hero.webp"
                  alt="techstars_ Startup Weekend Anápolis Equipe"
                  fill
                  className="object-cover object-[center_35%] scale-125 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>

              {/* Title / Description under photo inside card */}
              <div className="flex items-center justify-between brutal-border p-3 mb-4 bg-white">
                <span className="font-normal text-black text-sm tracking-[-0.02em] leading-[1.25] font-sans -mb-1">
                  techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span>
                </span>
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center brutal-border text-xs font-bold">✓</span>
              </div>

              {/* Grid with progress bar info -> scarcity */}
              <div className="flex gap-4">
                <div className="flex-1 bg-black text-white p-3 brutal-border flex flex-col justify-center items-center">
                  <span className="text-[10px] uppercase font-bold text-gray-400">Preenchidas</span>
                  <span className="text-2xl font-black text-yellow-400">55</span>
                </div>
                <div className="flex-1 bg-techstars-green text-black p-3 brutal-border flex flex-col justify-center items-center">
                  <span className="text-[10px] uppercase font-bold">Lotação Máx</span>
                  <span className="text-2xl font-black">75</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-white brutal-border h-5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-yellow-400 border-r-4 border-black" style={{ width: '73%' }} />
                </div>
                <p className="text-center text-[11px] font-black uppercase mt-3 tracking-wider text-red-600">
                  Corra, restam apenas 20 vagas!
                </p>
              </div>

            </div>

            {/* Little round badge like 'ZERO OPS' in target */}
            <div className="absolute top-1/2 -left-6 lg:-left-16 transform -translate-y-1/2 w-28 h-28 bg-blue-600 rounded-full brutal-border brutal-shadow-sm flex items-center justify-center rotate-[-15deg] z-20 shadow-[6px_6px_0px_#000]">
              <span className="text-white font-black uppercase text-center text-lg leading-tight drop-shadow-[2px_2px_0px_#000]">
                73%<br />Lotado
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Global Sponsors Marquee */}
      <div className="w-full bg-yellow-400 border-t-4 border-black py-2 overflow-hidden z-20 relative flex flex-col items-center">
        <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-black/60 pt-1 -mb-1 z-30">GLOBAL SUPPORTERS</span>
        <div className="animate-loop-scroll flex w-max items-center py-2">
          {[...Array(2)].map((_, setIndex) => (
            <div key={`global-${setIndex}`} className="flex items-center">
              {[...Array(2)].map((_, innerIndex) => (
                <div key={`global-inner-${innerIndex}`} className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center px-6 -my-5"><Image src="/images/HSBC-InnovationBanking-Logo-MONO-BLK.png" alt="HSBC Innovation Banking" width={300} height={100} className="h-20 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/Brex Black _ White Logo.png" alt="Brex" width={300} height={100} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/GoogleForStartups_Horizontal (1) (1).png" alt="Google for Startups" width={300} height={100} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/mercury-logo-wordmark-horizontal_mono black.png" alt="Mercury" width={300} height={100} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/perks-deel-450x200-black (1).png" alt="Deel" width={300} height={120} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Local Sponsors Marquee */}
      <div className="w-full bg-white border-t-4 border-black py-2 overflow-hidden z-20 relative flex flex-col items-center">
        <span className="font-black text-[10px] sm:text-xs uppercase tracking-widest text-black/60 pt-1 -mb-1 z-30">LOCAL PARTNERS</span>
        <div className="animate-loop-scroll flex w-max items-center py-2" style={{ animationDirection: 'reverse' }}>
          {[...Array(2)].map((_, setIndex) => (
            <div key={`local-${setIndex}`} className="flex items-center">
              {[...Array(2)].map((_, innerIndex) => (
                <div key={`local-inner-${innerIndex}`} className="flex items-center">
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/sebrae-logo-1-white.png" alt="SEBRAE" width={300} height={100} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/FIAP.png" alt="FIAP" width={200} height={70} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/8020digital.png" alt="8020 Digital" width={400} height={160} className="h-20 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6"><Image src="/images/SENAI_logo_2024.png" alt="SENAI" width={200} height={70} className="h-10 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                  <div className="flex flex-shrink-0 items-center justify-center px-6 -my-8"><Image src="/images/flsoftwaresolutions.png" alt="F&L Solutions" width={400} height={160} className="h-28 w-auto object-contain brightness-0" /></div>
                  <span className="text-black/30 font-black text-xl px-2">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
