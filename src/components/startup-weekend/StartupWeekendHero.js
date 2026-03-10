"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";
import { eventConfig } from "@/data/startup-weekend-event";

export default function StartupWeekendHero() {
  useEffect(() => {
    let scrolled = false;
    const handleScroll = () => {
      scrolled = true;
      window.removeEventListener("scroll", handleScroll);
    };
    window.addEventListener("scroll", handleScroll);

    const timer = setTimeout(() => {
      if (!scrolled) {
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-0">
        {/* Background - Techstars clean dark */}
        <div className="absolute inset-0 bg-black noise-texture z-0" />
        <div className="absolute inset-0 bg-gradient-to-tr from-techstars-green/10 via-transparent to-transparent z-0" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Powered by Techstars badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex justify-center"
            >
              <span className="inline-flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 bg-techstars-green rounded-full mr-2 animate-pulse shadow-[0_0_10px_#39C463]" />
                Powered by Techstars
              </span>
            </motion.div>

            {/* Logo - techstars_ Startup Weekend */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <Image
                src="/images/Startup Weekend Logo (1).png"
                alt="techstars_ Startup Weekend"
                width={560}
                height={210}
                className="h-32 md:h-48 lg:h-56 w-auto object-contain"
                priority
              />
              <h1 className="text-2xl md:text-4xl lg:text-5xl text-white font-bold mt-4 tracking-tight">
                Startup Weekend {eventConfig.city}
              </h1>
            </motion.div>

            {/* Tagline - Energetic, action-oriented (Techstars writing style) */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-techstars-slate max-w-2xl mx-auto leading-relaxed"
            >
              {eventConfig.tagline}
              <br />
              <br />
              <span className="text-white font-bold">
                {eventConfig.dateFull}
              </span>
              <br />
              <span className="text-lg text-techstars-slate opacity-80">
                {eventConfig.venue.name} — {eventConfig.venue.address}
              </span>
            </motion.p>

            {/* CTA - Register now */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a
                href={eventConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-8 py-4 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-lg rounded-lg shadow-lg shadow-techstars-green/20 transition-all duration-300 transform hover:scale-105"
              >
                Fazer minha inscrição
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>

              <a
                href={eventConfig.vipWhatsAppGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold text-lg rounded-lg transition-all duration-300"
              >
                Acompanhar novidades
                <svg
                  className="w-5 h-5 ml-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.35-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                </svg>
              </a>
            </motion.div>

            {/* Stats preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 pt-12"
            >
              {eventConfig.stats.slice(0, 3).map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-techstars-slate text-sm md:text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
