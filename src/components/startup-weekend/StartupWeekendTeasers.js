"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { eventConfig } from "@/data/startup-weekend-event";

function TeaserGrid({ count }) {
  return (
    <div
      className={`grid grid-cols-${count === 2 ? "2" : "2 md:grid-cols-3"} gap-6 py-8 justify-center max-w-3xl mx-auto`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="group relative flex flex-col items-center p-6 bg-white brutal-card hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[10px_10px_0px_#000] transition-all"
        >
          <div className="relative w-full aspect-square mb-4 flex items-center justify-center overflow-hidden">
            {/* Silhouette Icon */}
            <svg
              className="w-3/4 h-3/4 text-gray-200 transition-colors duration-300 group-hover:text-techstars-green"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>

            {/* Mystery Question Mark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
              <span className="text-5xl font-black text-techstars-green">
                ?
              </span>
            </div>
          </div>

          <span className="text-[10px] font-black text-black uppercase tracking-widest text-center mt-4">
            Revelação em breve...
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function StartupWeekendTeasers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#f4f4f0] overflow-hidden brutal-border-y">
      {/* Mentors Teaser */}
      <div className="py-24 px-6 border-b-4 border-black">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">
              Quem vai guiar a sua jornada?{" "}
              <span className="text-techstars-green drop-shadow-[2px_2px_0px_#000]">(Em breve)</span>
            </h2>
            <p className="text-xl font-bold text-black border-4 border-black bg-white inline-block px-6 py-2 shadow-[4px_4px_0px_#000]">
              Grandes nomes do mercado estão chegando para acelerar a sua ideia.
            </p>
          </motion.div>

          <TeaserGrid count={3} />

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/startup-weekend/mentores"
              className="brutal-btn-white inline-flex items-center px-8 py-4 text-lg"
            >
              Ver todos os Mentores
            </Link>
            <a
              href={eventConfig.vipWhatsAppGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn inline-flex items-center px-8 py-4 text-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Descubra no Grupo VIP
            </a>
          </div>
        </div>
      </div>

      {/* Judges Teaser */}
      <div className="py-24 px-6 bg-techstars-green">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-black uppercase text-black tracking-tight drop-shadow-[2px_2px_0px_#fff]">
              A Banca Avaliadora
            </h2>
            <p className="text-xl font-bold text-black border-4 border-black bg-white inline-block px-6 py-2 shadow-[4px_4px_0px_#000]">
              Investidores e líderes do ecossistema que vão avaliar o seu pitch
              no domingo.
            </p>
          </motion.div>

          <TeaserGrid count={2} />

          <div className="mt-12">
            <Link
              href="/startup-weekend/jurados"
              className="brutal-btn-white inline-flex items-center px-8 py-4 text-lg"
            >
              Conhecer os Jurados
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
