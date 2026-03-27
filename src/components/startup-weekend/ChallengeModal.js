"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { logEvent } from "@/lib/firebase";

export default function ChallengeModal({ isOpen, onClose, variant }) {
  const router = useRouter();

  if (!variant) return null;

  const handleAccept = () => {
    logEvent("challenge_accepted", { variant_id: variant.id });
    router.push("/startup-weekend/apadrinhamento");
  };

  const handleDecline = () => {
    logEvent("challenge_declined", { variant_id: variant.id });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleDecline}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg brutal-card p-8 md:p-10"
          >
            {/* Fire accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-yellow-400 brutal-border-b rounded-b-xl" />

            {/* Icon */}
            <div className="flex justify-center mb-6 mt-2">
              <div className="w-16 h-16 bg-yellow-400 brutal-border brutal-shadow-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🔥</span>
              </div>
            </div>

            {/* Challenge text */}
            <p className="text-black text-xl md:text-2xl font-black uppercase text-center leading-snug mb-8 tracking-tight drop-shadow-[1px_1px_0px_#fff]">
              {variant.modalChallenge}
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAccept}
                className="brutal-btn w-full px-8 py-4 text-lg"
              >
                Eu aceito o desafio →
              </button>
              <button
                onClick={handleDecline}
                className="brutal-btn-white w-full px-8 py-3 text-sm mt-2"
              >
                Não tenho coragem
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
