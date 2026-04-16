"use client";

import StartupWeekendMentorsSection from "@/components/startup-weekend/StartupWeekendMentorsSection";
import WhatsAppCTA from "@/components/startup-weekend/WhatsAppCTA";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import Link from "next/link";

export default function MentorsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Simple Header */}
      <nav className="py-6 px-6 border-b border-gray-100 dark:border-zinc-900 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/startup-weekend"
            className="text-xl font-black text-black dark:text-white"
          >
            techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span>
          </Link>
          <Link
            href="/startup-weekend"
            className="text-techstars-green hover:underline font-bold"
          >
            ← Voltar
          </Link>
        </div>
      </nav>

      <StartupWeekendMentorsSection />

      <WhatsAppCTA />

      <StartupWeekendFooter />
    </main>
  );
}
