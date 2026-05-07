"use client";

import { motion } from "framer-motion";
import { eventConfig } from "@/data/startup-weekend-event";

export default function WhatsAppCTA() {
  return (
    <section className="py-20 px-6 bg-techstars-green relative overflow-hidden brutal-border-y">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="black"
              strokeWidth="0.5"
            />
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center px-4 py-2 bg-white brutal-border brutal-shadow-sm text-black font-black text-sm uppercase tracking-wider">
            Comunidade Exclusiva
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black uppercase tracking-tight leading-tight drop-shadow-[2px_2px_0px_#fff]">
            Entre para a nossa <br />
            Comunidade Exclusiva!
          </h2>

          <p className="text-xl text-black max-w-2xl mx-auto leading-relaxed font-bold bg-white p-6 brutal-border brutal-shadow-sm rounded-xl">
            Não fique de fora das conversas. Participe do nosso{" "}
            <strong>grupo fechado no WhatsApp</strong> para participantes e
            interessados. Receba spoilers sobre mentores, dicas de preparação e
            faça networking antes mesmo do evento começar!
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-4"
          >
            <a
              href={eventConfig.vipWhatsAppGroup}
              target="_blank"
              rel="noopener noreferrer"
              className="brutal-btn-white inline-flex items-center px-10 py-5 text-xl"
            >
              <svg
                className="w-8 h-8 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
              </svg>
              Entrar no Grupo VIP
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
