"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SideForm from "./SideForm";

export default function HeroSection({ productsToList, productSelectedId }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient and noise */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 noise-texture" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
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
              <span className="bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                Join Community
              </span>
              <br />
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
              Faça network, conheça novas pessoas e descubra novas oportunidades!
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

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="pt-8"
            >
              <button
                onClick={() => setIsFormOpen(true)}
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
              </button>
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
                <div className="text-3xl font-bold text-white">13ª</div>
                <div className="text-gray-400">Edição</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Side Form */}
      <SideForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        productsToList={productsToList}
        productSelectedId={productSelectedId}
      />
    </>
  );
}
