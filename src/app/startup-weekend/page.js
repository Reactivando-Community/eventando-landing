"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";
import { pickVariant } from "@/data/bolsa-variants";
import { logEvent } from "@/lib/firebase";
import StartupWeekendHero from "@/components/startup-weekend/StartupWeekendHero";
import StartupWeekendInfoSection from "@/components/startup-weekend/StartupWeekendInfoSection";
import StartupWeekendProfilesSection from "@/components/startup-weekend/StartupWeekendProfilesSection";
import StartupWeekendTeasers from "@/components/startup-weekend/StartupWeekendTeasers";
import StartupWeekendTeamSection from "@/components/startup-weekend/StartupWeekendTeamSection";
import StartupWeekendStatsSection from "@/components/startup-weekend/StartupWeekendStatsSection";
import WhatsAppCTA from "@/components/startup-weekend/WhatsAppCTA";
import ChallengeModal from "@/components/startup-weekend/ChallengeModal";
import MarqueeDivider from "@/components/startup-weekend/MarqueeDivider";
import BrutalistFaq from "@/components/startup-weekend/BrutalistFaq";
import StartupWeekendPricingSection from "@/components/startup-weekend/StartupWeekendPricingSection";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";


export default function StartupWeekendPage() {
  const [variant, setVariant] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bolsaSectionRef = useRef(null);


  useEffect(() => {
    const v = pickVariant();
    setVariant(v);
    logEvent("bolsa_cta_view", { variant_id: v.id, variant_text: v.ctaTitle });

    // ?bolsa=true → scroll to section + open modal
    const params = new URLSearchParams(window.location.search);
    if (params.get("bolsa") === "true") {
      sessionStorage.setItem("sw_gate_passed", "true");
      setTimeout(() => {
        bolsaSectionRef.current?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          setIsModalOpen(true);
          logEvent("bolsa_cta_click", { variant_id: v.id, source: "url_param" });
          logEvent("challenge_modal_view", { variant_id: v.id, source: "url_param" });
        }, 800);
      }, 300);
    }
  }, []);

  const handleCtaClick = () => {
    if (variant) {
      logEvent("bolsa_cta_click", { variant_id: variant.id });
      logEvent("challenge_modal_view", { variant_id: variant.id });
    }
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#f4f4f0] overflow-x-hidden">
      <StartupWeekendSEO />
      <StartupWeekendHero />


      <StartupWeekendInfoSection />

      <StartupWeekendPricingSection />

      <MarqueeDivider text="ESCOLHA SEU PAPEL • HACKEIE SEU LIMITE" bgColor="bg-blue-600" textColor="text-white" speed="25s" />
      <StartupWeekendProfilesSection />

      <MarqueeDivider text="QUEM FAZ ACONTECER • DIRETO DA TRINCHEIRA" bgColor="bg-pink-500" textColor="text-white" speed="30s" />
      {/* <StartupWeekendTeasers /> */}
      <StartupWeekendTeamSection />

      <MarqueeDivider text="O MODELO FALIU • HORA DE AGIR" bgColor="bg-techstars-green" textColor="text-black" speed="22s" />
      <StartupWeekendStatsSection />

      <MarqueeDivider text="ÚLTIMAS VAGAS • NÃO FIQUE DE FORA" bgColor="bg-yellow-400" textColor="text-black" speed="18s" />
      <WhatsAppCTA />

      {/* Agenda CTA */}
      <section className="py-12 px-6 bg-[#f4f4f0]">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-3xl">📅</span>
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  Confira a programação completa do fim de semana
                </h2>
              </div>
              <p className="text-black font-medium text-lg max-w-2xl leading-relaxed">
                3 dias intensos de imersão: pitches na sexta, construção no
                sábado e demos no domingo. Veja horário por horário o que vai
                acontecer.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/startup-weekend/agenda"
                className="brutal-btn-white inline-flex items-center px-8 py-4 text-lg"
              >
                Ver Agenda Completa
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brutalist Hard Questions FAQ */}
      <BrutalistFaq />

      {/* Transparency CTA */}
      <section className="py-12 px-6 bg-techstars-green brutal-border-y">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-card bg-yellow-400 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-3xl">💡</span>
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  Saiba exatamente para onde vai cada real do seu ingresso
                </h2>
              </div>
              <p className="text-black font-semibold text-lg max-w-2xl leading-relaxed">
                Somos 100% voluntários e não temos margem de lucro. Veja o
                detalhamento completo dos custos do evento no nosso Portal da
                Transparência.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/transparencia"
                className="brutal-btn-white inline-flex items-center px-8 py-4 text-lg"
              >
                Portal da Transparência
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA Section */}
      <section className="py-24 px-6 bg-[#f4f4f0]">
        <div className="max-w-4xl mx-auto text-center brutal-card p-12 bg-white">
          <h2 className="text-4xl md:text-5xl font-black text-black uppercase mb-6 tracking-tight">
            Garanta sua vaga
          </h2>
          <p className="text-xl font-bold text-black mb-10 uppercase">
            inscrições abertas
          </p>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn inline-flex items-center px-10 py-5 text-xl"
          >
            Fazer minha inscrição
            <svg
              className="w-6 h-6 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
          <p className="mt-6 text-sm font-bold text-black">
            💡{" "}
            <Link
              href="/transparencia"
              className="hover:underline text-techstars-green drop-shadow-[1px_1px_0px_#000]"
            >
              Veja para onde vai cada real do seu ingresso
            </Link>
          </p>
          <p className="mt-4 text-xs font-medium text-gray-500 max-w-lg mx-auto leading-relaxed">
            Ao se inscrever, você concorda com os{" "}
            <a
              href="https://www.techstars.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-black"
            >
              Termos de Uso
            </a>
            ,{" "}
            <a
              href="https://www.techstars.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-black"
            >
              Política de Privacidade
            </a>{" "}
            e os{" "}
            <Link
              href="/startup-weekend/termos"
              className="text-blue-600 underline hover:text-black"
            >
              Termos de Participação
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Sponsors / Support - white logos on dark background */}
      <section className="py-24 px-6 bg-black text-white brutal-border-y">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tight">
              Apoio
            </h2>
            <p className="text-xl font-bold text-techstars-green">
              Empresas e instituições que apoiam o evento
            </p>
          </div>

          {/* Global Partners - bigger section */}
          <div className="mb-20">
            <h3 className="text-2xl md:text-3xl font-black mb-10 text-center tracking-tight uppercase">
              Patrocinadores Globais
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-14 min-h-[140px] bg-white brutal-border brutal-shadow-sm p-8 rounded-xl">
              <a
                href="https://www.hsbcinnovationbanking.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/HSBC-InnovationBanking-Logo-MONO-REV.png"
                  alt="HSBC Innovation Banking"
                  width={180}
                  height={56}
                  className="h-14 w-auto object-contain brightness-0"
                />
              </a>
              <a
                href="https://brex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/Brex White Logo.png"
                  alt="Brex"
                  width={160}
                  height={56}
                  className="h-14 w-auto object-contain brightness-0"
                />
              </a>
              <a
                href="https://startup.google.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/GoogleForStartups_Horizontal_W (1).png"
                  alt="Google for Startups"
                  width={200}
                  height={75}
                  className="h-14 md:h-16 w-auto object-contain brightness-0"
                />
              </a>
              <a
                href="https://mercury.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/mercury-logo-wordmark-horizontal_mono white.png"
                  alt="Mercury"
                  width={160}
                  height={56}
                  className="h-14 w-auto object-contain brightness-0"
                />
              </a>
              <a
                href="https://www.deel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/perks-deel-450x200-white.png"
                  alt="Deel"
                  width={200}
                  height={88}
                  className="h-14 md:h-16 w-auto object-contain brightness-0"
                />
              </a>
            </div>
          </div>

          {/* Platinum Sponsors - between global and gold/local */}
          <div className="mb-16">
            <h3 className="text-2xl md:text-3xl font-black mb-8 text-center tracking-tight uppercase">
              Patrocinadores Platina
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-10 min-h-[130px]">
              <a
                href="https://www.sebrae.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white rounded-xl p-6 md:p-8 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/sebrae-logo-1-white.png"
                  alt="SEBRAE"
                  width={420}
                  height={140}
                  className="h-24 md:h-28 w-auto object-contain brightness-0"
                />
              </a>
              <a
                href="https://www.fiap.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-white rounded-xl p-6 md:p-8 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
              >
                <Image
                  src="/images/FIAP.png"
                  alt="FIAP"
                  width={300}
                  height={96}
                  className="h-20 md:h-24 w-auto object-contain brightness-0"
                />
              </a>
            </div>
          </div>

          <div className="w-full flex flex-col items-center">
            <h3 className="text-xl md:text-2xl font-black mb-8 text-center tracking-tight uppercase">
              Patrocinadores Locais
            </h3>
            <div className="flex justify-center w-full">
              <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 min-h-[100px]">
                <a
                  href="https://8020digital.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white rounded-xl p-4 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/8020digital.png"
                    alt="8020 digital"
                    width={360}
                    height={144}
                    className="h-16 md:h-20 w-auto object-contain brightness-0"
                  />
                </a>
                <a
                  href="https://flsoftwaresolutions.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white rounded-xl p-4 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/flsoftwaresolutions.png"
                    alt="F&L Solutions"
                    width={360}
                    height={144}
                    className="h-16 md:h-20 w-auto object-contain brightness-0"
                  />
                </a>
                <a
                  href="https://www.portaldaindustria.com.br/senai/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white rounded-xl p-4 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/SENAI_logo_2024.png"
                    alt="SENAI - Serviço Nacional de Aprendizagem Industrial"
                    width={200}
                    height={80}
                    className="h-16 md:h-20 w-auto object-contain"
                  />
                </a>
                <div
                  className="flex items-center justify-center bg-white rounded-xl p-4 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/sindifargo.png"
                    alt="Sindifargo"
                    width={360}
                    height={144}
                    className="h-16 md:h-20 w-auto object-contain brightness-0"
                  />
                </div>
                <a
                  href="https://hubcerrado.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white rounded-xl p-4 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/Logo Hub Cerrado 4 (mono white).png"
                    alt="Hub Cerrado"
                    width={220}
                    height={220}
                    className="h-16 md:h-20 w-auto object-contain brightness-0"
                  />
                </a>
                <a
                  href="https://grupodifference.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-white rounded-xl p-4 brutal-border brutal-shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <Image
                    src="/images/logo grupo 2 branca.png"
                    alt="Grupo Difference"
                    width={260}
                    height={64}
                    className="h-14 md:h-16 w-auto object-contain brightness-0"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Invitation CTA */}
      <section className="py-12 px-6 bg-[#f4f4f0]">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-4xl drop-shadow-[2px_2px_0px_#000]">🚀</span>
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  Sua empresa também pode fazer parte dessa transformação!
                </h2>
              </div>
              <p className="text-black font-semibold text-lg max-w-2xl leading-relaxed">
                Associe sua marca à inovação, apoie o ecossistema empreendedor
                de Anápolis e conecte-se com talentos incríveis. Descubra as
                vantagens de ser um parceiro oficial.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/startup-weekend/patrocinadores"
                className="brutal-btn-yellow inline-flex items-center px-8 py-4 text-lg"
              >
                Ver Cotas de Patrocínio
                <svg
                  className="w-5 h-5 ml-2 border-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bolsa 100% CTA – A/B Test */}
      <section ref={bolsaSectionRef} id="bolsa" className="py-12 px-6 bg-[#f4f4f0]">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-card bg-techstars-green p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="flex-1 text-center md:text-left space-y-4">
              <div className="flex items-start justify-center md:justify-start gap-3">
                <span className="text-4xl mt-1 drop-shadow-[2px_2px_0px_#000]">🔥</span>
                <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight leading-snug">
                  {variant?.ctaTitle || "Bolsa 100% para quem tem coragem."}
                </h2>
              </div>
              <p className="text-black font-bold text-xl max-w-2xl leading-relaxed">
                {variant?.ctaSubtitle || "Bolsa 100%. Sem custo. Sem desculpa."}
              </p>
            </div>
            <div className="shrink-0">
              <button
                onClick={handleCtaClick}
                className="brutal-btn-white inline-flex items-center px-8 py-4 text-lg"
              >
                Eu tenho coragem
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Official Techstars Event Description + Terms Notice */}
      <section className="py-16 px-6 bg-white brutal-border-y">
        <div className="max-w-4xl mx-auto">
          <div className="brutal-card bg-[#f4f4f0] p-8 md:p-12">
            <div className="bg-black text-white text-[10px] font-black uppercase px-3 py-1 brutal-border inline-block shadow-[2px_2px_0_#fff] mb-6">
              SOBRE O EVENTO
            </div>
            <p className="text-black font-bold text-base md:text-lg leading-relaxed mb-8">
              Aprenda a pensar, trabalhar e construir como uma startup em 54 horas
              emocionantes. Um evento Techstars Startup Weekend é uma incursão
              empolgante e imersiva no mundo das startups. Ao longo de três dias
              repletos de ação, você conhecerá os melhores mentores, investidores,
              cofundadores e patrocinadores para mostrar como fazer mais rapidamente
              — e talvez até iniciar uma startup.
            </p>
            <div className="border-t-4 border-black pt-6">
              <p className="text-sm font-bold text-black mb-3">
                📋 Ao participar deste evento, você concorda com os{" "}
                <Link
                  href="/startup-weekend/termos"
                  className="text-blue-600 underline hover:text-black font-black"
                >
                  Termos de Participação
                </Link>
                , incluindo permissão para captura de fotos e vídeos para fins de marketing.
              </p>
              <p className="text-xs font-medium text-gray-600">
                Ao comprar seu ingresso, você concorda com os{" "}
                <a
                  href="https://www.techstars.com/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-black"
                >
                  Termos de Uso
                </a>{" "}
                e a{" "}
                <a
                  href="https://www.techstars.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-black"
                >
                  Política de Privacidade
                </a>{" "}
                da Techstars. Dúvidas:{" "}
                <a
                  href="mailto:privacy@techstars.com"
                  className="text-blue-600 underline hover:text-black"
                >
                  privacy@techstars.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Modal */}
      <ChallengeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        variant={variant}
      />

      <StartupWeekendFooter />
    </main>
  );
}
