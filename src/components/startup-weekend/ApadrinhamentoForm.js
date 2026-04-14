"use client";

import eventConfig from "@/data/startup-weekend-event";

export default function ApadrinhamentoForm() {
  return (
    <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_#9333ea] text-center">
      <h3 className="text-3xl md:text-4xl font-black text-black uppercase mb-6 tracking-tighter">
        INSCRIÇÕES ENCERRADAS
      </h3>
      <div className="text-black font-bold text-lg md:text-xl space-y-4">
        <p>As inscrições encerraram no dia 10/04.</p>
        <p>O resultado de todas as inscrições será enviado no dia 15/04.</p>
        <p className="pt-6">
          Qualquer dúvida, entre no nosso{" "}
          <a
            href="https://chat.whatsapp.com/C2I5N2stMUTGPkYZ6QnRIx?mode=gi_t"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-black font-black"
          >
            grupo do WhatsApp
          </a>.
        </p>
      </div>
    </div>
  );
}
