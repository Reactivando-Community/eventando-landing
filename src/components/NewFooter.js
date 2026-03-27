import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-dark-900 text-gray-400">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg mb-4">techstars_ Startup Weekend Anápolis</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
          <Link
            href="/communities"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Ver Comunidades
          </Link>
          <span className="hidden sm:block text-gray-600">•</span>
          <Link
            href="/agenda"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Ver Agenda
          </Link>
          <span className="hidden sm:block text-gray-600">•</span>
          <a
            href="https://wa.link/801vds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            Contato
          </a>
        </div>
        <p className="text-sm">
          Organização techstars_ Startup Weekend • Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}
