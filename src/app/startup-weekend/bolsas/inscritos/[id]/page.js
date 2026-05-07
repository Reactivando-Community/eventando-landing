"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import hubCommunity from "@/network/hub-community";

export default function InscritoDetailPage({ params }) {
  const [inscrito, setInscrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchInscrito = async () => {
      try {
        const response = await hubCommunity.swForm.getById(params.id, {
          populate: "*",
        });
        const data = response.data?.data || response.data;
        if (data) {
          setInscrito(data);
        } else {
          setError("Inscrição não encontrada.");
        }
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar a inscrição.");
      } finally {
        setLoading(false);
      }
    };

    fetchInscrito();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  if (error || !inscrito) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-red-500 border-4 border-black p-6 text-white text-center font-black uppercase text-xl shadow-[8px_8px_0_#000]">
          {error || "Inscrição não encontrada"}
        </div>
        <Link 
          href="/startup-weekend/bolsas/inscritos"
          className="mt-8 block w-fit mx-auto px-6 py-3 bg-black text-white font-black uppercase border-4 border-black hover:bg-yellow-400 hover:text-black hover:shadow-[6px_6px_0_#000] hover:-translate-y-1 transition-all"
        >
          ➔ VOLTAR PARA A LISTA
        </Link>
      </div>
    );
  }

  const attrs = inscrito.attributes || inscrito;
  
  // Extract video URL (handle Strapi v4 nested structure or flat structure)
  const videoData = attrs.video?.data?.attributes || attrs.video?.attributes || attrs.video;
  const videoUrlRaw = videoData?.url;
  
  // Ensure the video URL has the correct domain if it's relative
  const getFullVideoUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http")) return url;
    
    // Hub Community Base URL without /api
    const baseUrl = (process.env.NEXT_PUBLIC_HUB_COMMUNITY_API_URL || "https://manager.hubcommunity.io/api").replace(/\/api\/?$/, '');
    return `${baseUrl}${url}`;
  };

  const videoUrl = getFullVideoUrl(videoUrlRaw);

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b-4 border-black pb-6">
         <div>
             <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
                DETALHES DA INSCRIÇÃO
             </h1>
             <p className="mt-2 text-gray-800 font-bold text-lg border-l-4 border-techstars-green pl-4 uppercase">
                #ID {inscrito.documentId || inscrito.id}
             </p>
         </div>
         <Link 
            href="/startup-weekend/bolsas/inscritos"
            className="whitespace-nowrap px-6 py-3 bg-white text-black font-black uppercase tracking-widest border-4 border-black shadow-[4px_4px_0_#000] hover:bg-black hover:text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_#000] transition-all flex items-center justify-center"
         >
            ➔ VOLTAR
         </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0_#9333ea] h-fit">
           <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 mb-6">Dados do(a) Candidato(a)</h2>
           
           <div className="space-y-6">
              <div>
                 <label className="block text-gray-500 font-black uppercase text-xs mb-1">Nome Completo</label>
                 <p className="text-2xl font-bold bg-[#f4f4f0] border-4 border-black p-3 uppercase break-words">
                   {attrs.name}
                 </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-gray-500 font-black uppercase text-xs mb-1">CPF</label>
                     <p className="text-lg font-bold bg-[#f4f4f0] border-4 border-black p-3">
                       {attrs.cpf}
                     </p>
                  </div>
                  <div>
                     <label className="block text-gray-500 font-black uppercase text-xs mb-1">Data de Nasc.</label>
                     <p className="text-lg font-bold bg-[#f4f4f0] border-4 border-black p-3">
                       {attrs.date_of_birth ? new Date(attrs.date_of_birth).toLocaleDateString('pt-BR') : 'N/A'}
                     </p>
                  </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                     <label className="block text-gray-500 font-black uppercase text-xs mb-1">WhatsApp</label>
                     <p className="text-lg font-bold bg-[#f4f4f0] border-4 border-black p-3 break-all">
                       {attrs.whatsapp}
                     </p>
                  </div>
                  <div>
                     <label className="block text-gray-500 font-black uppercase text-xs mb-1">Email</label>
                     <p className="text-lg font-bold bg-[#f4f4f0] border-4 border-black p-3 break-all">
                       {attrs.email}
                     </p>
                  </div>
              </div>

              <div className="pt-4 border-t-2 border-dashed border-gray-300">
                  <h3 className="text-xl font-black uppercase mb-4">Informações Acadêmicas</h3>
                  <div className="space-y-4">
                      <div>
                         <label className="block text-gray-500 font-black uppercase text-xs mb-1">Instituição de Ensino</label>
                         <p className="text-lg font-bold bg-[#f4f4f0] border-4 border-black p-3 uppercase">
                           {attrs.college || "Não informado"}
                         </p>
                      </div>
                      <div>
                         <label className="block text-gray-500 font-black uppercase text-xs mb-1">Curso</label>
                         <p className="text-lg font-bold bg-[#f4f4f0] border-4 border-black p-3 uppercase">
                           {attrs.college_course || "Não informado"}
                         </p>
                      </div>
                  </div>
              </div>
              
              <div className="pt-4 border-t-2 border-dashed border-gray-300">
                <p className="text-sm font-bold text-gray-500">
                    Inscrição realizada em: <br />
                    <span className="text-black uppercase">{new Date(attrs.createdAt).toLocaleString('pt-BR')}</span>
                </p>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-6 h-full">
            <div className="bg-yellow-400 border-4 border-black p-8 shadow-[12px_12px_0_#000] flex-grow flex flex-col">
                <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-4 mb-6 text-black">Vídeo Pitch</h2>
                
                <div className="flex-grow flex flex-col justify-center items-center bg-black border-4 border-black overflow-hidden relative min-h-[300px]">
                    {videoUrl ? (
                         <video 
                           ref={videoRef}
                           className="w-full h-full max-h-[500px] object-contain" 
                           controls 
                           crossOrigin="anonymous"
                           preload="metadata"
                           onLoadedMetadata={() => {
                             if (videoRef.current) videoRef.current.playbackRate = 1.5;
                           }}
                         >
                            <source src={videoUrl} type={videoData?.mime || "video/mp4"} />
                            Seu navegador não suporta a visualização de vídeos.
                         </video>
                    ) : (
                        <div className="text-center p-8 flex flex-col items-center">
                            <span className="text-6xl mb-4">⚠️</span>
                            <h3 className="text-white font-black uppercase text-xl">Vídeo não encontrado</h3>
                            <p className="text-gray-400 font-bold mt-2">O candidato pode não ter enviado o vídeo ou ocorreu um erro no upload.</p>
                        </div>
                    )}
                </div>
                
                {videoUrl && (
                    <div className="mt-6">
                         <a 
                           href={videoUrl} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="w-full block text-center px-6 py-4 bg-black text-white font-black uppercase tracking-widest border-auto border-black hover:bg-white hover:text-black border-4 hover:shadow-[4px_4px_0_#000] hover:-translate-y-1 transition-all"
                         >
                           DOWNLOAD / ABRIR VÍDEO
                         </a>
                    </div>
                )}
            </div>
            
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_#22c55e]">
                <h3 className="text-xl font-black uppercase mb-2">Ações</h3>
                <div className="flex gap-4">
                    <a 
                       href={`https://wa.me/55${attrs.whatsapp.replace(/\D/g, '')}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex-1 bg-green-500 text-black border-4 border-black px-4 py-3 font-black uppercase text-sm text-center shadow-[4px_4px_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all"
                    >
                       Chamar no Whats
                    </a>
                    <a 
                       href={`mailto:${attrs.email}`} 
                       className="flex-1 bg-blue-500 text-white border-4 border-black px-4 py-3 font-black uppercase text-sm text-center shadow-[4px_4px_0_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0_#000] transition-all"
                    >
                       Enviar Email
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
