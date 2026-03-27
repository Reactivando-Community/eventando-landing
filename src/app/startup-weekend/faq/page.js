import StartupWeekendFullFaq from "@/components/startup-weekend/StartupWeekendFullFaq";
import Link from "next/link";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";

export default function StartupWeekendFaqPage() {
  return (
    <main className="min-h-screen bg-[#f4f4f0]">
      <StartupWeekendSEO />
      
      <section className="py-24 px-6 bg-yellow-400 brutal-border-b relative overflow-hidden">
         <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />
         <div className="max-w-4xl mx-auto relative z-10">
            <Link href="/startup-weekend" className="inline-flex items-center text-black font-black uppercase text-sm mb-12 hover:underline tracking-widest">
              &larr; Voltar para a Home
            </Link>
            <h1 className="text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-none shadow-[4px_4px_0_#fff] drop-shadow-[4px_4px_0_#fff]">
              Manual de<br/>
              <span className="bg-black text-techstars-green px-4 py-2 inline-block shadow-[6px_6px_0_#fff]">Sobrevivência</span>
            </h1>
            <p className="mt-8 text-xl font-bold text-black border-l-4 border-black pl-4">
               Sem enrolação. O FAQ completo para você dominar as regras do jogo no techstars_ Startup Weekend.
            </p>
         </div>
      </section>

      <section className="py-24 px-6 bg-[#f4f4f0]">
        <div className="max-w-4xl mx-auto">
           <StartupWeekendFullFaq />
        </div>
      </section>

      <StartupWeekendFooter />
    </main>
  );
}
