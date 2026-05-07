"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import Link from "next/link";

const stats = [
  {
    number: "100+",
    label: "PARTICIPANTES",
    description: "Meta de 80 a 100 pessoas focadas em execução. Empreendedores, devs, designers e profissionais de negócios.",
    color: "bg-pink-500",
  },
  {
    number: "12-15",
    label: "MENTORES",
    description: "Profissionais de destaque do mercado oferecendo mentoria aplicada.",
    color: "bg-yellow-400",
  },
  {
    number: "10-20",
    label: "STARTUPS",
    description: "Times criados do zero, construindo produtos e realizando pitches finais.",
    color: "bg-blue-600",
  },
];

const benefits = [
  {
    title: "VISIBILIDADE DIRETA",
    description: "Exposição da marca antes, durante e após o evento, com possibilidade de ativação no local.",
    color: "bg-blue-600"
  },
  {
    title: "ACESSO A TALENTOS",
    description: "Excelente ponto de relacionamento para recrutamento de mão de obra altamente qualificada.",
    color: "bg-pink-500"
  },
  {
    title: "POSICIONAMENTO",
    description: "Reforço de autoridade ao associar sua marca à inovação prática e ao ambiente onde o futuro é construído.",
    color: "bg-techstars-green"
  },
];

const tiers = [
  {
    name: "BRONZE",
    price: "R$ 2.500",
    features: [
      "2 Inscrições inclusas",
      "Logo no site do evento",
      "Divulgação nas redes sociais",
    ],
    color: "bg-white",
    textColor: "text-black",
  },
  {
    name: "PRATA",
    price: "R$ 5.000",
    features: [
      "4 Inscrições inclusas",
      "Logo no site do evento",
      "Divulgação nas redes sociais",
      "Logo nos materiais impressos",
    ],
    color: "bg-gray-300",
    textColor: "text-black",
  },
  {
    name: "OURO",
    price: "R$ 7.500",
    features: [
      "6 Inscrições inclusas",
      "Logo em materiais de marketing",
      "Destaque em banners físicos",
      "Distribuição de brindes (pastas)",
    ],
    color: "bg-yellow-400",
    textColor: "text-black",
    rotate: "rotate-1",
  },
  {
    name: "PLATINA",
    price: "R$ 10.000",
    highlight: true,
    features: [
      "8 Inscrições inclusas",
      "Balcão/Stand promocional",
      "Logo com destaque no palco",
      "Citar marca nos crachás",
      "Vídeo institucional (30s)",
      "Lista de e-mails autorizada",
    ],
    color: "bg-techstars-green",
    textColor: "text-black",
    rotate: "-rotate-2",
  },
];

export default function SponsorsPage() {
  const scrollToContact = () => {
    document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-yellow-400 selection:text-black">
      <StartupWeekendSEO />
      
      {/* Nav */}
      <nav className="py-4 px-6 border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/startup-weekend" className="text-xl md:text-2xl font-black text-black tracking-tighter hover:text-techstars-green transition-colors">
            techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span>
          </Link>
          <Link href="/startup-weekend" className="text-black font-black uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_#39C463] transition-all text-sm md:text-base">
            &larr; VOLTAR
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-techstars-green border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="bg-black text-white text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-black inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
             SEJA O COMBUSTÍVEL
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-[4px_4px_0_#fff]">
            PATROCINE O <br/>
            <span className="bg-black text-techstars-green px-4 inline-block transform rotate-1 mt-2">FUTURO</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform -rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
            O techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span> é um sprint de 54 horas onde talentos constroem o futuro das startups locais.<br/>
            <span className="text-blue-600 block mt-2">{"//"} Associe sua marca à inovação extrema.</span>
          </p>
          <button
            onClick={scrollToContact}
            className="mt-12 brutal-btn-white text-xl md:text-2xl px-10 py-5 flex items-center shadow-[6px_6px_0_#000] hover:shadow-[8px_8px_0_#000]"
          >
            QUERO PATROCINAR AGORA
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-24 px-6 bg-black border-b-4 border-black relative z-0">
         <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_#39C463]">
              QUEM VOCÊ IMPACTA
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_#39C463] relative hover:-translate-y-2 hover:-translate-x-2 transition-transform hover:shadow-[12px_12px_0_#39C463]">
                <div className={`absolute -top-6 -right-6 w-12 h-12 border-4 border-black ${stat.color} rounded-full z-0`} />
                <div className="text-5xl md:text-6xl font-black text-black mb-4 relative z-10">
                  {stat.number}
                </div>
                <h3 className="text-2xl font-black text-black uppercase mb-4 tracking-tight border-b-4 border-black pb-2 inline-block">
                  {stat.label}
                </h3>
                <p className="text-gray-800 font-bold text-base leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-[#f4f4f0] border-b-4 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0_#9333ea]">
              O QUE VOCÊ GANHA
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className={`bg-white border-4 border-black p-8 shadow-[8px_8px_0_#000] transform transition-transform hover:-translate-y-2 ${i%2!==0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 hover:z-10`}>
                <div className={`w-16 h-16 ${benefit.color} border-4 border-black mb-6 flex items-center justify-center text-white`}>
                   <span className="text-3xl font-black">{i + 1}</span>
                </div>
                <h3 className="text-2xl font-black text-black uppercase mb-4 tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-black font-semibold text-lg leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers Section */}
      <section className="py-24 px-6 bg-pink-500 border-b-4 border-black relative">
         <div className="absolute top-0 left-0 w-full h-4 bg-yellow-400 border-b-4 border-black" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0_#fff]">
              ESCOLHA SUA COTA
            </h2>
            <div className="bg-black text-white font-black uppercase px-6 py-2 border-4 border-white inline-block mt-4 transform rotate-1">
               POSICIONE SUA MARCA LOGO
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative flex flex-col p-8 border-4 border-black ${tier.color} ${tier.textColor} ${tier.highlight ? "shadow-[12px_12px_0_#000]" : "shadow-[8px_8px_0_#000]"} transform transition-transform hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0_#000] ${tier.rotate || ''} z-10 hover:z-50`}
              >
                {tier.highlight && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-black text-techstars-green font-black text-xs uppercase px-4 py-1 border-4 border-black whitespace-nowrap tracking-wider shadow-[4px_4px_0_#39C463]">
                    DESTAQUE MÁXIMO
                  </div>
                )}
                <div className="mb-6 pb-6 border-b-4 border-black">
                  <h3 className="text-3xl font-black mb-2 uppercase tracking-tighter">
                    {tier.name}
                  </h3>
                  <div className="text-2xl md:text-3xl font-black bg-black text-white px-3 py-2 inline-block -rotate-1 shadow-[4px_4px_0_#fff]">
                    {tier.price}
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-1 font-bold">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start">
                      <span className="bg-black text-white w-5 h-5 flex items-center justify-center border-2 border-black mr-3 shrink-0 text-xs font-black mt-0.5">
                        ✓
                      </span>
                      <span className="leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className="w-full bg-black text-white py-4 px-6 font-black uppercase border-4 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0_#000] transition-colors"
                >
                  Selecionar {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-24 px-6 bg-[#f4f4f0] border-b-4 border-black border-t-8 border-t-yellow-400">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black border-4 border-black p-8 md:p-16 text-center shadow-[16px_16px_0_#39C463] transform rotate-[-1deg]">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0_#39C463]">
                VAMOS FECHAR NEGÓCIO?
              </h2>
              <p className="text-xl font-bold text-gray-300 max-w-2xl mx-auto leading-relaxed border-b-4 border-zinc-800 pb-8">
                Defina a cota que melhor atende seus objetivos. Fale diretamente com o Pedro, responsável pelas parcerias e ativações do techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span>.
              </p>

              <div className="flex flex-col md:flex-row gap-8 text-left max-w-4xl mx-auto pb-8">
                <div className="w-full md:w-[40%] bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000] transform rotate-1">
                  <div className="text-black font-black uppercase text-xs border-b-2 border-black pb-1 mb-2">Responsável</div>
                  <div className="text-2xl font-black text-techstars-green drop-shadow-[1px_1px_0_#000]">
                    {eventConfig.sponsorContact.name}
                  </div>
                </div>
                <div className="w-full md:w-[60%] bg-white border-4 border-black p-4 md:p-6 flex-1 shadow-[6px_6px_0_#000] transform -rotate-1 overflow-hidden">
                  <div className="text-black font-black uppercase text-xs border-b-2 border-black pb-1 mb-2">Contato Corporativo</div>
                  <div className="text-sm sm:text-base md:text-lg lg:text-xl font-black text-black break-words">
                    {eventConfig.sponsorContact.email}
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col items-center">
                  <a
                    href={eventConfig.sponsorContact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xl uppercase border-4 border-black shadow-[8px_8px_0_#000] hover:shadow-[12px_12px_0_#000] hover:-translate-y-1 transition-all"
                  >
                    <svg
                      className="w-8 h-8 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    FALAR COM PEDRO
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
