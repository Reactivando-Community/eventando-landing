"use client";

import Link from "next/link";
import { useState } from "react";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

/* ─── audit data ─── */
const auditSections = [
  {
    id: "descricao",
    category: "DESCRIÇÃO DO EVENTO",
    categoryColor: "bg-blue-600",
    intro:
      "A Techstars exige que todos os eventos Startup Weekend incluam a descrição padrão do evento no site e na página de registro.",
    items: [
      {
        requirement:
          "Aprenda a pensar, trabalhar e construir como uma startup em 54 horas emocionantes. Um evento Techstars Startup Weekend é uma incursão empolgante e imersiva no mundo das startups. Ao longo de três dias repletos de ação, você conhecerá os melhores mentores, investidores, cofundadores e patrocinadores para mostrar como fazer mais rapidamente — e talvez até iniciar uma startup.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 'Descrição do Evento'",
            href: "/startup-weekend/termos",
          },
          {
            label: "Página Principal — Seção 'Sobre o Evento'",
            href: "/startup-weekend",
            anchor: "sobre-evento",
          },
        ],
      },
    ],
  },
  {
    id: "termos-participacao",
    category: "ACORDO DE TERMOS DE PARTICIPAÇÃO",
    categoryColor: "bg-yellow-400",
    intro:
      "O texto completo do Acordo de Termos de Participação deve estar acessível no site do evento.",
    items: [
      {
        requirement:
          "É nosso trabalho proporcionar uma experiência incrível de aprendizagem e networking. Nossa intenção é que você conheça pessoas incríveis, com quem você talvez possa abrir uma empresa, aprender com mentores e também com outros participantes. O evento pretende ser um fórum colaborativo para compartilhar, aprender, construir, e se divertir.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 1 'Acordo de Termos'",
            href: "/startup-weekend/termos",
          },
        ],
      },
      {
        requirement:
          "Ao se inscrever como participante, você reconhece que qualquer ideia compartilhada por você ou por outras pessoas ao longo do evento são contribuições para a experiência e comunidade em geral. Se você estiver muito preocupado(a), você pode reduzir seu pitch inicial a um esboço breve da sua ideia sem ter que compartilhar muita informação importante.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 1 'Acordo de Termos'",
            href: "/startup-weekend/termos",
          },
        ],
      },
    ],
  },
  {
    id: "conduta",
    category: "CONDUTA E RESPONSABILIDADE",
    categoryColor: "bg-pink-500",
    intro:
      "Regras de conduta, inclusão e responsabilidade devem estar explícitas no site.",
    items: [
      {
        requirement:
          "Como membro da sua comunidade de startups, você concorda em incluir todas e quaisquer pessoas e suas ideias. Você concorda em agir profissionalmente, tratar todos com respeito, e tratar as instalações do evento com o devido cuidado.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 2 'Conduta e Responsabilidade'",
            href: "/startup-weekend/termos",
          },
          {
            label: "FAQ — 'Quais são as regras do evento?'",
            href: "/startup-weekend/faq",
          },
        ],
      },
      {
        requirement:
          "Você concorda que é responsável em caso de quaisquer acidentes ou danos que causar.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 2 'Conduta e Responsabilidade'",
            href: "/startup-weekend/termos",
          },
        ],
      },
      {
        requirement:
          "Você também concorda em não responsabilizar o Techstars Startup Weekend, sua equipe local de voluntários, ou qualquer um dos apoiadores do evento por qualquer perda, dano, lesão, ou qualquer outro tipo de incidente imprevisível.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 2 'Conduta e Responsabilidade'",
            href: "/startup-weekend/termos",
          },
        ],
      },
    ],
  },
  {
    id: "imagem",
    category: "PERMISSÃO DE IMAGEM",
    categoryColor: "bg-techstars-green",
    intro:
      "A permissão para captura e uso de fotos/vídeos para marketing é obrigatória.",
    items: [
      {
        requirement:
          "Ao participar do evento, você concede permissão à Techstars para capturar fotos/vídeos do evento e usá-los para fins de marketing, para que possamos continuar a oferecer incríveis Techstars Startup Weekends em todo o mundo.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 3 'Permissão de Imagem'",
            href: "/startup-weekend/termos",
          },
          {
            label: "Página Principal — Seção 'Sobre o Evento'",
            href: "/startup-weekend",
            anchor: "sobre-evento",
          },
        ],
      },
    ],
  },
  {
    id: "termos-uso",
    category: "TERMOS DE USO E POLÍTICA DE PRIVACIDADE",
    categoryColor: "bg-purple-600",
    intro:
      "Links para os Termos de Uso e Política de Privacidade da Techstars devem estar acessíveis, com texto informando que ao comprar o ingresso o participante concorda com ambos.",
    items: [
      {
        requirement:
          "Ao comprar um ingresso para um evento Techstars Startup Weekend, você concorda com nossos Termos de Uso e Política de Privacidade.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 4 'Termos de Uso e Privacidade'",
            href: "/startup-weekend/termos",
          },
          {
            label: "Footer — Seção legal",
            href: "/startup-weekend",
            anchor: "footer",
          },
          {
            label: "CTA 'Garanta sua Vaga' — Aviso legal",
            href: "/startup-weekend",
            anchor: "cta-registro",
          },
          {
            label: "Seção de Preços — Abaixo de 'Garantir Ingresso'",
            href: "/startup-weekend",
            anchor: "pricing",
          },
        ],
      },
      {
        requirement:
          "Link clicável para Termos de Uso (https://www.techstars.com/terms-of-use)",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Link ativo",
            href: "/startup-weekend/termos",
          },
          {
            label: "Footer — Link 'Termos de Uso'",
            href: "/startup-weekend",
            anchor: "footer",
          },
          {
            label: "CTA 'Garanta sua Vaga'",
            href: "/startup-weekend",
          },
          {
            label: "Seção de Preços",
            href: "/startup-weekend",
          },
        ],
      },
      {
        requirement:
          "Link clicável para Política de Privacidade (https://www.techstars.com/privacy-policy)",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Link ativo",
            href: "/startup-weekend/termos",
          },
          {
            label: "Footer — Link 'Política de Privacidade'",
            href: "/startup-weekend",
            anchor: "footer",
          },
          {
            label: "CTA 'Garanta sua Vaga'",
            href: "/startup-weekend",
          },
          {
            label: "Seção de Preços",
            href: "/startup-weekend",
          },
        ],
      },
      {
        requirement:
          "Se você tiver dúvidas, entre em contato com privacy@techstars.com.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 4",
            href: "/startup-weekend/termos",
          },
          {
            label: "Footer — Link 'privacy@techstars.com'",
            href: "/startup-weekend",
            anchor: "footer",
          },
          {
            label: "Página Principal — Seção 'Sobre o Evento'",
            href: "/startup-weekend",
          },
        ],
      },
    ],
  },
  {
    id: "reembolso",
    category: "REEMBOLSO",
    categoryColor: "bg-orange-500",
    intro:
      "A política de reembolso deve estar descrita e indicar contato com o organizador.",
    items: [
      {
        requirement:
          "Se você precisar de um reembolso, entre em contato com o organizador do evento.",
        status: "compliant",
        locations: [
          {
            label: "Página de Termos — Seção 5 'Reembolso'",
            href: "/startup-weekend/termos",
          },
          {
            label: "FAQ — 'Qual é a política de reembolso?'",
            href: "/startup-weekend/faq",
          },
        ],
      },
    ],
  },
];

const statusConfig = {
  compliant: {
    label: "CONFORME",
    bg: "bg-techstars-green",
    text: "text-black",
    icon: "✓",
  },
  partial: {
    label: "PARCIAL",
    bg: "bg-yellow-400",
    text: "text-black",
    icon: "⚠",
  },
  missing: {
    label: "AUSENTE",
    bg: "bg-red-500",
    text: "text-white",
    icon: "✕",
  },
};

export default function AuditoriaPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const totalItems = auditSections.reduce(
    (acc, s) => acc + s.items.length,
    0
  );
  const compliantItems = auditSections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.status === "compliant").length,
    0
  );
  const percentage = Math.round((compliantItems / totalItems) * 100);

  const toggleSection = (id) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-[#f4f4f0] overflow-x-hidden">
      {/* Header */}
      <section className="bg-black brutal-border-y py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            href="/startup-weekend"
            className="inline-flex items-center text-white font-black uppercase text-sm mb-8 hover:text-techstars-green transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar
          </Link>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Auditoria de
            <br />
            Compliance.
          </h1>
          <p className="text-lg md:text-xl font-bold text-gray-400 max-w-2xl leading-relaxed mb-8">
            Verificação de conformidade do site com os requisitos obrigatórios
            da Techstars para eventos Startup Weekend.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="bg-techstars-green text-black text-xs font-black uppercase tracking-widest px-4 py-2 brutal-border shadow-[4px_4px_0_#fff]">
              TECHSTARS STARTUP WEEKEND ANÁPOLIS
            </div>
            <div className="bg-white text-black text-xs font-black uppercase tracking-widest px-4 py-2 brutal-border shadow-[4px_4px_0_#39C463]">
              AUDITORIA REALIZADA EM 28/03/2026
            </div>
          </div>
        </div>
      </section>

      {/* Score Card */}
      <section className="py-12 px-6 bg-[#f4f4f0]">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-card bg-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Circular Score */}
            <div className="shrink-0 relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-8 border-black flex items-center justify-center bg-techstars-green shadow-[8px_8px_0_#000]">
                <div className="text-center">
                  <span className="text-5xl md:text-6xl font-black text-black leading-none">
                    {percentage}%
                  </span>
                  <p className="text-xs font-black uppercase text-black mt-1 tracking-widest">
                    CONFORME
                  </p>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-4">
                Resultado da Auditoria
              </h2>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
                <div className="bg-techstars-green border-4 border-black px-4 py-3 shadow-[4px_4px_0_#000]">
                  <span className="text-2xl font-black text-black">{compliantItems}</span>
                  <span className="text-xs font-black uppercase text-black ml-2">
                    Conformes
                  </span>
                </div>
                <div className="bg-yellow-400 border-4 border-black px-4 py-3 shadow-[4px_4px_0_#000]">
                  <span className="text-2xl font-black text-black">
                    {auditSections.reduce(
                      (acc, s) =>
                        acc +
                        s.items.filter((i) => i.status === "partial").length,
                      0
                    )}
                  </span>
                  <span className="text-xs font-black uppercase text-black ml-2">
                    Parciais
                  </span>
                </div>
                <div className="bg-red-500 border-4 border-black px-4 py-3 shadow-[4px_4px_0_#000]">
                  <span className="text-2xl font-black text-white">
                    {auditSections.reduce(
                      (acc, s) =>
                        acc +
                        s.items.filter((i) => i.status === "missing").length,
                      0
                    )}
                  </span>
                  <span className="text-xs font-black uppercase text-white ml-2">
                    Ausentes
                  </span>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-600 leading-relaxed">
                Todos os itens exigidos pela Techstars para descrição do evento e 
                termos de participação foram verificados contra o conteúdo do site e
                da página de registro.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Note */}
      <section className="px-6 pb-8 bg-[#f4f4f0]">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-card bg-yellow-400 p-6 md:p-8 flex items-start gap-4">
            <span className="text-3xl mt-1 shrink-0">📋</span>
            <div>
              <h3 className="text-lg font-black text-black uppercase tracking-tight mb-2">
                Documento de Referência
              </h3>
              <p className="text-sm font-bold text-black leading-relaxed">
                Esta auditoria foi feita com base no documento oficial da
                Techstars:{" "}
                <em>
                  &quot;Event description and Terms of Participation&quot;
                </em>
                , que define os textos obrigatórios que devem constar no site do
                evento e na página de registro de todos os eventos Techstars
                Startup Weekend no mundo. O texto de referência utilizado foi a
                versão em <strong>Português</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Sections */}
      <section className="py-12 px-6 bg-[#f4f4f0]">
        <div className="max-w-5xl mx-auto space-y-6">
          {auditSections.map((section) => {
            const isExpanded = expandedSection === section.id;
            const sectionCompliant = section.items.every(
              (i) => i.status === "compliant"
            );

            return (
              <div key={section.id} className="brutal-card bg-white overflow-hidden">
                {/* Section Header — clickable */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      className={`shrink-0 w-12 h-12 ${section.categoryColor} border-4 border-black flex items-center justify-center shadow-[3px_3px_0_#000]`}
                    >
                      <span
                        className={`text-xl font-black ${
                          ["bg-pink-500", "bg-purple-600"].includes(
                            section.categoryColor
                          )
                            ? "text-white"
                            : "text-black"
                        }`}
                      >
                        {sectionCompliant ? "✓" : "⚠"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg md:text-xl font-black text-black uppercase tracking-tight truncate">
                        {section.category}
                      </h3>
                      <p className="text-xs font-bold text-gray-500 mt-1">
                        {section.items.length}{" "}
                        {section.items.length === 1
                          ? "item verificado"
                          : "itens verificados"}{" "}
                        •{" "}
                        {section.items.filter((i) => i.status === "compliant").length}{" "}
                        conforme{section.items.filter((i) => i.status === "compliant").length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-3">
                    <div
                      className={`px-3 py-1 border-2 border-black text-[10px] font-black uppercase ${
                        sectionCompliant
                          ? "bg-techstars-green text-black"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {sectionCompliant ? "100%" : "PARCIAL"}
                    </div>
                    <span className="text-2xl font-black text-black transition-transform duration-200" style={{ transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)" }}>
                      +
                    </span>
                  </div>
                </button>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="border-t-4 border-black">
                    {/* Intro */}
                    <div className="px-6 md:px-8 py-4 bg-gray-50 border-b-2 border-gray-200">
                      <p className="text-sm font-bold text-gray-600 italic">
                        {section.intro}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="divide-y-2 divide-gray-200">
                      {section.items.map((item, idx) => {
                        const cfg = statusConfig[item.status];
                        return (
                          <div key={idx} className="p-6 md:p-8">
                            {/* Status Badge */}
                            <div className="flex items-start gap-4 mb-4">
                              <div
                                className={`shrink-0 ${cfg.bg} ${cfg.text} border-2 border-black px-2 py-1 text-[10px] font-black uppercase flex items-center gap-1`}
                              >
                                <span>{cfg.icon}</span>
                                <span>{cfg.label}</span>
                              </div>
                            </div>

                            {/* Requirement Text */}
                            <div className="mb-6">
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">
                                TEXTO EXIGIDO PELA TECHSTARS
                              </p>
                              <blockquote className="border-l-4 border-black pl-4 py-2 bg-gray-50 text-sm md:text-base font-medium text-black leading-relaxed italic">
                                &ldquo;{item.requirement}&rdquo;
                              </blockquote>
                            </div>

                            {/* Where Implemented */}
                            <div>
                              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
                                ONDE ESTÁ IMPLEMENTADO NO SITE
                              </p>
                              <div className="flex flex-col gap-2">
                                {item.locations.map((loc, locIdx) => (
                                  <Link
                                    key={locIdx}
                                    href={loc.href}
                                    className="flex items-center gap-3 group px-4 py-3 bg-white border-2 border-black hover:bg-techstars-green hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5 transition-all"
                                  >
                                    <svg
                                      className="w-4 h-4 shrink-0 text-techstars-green group-hover:text-black"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                      />
                                    </svg>
                                    <span className="text-sm font-black text-black uppercase tracking-tight">
                                      {loc.label}
                                    </span>
                                    <svg
                                      className="w-4 h-4 ml-auto shrink-0 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-transform"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M9 5l7 7-7 7"
                                      />
                                    </svg>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Notes Section */}
      <section className="py-12 px-6 bg-white brutal-border-y">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-8">
            Notas da Auditoria
          </h2>
          <div className="space-y-6">
            <div className="brutal-card bg-[#f4f4f0] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-blue-600 border-4 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-white font-black">1</span>
                </div>
                <div>
                  <h3 className="font-black text-black uppercase text-base mb-2">
                    Texto de referência
                  </h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    O texto utilizado como referência foi o template oficial da
                    Techstars em Português (versão brasileira), conforme
                    fornecido no documento{" "}
                    <em>
                      &quot;Event description and Terms of Participation&quot;
                    </em>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="brutal-card bg-[#f4f4f0] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-yellow-400 border-4 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-black font-black">2</span>
                </div>
                <div>
                  <h3 className="font-black text-black uppercase text-base mb-2">
                    Página de registro (Doity)
                  </h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    A Techstars exige que os mesmos textos obrigatórios constem
                    também na <strong>página de registro</strong>. A página de
                    inscrição no Doity (
                    <a
                      href="https://doity.com.br/startup-weekend-anapolis"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      doity.com.br/startup-weekend-anapolis
                    </a>
                    ) deve ser verificada e atualizada separadamente.
                  </p>
                </div>
              </div>
            </div>

            <div className="brutal-card bg-[#f4f4f0] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-techstars-green border-4 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-black font-black">3</span>
                </div>
                <div>
                  <h3 className="font-black text-black uppercase text-base mb-2">
                    Links externos
                  </h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    Os links para{" "}
                    <a
                      href="https://www.techstars.com/terms-of-use"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Termos de Uso
                    </a>{" "}
                    e{" "}
                    <a
                      href="https://www.techstars.com/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Política de Privacidade
                    </a>{" "}
                    apontam para as páginas oficiais da Techstars e estão
                    funcionais no momento desta auditoria.
                  </p>
                </div>
              </div>
            </div>

            <div className="brutal-card bg-[#f4f4f0] p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
                  <span className="text-white font-black">4</span>
                </div>
                <div>
                  <h3 className="font-black text-black uppercase text-base mb-2">
                    Abordagem de implementação
                  </h3>
                  <p className="text-sm font-medium text-gray-700 leading-relaxed">
                    Os textos obrigatórios foram implementados de forma
                    centralizada na{" "}
                    <Link
                      href="/startup-weekend/termos"
                      className="text-blue-600 underline"
                    >
                      Página de Termos de Participação
                    </Link>
                    , com avisos e links complementares distribuídos pelo footer
                    do site, seções de CTA de inscrição e na seção de preços.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 px-6 bg-[#f4f4f0] brutal-border-y">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            Legenda de Status
          </p>
          <div className="flex flex-wrap gap-6">
            {Object.entries(statusConfig).map(([key, cfg]) => (
              <div key={key} className="flex items-center gap-2">
                <div
                  className={`${cfg.bg} ${cfg.text} border-2 border-black px-2 py-1 text-[10px] font-black uppercase flex items-center gap-1`}
                >
                  <span>{cfg.icon}</span>
                  <span>{cfg.label}</span>
                </div>
                <span className="text-xs font-bold text-gray-500">
                  {key === "compliant" && "— Implementado conforme exigido"}
                  {key === "partial" && "— Parcialmente implementado"}
                  {key === "missing" && "— Não encontrado no site"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
