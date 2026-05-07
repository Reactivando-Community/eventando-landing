"use client";

import Link from "next/link";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import CertificadoForm from "@/components/startup-weekend/CertificadoForm";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";

export default function CertificadoPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f0] font-sans selection:bg-yellow-400 selection:text-black">
      <StartupWeekendSEO />
      {/* Nav */}
      <nav className="py-4 px-6 border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/startup-weekend" className="text-xl md:text-2xl font-black text-black tracking-tighter">
            techstars_ Startup Weekend <span className="text-[#0EA5E9]">Anápolis</span>
          </Link>
          <Link href="/startup-weekend" className="text-black font-black uppercase hover:bg-black hover:text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0_#9333ea] transition-all">
            &larr; VOLTAR
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 px-6 bg-techstars-green border-b-4 border-black overflow-hidden shadow-[0_12px_0_rgba(0,0,0,1)] z-10">
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center">
          <div className="bg-black text-yellow-400 text-sm font-black uppercase tracking-widest px-4 py-1 border-4 border-black inline-block mb-6 shadow-[4px_4px_0_#000] rotate-[-2deg]">
            CERTIFICADOS × STARTUP WEEKEND
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black uppercase tracking-tighter leading-none mb-6 drop-shadow-[4px_4px_0_#fff]">
            EMITA SEU <span className="bg-black text-white px-4 skew-x-12 inline-block">CERTIFICADO</span>
          </h1>
          <p className="text-xl md:text-2xl font-bold text-black border-4 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#000] max-w-3xl transform rotate-1 mt-4 hover:-translate-y-1 hover:shadow-[12px_12px_0_#000] transition-all">
            Preencha seus dados para garantir a emissão correta do seu certificado de participação.<br/>
            <span className="text-blue-600 block mt-2">{"//"} As informações também compõem nossa prestação de contas.</span>
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 px-6 bg-black relative border-t-8 border-yellow-400">
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="mb-12 text-center text-white">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-techstars-green drop-shadow-[4px_4px_0_#fff]">
              PREENCHA SEUS DADOS
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest text-gray-400 border-b-2 border-dashed border-gray-600 inline-block pb-1">
              INFORME EXATAMENTE COMO ESTÁ NOS DOCUMENTOS.
            </p>
          </div>
          <CertificadoForm />
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
