"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { eventConfig } from "@/data/startup-weekend-event";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden z-0">
        {/* Background with gradient and noise */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 noise-texture z-0" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Join Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="flex justify-center mb-6"
            >
              <div className="relative h-36 md:h-64 w-full max-w-lg flex items-center justify-center overflow-hidden mx-auto">
                <Image
                  src="/images/logo-dark.png"
                  alt="techstars_ Startup Weekend Anápolis Logo"
                  width={800}
                  height={800}
                  className="w-full h-auto min-w-full"
                  priority
                />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full text-primary-200 text-xs sm:text-sm font-medium"
            >
              <span className="w-2 h-2 bg-primary-400 rounded-full mr-2 animate-pulse-slow" />
              O maior evento de comunidades do estado de Goiás
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight"
            >
              <span className="text-3xl md:text-5xl text-primary-300 font-medium">
                2025
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
            >
              Faça network, conheça novas pessoas e descubra novas
              oportunidades!
              <br />
              <br />
              <span className="text-primary-300 font-medium">
                Dia 19 e 20 de Setembro • Faculdade Senai Fatesg
              </span>
              <br />
              <span className="text-lg text-gray-400">
                R. 227-A, 95 - Setor Leste Universitário, Goiânia - GO
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto"
            >
              <a
                href={eventConfig.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold text-lg rounded-full shadow-2xl shadow-primary-500/25 transition-all duration-300 transform hover:scale-105 hover:shadow-primary-500/40"
              >
                <span className="relative z-10">Fazer Inscrição</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
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

              <Link
                href="/communities"
                className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>Ver Comunidades</span>
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>

              <Link
                href="/agenda"
                className="group inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-semibold text-lg rounded-full transition-all duration-300 transform hover:scale-105"
              >
                <span>Agenda do Evento</span>
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-8 pt-12"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">250+</div>
                <div className="text-gray-400">Participantes</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-gray-400">Comunidades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">12ª</div>
                <div className="text-gray-400">Edição</div>
              </div>
            </motion.div>

            {/* Brindes e Lotes Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                <span className="text-yellow-300 text-xl">🎁</span>
                <span className="text-white font-semibold">
                  As primeiras 50 inscrições ganham brinde exclusivo!
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative z-10 mb-8"
        ></motion.div>
      </section>
    </>
  );
}
