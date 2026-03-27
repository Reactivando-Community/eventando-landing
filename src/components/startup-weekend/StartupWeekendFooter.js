import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendFooter() {
  return (
    <footer className="py-16 px-6 bg-white brutal-border-y">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-2xl mb-8 font-black text-black uppercase tracking-tight">
          {eventConfig.fullName}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
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
            Sobre Startup Weekend
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
        <p className="text-sm font-bold text-black mt-8">
          Startup Weekend é um programa da{" "}
          <a
            href="https://www.techstars.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-techstars-green border-b-2 border-black hover:bg-techstars-green hover:text-black hover:border-transparent px-1 transition-all"
          >
            Techstars
          </a>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
