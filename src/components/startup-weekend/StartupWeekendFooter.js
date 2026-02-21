import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendFooter() {
  return (
    <footer className="py-12 px-6 bg-dark-900 text-gray-400">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg mb-4 font-semibold text-white">
          {eventConfig.fullName}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <a
            href={eventConfig.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            Inscreva-se
          </a>
          <span className="hidden sm:block text-gray-600">•</span>
          <a
            href={eventConfig.whatsappContact}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            Contato
          </a>
          <span className="hidden sm:block text-gray-600">•</span>
          <a
            href={eventConfig.techstarsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            Sobre Startup Weekend
          </a>
        </div>
        <p className="text-sm text-gray-500">
          Startup Weekend é um programa da{" "}
          <a
            href="https://www.techstars.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300"
          >
            Techstars
          </a>
          . Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
