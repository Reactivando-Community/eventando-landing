import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendFooter() {
  return (
    <footer className="py-16 px-6 bg-white brutal-border-y">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-[-0.04em] mb-8 leading-[1.05] font-sans text-left inline-block">
          <span className="lowercase">techstars_</span><br />
          <span className="whitespace-nowrap">Startup Weekend</span><br />
          <span className="text-[#0EA5E9]">Anápolis</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 flex-wrap">
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Inscreva-se
          </a>
          <span className="hidden sm:block text-black font-black">•</span>
          <Link
            href="/startup-weekend/mentores"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Mentores
          </Link>
          <span className="hidden sm:block text-black font-black">•</span>
          <Link
            href="/startup-weekend/jurados"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Jurados
          </Link>
          <span className="hidden sm:block text-black font-black">•</span>
          <Link
            href="/startup-weekend/agenda"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Agenda
          </Link>
          <span className="hidden sm:block text-black font-black">•</span>
          <a
            href={eventConfig.whatsappContact}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Contato
          </a>
          <a
            href={eventConfig.techstarsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Sobre
          </a>
          <span className="hidden sm:block text-black font-black">•</span>
          <Link
            href="/startup-weekend/patrocinadores"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Quero Patrocinar
          </Link>
          <span className="hidden sm:block text-black font-black">•</span>
          <Link
            href="/startup-weekend/apadrinhamento"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Apadrinhamento
          </Link>
          <span className="hidden sm:block text-black font-black">•</span>
          <Link
            href="/transparencia"
            className="text-black hover:text-techstars-green hover:underline decoration-4 font-black uppercase text-sm"
          >
            Transparência
          </Link>
        </div>

        {/* Legal Links - Techstars Compliance */}
        <div className="border-t-4 border-black pt-8 mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 flex-wrap">
            <Link
              href="/startup-weekend/termos"
              className="text-black hover:text-blue-600 hover:underline decoration-2 font-bold text-xs uppercase tracking-wider"
            >
              Termos de Participação
            </Link>
            <span className="hidden sm:block text-gray-400">|</span>
            <a
              href="https://www.techstars.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-600 hover:underline decoration-2 font-bold text-xs uppercase tracking-wider"
            >
              Termos de Uso
            </a>
            <span className="hidden sm:block text-gray-400">|</span>
            <a
              href="https://www.techstars.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-600 hover:underline decoration-2 font-bold text-xs uppercase tracking-wider"
            >
              Política de Privacidade
            </a>
            <span className="hidden sm:block text-gray-400">|</span>
            <a
              href="mailto:privacy@techstars.com"
              className="text-black hover:text-blue-600 hover:underline decoration-2 font-bold text-xs uppercase tracking-wider"
            >
              privacy@techstars.com
            </a>
          </div>
          <p className="text-xs font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
            Ao comprar um ingresso para um evento Techstars Startup Weekend, você
            concorda com nossos{" "}
            <a
              href="https://www.techstars.com/terms-of-use"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-black"
            >
              Termos de Uso
            </a>{" "}
            e{" "}
            <a
              href="https://www.techstars.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-black"
            >
              Política de Privacidade
            </a>
            . Se você tiver dúvidas, entre em contato com{" "}
            <a
              href="mailto:privacy@techstars.com"
              className="text-blue-600 underline hover:text-black"
            >
              privacy@techstars.com
            </a>
            .
          </p>
        </div>

        <p className="text-sm font-bold text-black mt-8">
          Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
