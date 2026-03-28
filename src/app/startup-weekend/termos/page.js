"use client";

import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f0] overflow-x-hidden">
      {/* Header */}
      <section className="bg-black brutal-border-y py-16 px-6 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <Link
            href="/startup-weekend"
            className="inline-flex items-center text-white font-black uppercase text-sm mb-8 hover:text-techstars-green transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar
          </Link>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-4">
            Termos de
            <br />
            Participação.
          </h1>
          <div className="bg-techstars-green text-black text-xs font-black uppercase tracking-widest px-4 py-2 brutal-border inline-block shadow-[4px_4px_0_#fff]">
            {eventConfig.fullName}
          </div>
        </div>
      </section>

      {/* Event Description */}
      <section className="py-16 px-6 bg-[#f4f4f0] brutal-border-y">
        <div className="max-w-4xl mx-auto">
          <div className="brutal-card bg-white p-8 md:p-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-1 brutal-border shadow-[2px_2px_0_#000]">
                DESCRIÇÃO DO EVENTO
              </div>
            </div>
            <p className="text-black font-bold text-lg md:text-xl leading-relaxed">
              Aprenda a pensar, trabalhar e construir como uma startup em 54 horas
              emocionantes. Um evento Techstars Startup Weekend é uma incursão
              empolgante e imersiva no mundo das startups. Ao longo de três dias
              repletos de ação, você conhecerá os melhores mentores, investidores,
              cofundadores e patrocinadores para mostrar como fazer mais rapidamente
              — e talvez até iniciar uma startup.
            </p>
          </div>
        </div>
      </section>

      {/* Terms of Participation */}
      <section className="py-16 px-6 bg-white brutal-border-y">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-yellow-400 border-4 border-black flex items-center justify-center text-lg font-black shadow-[3px_3px_0_#000]">
                1
              </span>
              Acordo de Termos de Participação
            </h2>
            <div className="space-y-6 text-black font-medium text-base md:text-lg leading-relaxed">
              <p>
                É nosso trabalho proporcionar uma experiência incrível de
                aprendizagem e networking. Nossa intenção é que você conheça pessoas
                incríveis, com quem você talvez possa abrir uma empresa, aprender com
                mentores e também com outros participantes. O evento pretende ser um
                fórum colaborativo para compartilhar, aprender, construir, e se
                divertir.
              </p>
              <p>
                Dessa forma, ao se inscrever como participante, você reconhece que
                qualquer ideia compartilhada por você ou por outras pessoas ao longo
                do evento são contribuições para a experiência e comunidade em geral.
                Se você estiver muito preocupado(a), você pode reduzir seu pitch
                inicial a um esboço breve da sua ideia sem ter que compartilhar muita
                informação importante.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-pink-500 border-4 border-black flex items-center justify-center text-lg font-black text-white shadow-[3px_3px_0_#000]">
                2
              </span>
              Conduta e Responsabilidade
            </h2>
            <div className="space-y-6 text-black font-medium text-base md:text-lg leading-relaxed">
              <p>
                Como membro da sua comunidade de startups, você concorda em incluir
                todas e quaisquer pessoas e suas ideias. Você concorda em agir
                profissionalmente, tratar todos com respeito, e tratar as instalações
                do evento com o devido cuidado.
              </p>
              <p>
                Você concorda que é responsável em caso de quaisquer acidentes ou
                danos que causar.
              </p>
              <p>
                Você também concorda em não responsabilizar o Techstars Startup
                Weekend, sua equipe local de voluntários, ou qualquer um dos
                apoiadores do evento por qualquer perda, dano, lesão, ou qualquer
                outro tipo de incidente imprevisível.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-techstars-green border-4 border-black flex items-center justify-center text-lg font-black shadow-[3px_3px_0_#000]">
                3
              </span>
              Permissão de Imagem
            </h2>
            <div className="space-y-6 text-black font-medium text-base md:text-lg leading-relaxed">
              <p>
                Ao participar do evento, você concede permissão à Techstars para
                capturar fotos/vídeos do evento e usá-los para fins de marketing,
                para que possamos continuar a oferecer incríveis Techstars Startup
                Weekends em todo o mundo.
              </p>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-blue-600 border-4 border-black flex items-center justify-center text-lg font-black text-white shadow-[3px_3px_0_#000]">
                4
              </span>
              Termos de Uso e Privacidade
            </h2>
            <div className="space-y-6 text-black font-medium text-base md:text-lg leading-relaxed">
              <p>
                Ao comprar um ingresso para um evento Techstars Startup Weekend, você
                concorda com nossos{" "}
                <a
                  href="https://www.techstars.com/terms-of-use"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 border-b-2 border-blue-600 hover:bg-blue-600 hover:text-white px-1 transition-all font-black"
                >
                  Termos de Uso
                </a>{" "}
                e{" "}
                <a
                  href="https://www.techstars.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 border-b-2 border-blue-600 hover:bg-blue-600 hover:text-white px-1 transition-all font-black"
                >
                  Política de Privacidade
                </a>
                .
              </p>
              <p>
                Se você tiver dúvidas, entre em contato com{" "}
                <a
                  href="mailto:privacy@techstars.com"
                  className="text-blue-600 border-b-2 border-blue-600 hover:bg-blue-600 hover:text-white px-1 transition-all font-black"
                >
                  privacy@techstars.com
                </a>
                .
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <span className="w-10 h-10 bg-yellow-400 border-4 border-black flex items-center justify-center text-lg font-black shadow-[3px_3px_0_#000]">
                5
              </span>
              Reembolso
            </h2>
            <div className="space-y-6 text-black font-medium text-base md:text-lg leading-relaxed">
              <p>
                Se você precisar de um reembolso, entre em contato com o organizador
                do evento.
              </p>
              <p>
                Contato:{" "}
                <a
                  href={`mailto:${eventConfig.sponsorContact.email}`}
                  className="text-blue-600 border-b-2 border-blue-600 hover:bg-blue-600 hover:text-white px-1 transition-all font-black"
                >
                  {eventConfig.sponsorContact.email}
                </a>{" "}
                ou via{" "}
                <a
                  href={eventConfig.whatsappContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-techstars-green border-b-2 border-techstars-green hover:bg-techstars-green hover:text-black px-1 transition-all font-black"
                >
                  WhatsApp
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-techstars-green brutal-border-y">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl font-black text-black uppercase mb-8">
            Ao se inscrever, você aceita todos os termos acima.
          </p>
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn inline-flex items-center px-10 py-5 text-xl"
          >
            Fazer minha inscrição
            <svg className="w-6 h-6 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
