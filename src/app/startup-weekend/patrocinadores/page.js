"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import Link from "next/link";

const stats = [
  {
    number: "100+",
    label: "Participantes",
    description:
      "Meta de 80 a 100 pessoas focadas em execução. Empreendedores, devs, designers e profissionais de negócios.",
  },
  {
    number: "12-15",
    label: "Mentores",
    description:
      "Profissionais de destaque do mercado oferecendo mentoria aplicada.",
  },
  {
    number: "10-20",
    label: "Startups",
    description:
      "Times criados do zero, construindo produtos e realizando pitches finais.",
  },
];

const benefits = [
  {
    title: "Visibilidade Direta",
    description:
      "Exposição da marca antes, durante e após o evento, com possibilidade de ativação no local (stand, desafios e brindes).",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    title: "Acesso a Talentos",
    description:
      "Excelente ponto de relacionamento para recrutamento de mão de obra altamente qualificada (contato via opt-in/LGPD).",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    title: "Posicionamento",
    description:
      "Reforço de autoridade ao associar sua marca à inovação prática e ao ambiente onde o futuro é construído.",
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

const tiers = [
  {
    name: "Bronze",
    price: "R$ 2.500",
    features: [
      "2 Inscrições inclusas",
      "Logo no site do evento",
      "Divulgação nas redes sociais",
    ],
    color: "bg-orange-900/10 border-orange-900/20 text-orange-900",
    darkColor:
      "dark:bg-orange-500/5 dark:border-orange-500/20 dark:text-orange-400",
  },
  {
    name: "Prata",
    price: "R$ 5.000",
    features: [
      "4 Inscrições inclusas",
      "Logo no site do evento",
      "Divulgação nas redes sociais",
      "Logo nos materiais de marketing",
    ],
    color: "bg-slate-300/10 border-slate-300/20 text-slate-500",
    darkColor:
      "dark:bg-slate-400/5 dark:border-slate-400/20 dark:text-slate-300",
  },
  {
    name: "Ouro",
    price: "R$ 7.500",
    features: [
      "6 Inscrições inclusas",
      "Logo nos materiais de marketing",
      "Destaque em banners físicos",
      "Distribuição de brindes nas pastas",
    ],
    color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-600",
    darkColor:
      "dark:bg-yellow-500/5 dark:border-yellow-500/20 dark:text-yellow-400",
  },
  {
    name: "Platina",
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
    color:
      "bg-techstars-green/10 border-techstars-green/20 text-techstars-green",
    darkColor:
      "dark:bg-techstars-green/5 dark:border-techstars-green/20 dark:text-techstars-green",
  },
];

export default function SponsorsPage() {
  const scrollToContact = () => {
    document
      .getElementById("contact-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black font-sans">
      {/* Header */}
      <nav className="py-6 px-6 border-b border-gray-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/startup-weekend"
            className="text-xl font-black text-black dark:text-white"
          >
            Startup Weekend Anápolis
          </Link>
          <Link
            href="/startup-weekend"
            className="text-techstars-green hover:underline font-bold"
          >
            ← Voltar
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-techstars-green/5 to-transparent dark:from-techstars-green/10" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tight leading-tight max-w-5xl mx-auto">
              Patrocine o <span className="text-techstars-green">Startup Weekend Anápolis</span>. Associe sua marca à inovação.
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-techstars-slate max-w-3xl mx-auto leading-relaxed">
              O Startup Weekend Anápolis é um sprint de inovação de 54 horas
              onde profissionais formam times, constroem protótipos e validam
              ideias reais. Faça parte dessa transformação.
            </p>
            <div className="pt-6">
              <button
                onClick={scrollToContact}
                className="inline-flex items-center px-10 py-5 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-xl rounded-xl shadow-lg shadow-techstars-green/20 transition-all duration-300 transform hover:scale-105"
              >
                Quero ser um patrocinador
                <svg
                  className="w-6 h-6 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-24 px-6 bg-zinc-900 border-y border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Quem a sua marca vai impactar?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-zinc-800/50 rounded-3xl border border-zinc-700/50"
              >
                <div className="text-5xl font-black text-techstars-green mb-4">
                  {stat.number}
                </div>
                <div className="text-xl font-bold text-white mb-4">
                  {stat.label}
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-6">
              O que a sua empresa ganha ao apoiar?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="p-10 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-techstars-green/10 text-techstars-green rounded-2xl flex items-center justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-zinc-400 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers Section */}
      <section className="py-24 px-6 bg-gray-50 dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black dark:text-white mb-6 tracking-tight">
              Escolha como posicionar a sua marca
            </h2>
            <p className="text-xl text-gray-600 dark:text-zinc-500 max-w-2xl mx-auto">
              Cotas exclusivas desenhadas para maximizar o seu retorno e impacto
              no ecossistema local.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.8, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className={`relative flex flex-col p-8 rounded-3xl border-2 transition-all duration-300 ${tier.highlight ? "bg-zinc-900 dark:bg-zinc-900 border-techstars-green shadow-xl ring-4 ring-techstars-green/10 z-10" : "bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800 shadow-sm"}`}
              >
                {tier.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-techstars-green text-black font-black text-xs uppercase px-4 py-1 rounded-full whitespace-nowrap tracking-wider">
                    Destaque Máximo
                  </div>
                )}
                <div className="mb-8">
                  <h3
                    className={`text-xl font-black mb-1 ${tier.highlight ? "text-white" : "text-black dark:text-white"}`}
                  >
                    {tier.name}
                  </h3>
                  <div className="text-3xl font-black text-techstars-green">
                    {tier.price}
                  </div>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start text-sm">
                      <svg
                        className={`w-5 h-5 mr-3 shrink-0 ${tier.highlight ? "text-techstars-green" : "text-techstars-green"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={
                          tier.highlight
                            ? "text-zinc-300"
                            : "text-gray-600 dark:text-zinc-400"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={scrollToContact}
                  className={`w-full py-4 px-6 rounded-xl font-bold transition-all transform hover:scale-105 ${tier.highlight ? "bg-techstars-green text-black hover:bg-[#45d171] shadow-lg shadow-techstars-green/20" : "bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700"}`}
                >
                  Selecionar {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-section" className="py-24 px-6 bg-techstars-green">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black rounded-[2.5rem] p-12 md:p-20 text-center shadow-[0_40px_100px_-20px_rgba(57,196,99,0.3)]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
                Vamos fechar essa parceria?
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Escolha a sua cota e vamos definir juntos as melhores ativações
                para a sua marca. Fale diretamente com o nosso time de
                organização.
              </p>

              <div className="grid md:grid-cols-2 gap-8 pt-8 text-left max-w-2xl mx-auto border-t border-zinc-800">
                <div className="space-y-2">
                  <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                    Responsável
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {eventConfig.sponsorContact.name}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
                    E-mail Corporativo
                  </div>
                  <div className="text-2xl font-bold text-white break-words">
                    {eventConfig.sponsorContact.email}
                  </div>
                </div>
              </div>

              <div className="pt-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={eventConfig.sponsorContact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-10 py-5 bg-techstars-green hover:bg-[#45d171] text-black font-extrabold text-2xl rounded-2xl shadow-2xl transition-all duration-300"
                  >
                    <svg
                      className="w-8 h-8 mr-3"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    Falar com Pedro no WhatsApp
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
