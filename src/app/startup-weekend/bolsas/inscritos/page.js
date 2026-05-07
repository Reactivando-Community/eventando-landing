"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import hubCommunity from "@/network/hub-community";

export default function InscritosPage() {
  const [inscritos, setInscritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const downloadCSV = () => {
    const headers = ["Nome", "CPF", "Email", "WhatsApp", "Instituição", "Curso", "Data de Nascimento", "Data de Inscrição"];
    const rows = inscritos.map((item) => {
      const a = item.attributes || item;
      return [
        a.name,
        a.cpf,
        a.email || "",
        a.whatsapp,
        a.college || "",
        a.college_course || "",
        a.date_of_birth || "",
        a.createdAt ? new Date(a.createdAt).toLocaleString("pt-BR") : "",
      ].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`);
    });
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `inscritos-bolsas-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    const fetchInscritos = async () => {
      try {
        const response = await hubCommunity.swForm.getAll({
          populate: "*",
          sort: ["createdAt:desc"],
          "pagination[pageSize]": 100
        });
        // Handle Strapi v4 or standard array format
        const data = response.data?.data || response.data || [];
        setInscritos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar as inscrições.");
      } finally {
        setLoading(false);
      }
    };

    fetchInscritos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-500 border-4 border-black p-6 text-white text-center font-black uppercase text-xl shadow-[8px_8px_0_#000]">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-12">
         <h1 className="text-5xl md:text-6xl font-black text-black uppercase tracking-tighter border-b-4 border-black pb-4 inline-block w-full">
            INSCRITOS - BOLSAS
         </h1>
         <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-gray-800 font-bold text-lg md:text-xl border-l-4 border-techstars-green pl-4">
               Acompanhe aqui todas as aplicações recebidas para o Startup Weekend.
            </p>
            {inscritos.length > 0 && (
              <button
                onClick={downloadCSV}
                className="whitespace-nowrap px-6 py-3 bg-black text-white font-black uppercase tracking-widest text-sm border-4 border-black shadow-[4px_4px_0_#9333ea] hover:bg-yellow-400 hover:text-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#9333ea] transition-all"
              >
                ⬇ BAIXAR CSV
              </button>
            )}
         </div>
      </div>

      {inscritos.length === 0 ? (
         <div className="bg-yellow-400 border-4 border-black p-8 text-center shadow-[8px_8px_0_#000]">
             <h2 className="text-3xl font-black uppercase mb-2">Nenhuma inscrição ainda</h2>
             <p className="font-bold">Quando a galera começar a mandar, vai aparecer tudo aqui!</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inscritos.map((item) => {
            const attrs = item.attributes || item;
            const id = item.documentId || item.id;
            
            return (
              <div 
                key={id} 
                className="bg-white border-4 border-black p-6 flex flex-col justify-between shadow-[8px_8px_0_#9333ea] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0_#9333ea] transition-all"
              >
                 <div>
                   <h2 className="text-2xl font-black uppercase line-clamp-1 mb-2" title={attrs.name}>
                     {attrs.name}
                   </h2>
                   <div className="space-y-1 mb-4 flex-grow">
                     <p className="text-sm font-bold text-gray-700 bg-gray-100 p-1 border-l-2 border-black">
                       <span className="uppercase text-xs mr-2">Email:</span> 
                       <span className="break-all">{attrs.email}</span>
                     </p>
                     <p className="text-sm font-bold text-gray-700 bg-gray-100 p-1 border-l-2 border-black">
                       <span className="uppercase text-xs mr-2">Whats:</span> 
                       {attrs.whatsapp}
                     </p>
                     <p className="text-sm font-bold text-gray-700 bg-gray-100 p-1 border-l-2 border-black">
                       <span className="uppercase text-xs mr-2">Ensino:</span> 
                       {attrs.college || "Não informado"}
                     </p>
                     <p className="text-sm font-bold text-gray-700 bg-gray-100 p-1 border-l-2 border-black">
                       <span className="uppercase text-xs mr-2">Curso:</span> 
                       {attrs.college_course || "Não informado"}
                     </p>
                     <p className="text-sm font-bold text-gray-700 bg-gray-100 p-1 border-l-2 border-black">
                       <span className="uppercase text-xs mr-2">Dt. Nasc:</span> 
                       {attrs.date_of_birth?.split('T')[0] || "Não informado"}
                     </p>
                   </div>
                 </div>

                 <Link 
                   href={`/startup-weekend/bolsas/inscritos/${id}`}
                   className="mt-4 block text-center w-full px-4 py-3 bg-techstars-green text-black font-black uppercase text-sm border-4 border-black hover:bg-black hover:text-white transition-colors"
                 >
                   VER DETALHES ➔
                 </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
