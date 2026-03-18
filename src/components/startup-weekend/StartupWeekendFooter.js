import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendFooter() {
  return (
    <footer className="py-16 px-6 bg-black border-t border-zinc-900 text-techstars-slate">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xl mb-6 font-bold text-white tracking-tight">
          {eventConfig.fullName}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Inscreva-se
          </a>
          <span className="hidden sm:block text-zinc-800">•</span>
          <Link
            href="/startup-weekend/mentores"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Mentores
          </Link>
          <span className="hidden sm:block text-zinc-800">•</span>
          <Link
            href="/startup-weekend/jurados"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Jurados
          </Link>
          <span className="hidden sm:block text-zinc-800">•</span>
          <a
            href={eventConfig.whatsappContact}
            target="_blank"
            rel="noopener noreferrer"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Contato
          </a>
          <a
            href={eventConfig.techstarsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Sobre Startup Weekend
          </a>
          <span className="hidden sm:block text-zinc-800">•</span>
          <Link
            href="/startup-weekend/patrocinadores"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Quero Patrocinar
          </Link>
          <span className="hidden sm:block text-zinc-800">•</span>
          <Link
            href="/transparencia"
            className="text-techstars-slate hover:text-techstars-green transition-colors font-medium"
          >
            Transparência
          </Link>
        </div>
        <p className="text-sm text-zinc-500">
          Startup Weekend é um programa da{" "}
          <a
            href="https://www.techstars.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-techstars-green hover:underline"
          >
            Techstars
          </a>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
