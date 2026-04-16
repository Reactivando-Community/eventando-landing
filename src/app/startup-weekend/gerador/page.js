"use client";

import { useState, useRef, useCallback } from "react";
import htmlToImage from "html-to-image";
import StartupWeekendSEO from "@/components/startup-weekend/StartupWeekendSEO";
import ArtTemplate from "@/components/startup-weekend/ArtTemplate";
import StartupWeekendFooter from "@/components/startup-weekend/StartupWeekendFooter";
import ImageCropper from "@/components/startup-weekend/ImageCropper";
import swForm from "@/network/hub-community/sw-form";

export default function GeradorArtesPage() {
  const [format, setFormat] = useState("9:16"); // '1:1' ou '9:16'
  const [role, setRole] = useState("Participante"); // Participante, Líder, Mentor, Voluntário
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [originalPhotoUrl, setOriginalPhotoUrl] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");

  // Use a stable reference to avoid re-renders issues with html-to-image
  const templateRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Se a foto for gigantesca (comum em câmeras de celular, 8MB+), o html-to-image engasga e demora 10s+, podendo retornar retângulos pretos por timeout de GPU.
    // Vamos comprimi-la e padronizá-la internamente em memória (downscale) antes de injetar na UI.
    const reader = new FileReader();
    reader.onload = (event) => {
       const img = new Image();
       img.onload = () => {
          const maxDim = 1500; // Resolução segura e nítida o suficiente para nossos alvos de 1080p
          let width = img.width;
          let height = img.height;
          
          if (width > maxDim || height > maxDim) {
             if (width > height) {
                 height = Math.round((height * maxDim) / width);
                 width = maxDim;
             } else {
                 width = Math.round((width * maxDim) / height);
                 height = maxDim;
             }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          // Respeita fundo transparente se for PNG
          const mimeType = file.type === "image/png" ? "image/png" : "image/jpeg";
          const optimizedDataUrl = canvas.toDataURL(mimeType, 0.85); // Compressão leve na variação de JPG
          
          setOriginalPhotoUrl(optimizedDataUrl);
          setIsCropping(true);
       };
       img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    if (originalPhotoUrl) URL.revokeObjectURL(originalPhotoUrl);
    setPhotoUrl(null);
    setOriginalPhotoUrl(null);
    setIsCropping(false);
  };

  const exportImage = useCallback(async () => {
    if (!templateRef.current) return;
    
    setIsExporting(true);
    setUploadProgress(0);
    setUploadError("");
    setUploadedUrl("");

    try {
      const htmlToImageMod = await import('html-to-image');
      
      const element = templateRef.current;
      
      // O cliente quer resolução 1080x1080 ou 1080x1920.
      const targetWidth = 1080;
      const renderedWidth = element.offsetWidth;
      const scalar = targetWidth / renderedWidth;

      const scaleOptions = {
        quality: 1,
        pixelRatio: scalar, 
        skipFonts: false,
      };

      // Safari/iOS Offscreen Render Bug Wipeout: 
      // O motor ForeignObject do Webkit muitas vezes não decodifica imagens a tempo de pintar no Canvas virtual clonado na 1ª tentativa, deixando a foto preta.
      // O warmup triplo + delay de respiração matemática resolvem isso porque garantem que o Webkit finalize de carregar as texturas da foto via GPU.
      for (let i = 0; i < 3; i++) {
        await htmlToImageMod.toPng(element, { pixelRatio: 0.1, skipFonts: true });
      }
      // Damos 350 milissegundos pro iOS puxar a foto hidratada na RAM antes do clique valendo
      await new Promise(r => setTimeout(r, 350));

      // Esta etapa agora pega a imagem definitiva, 100% destrancada na memória de vídeo do Safari nativo.
      const dataUrl = await htmlToImageMod.toPng(element, scaleOptions);
      
      // Conversão binária robusta para não sobrecarregar o limite de URL do motor Safari iOS
      const splitDataURI = dataUrl.split(',');
      const byteString = atob(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      // Proteção de compatibilidade File vs Blob pra formdata
      const fileObj = new File([blob], `SW-Anapolis-${role}-${format.replace(':', 'x')}.png`, { type: mimeString });

      // Enviamos pro Strapi AGORA e observamos a banda via Axios Event
      try {
         const uploadRes = await swForm.upload(fileObj, (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
            setUploadProgress(percent);
         });
         
         if (uploadRes && uploadRes.data && uploadRes.data[0]) {
            let fileUrl = uploadRes.data[0].url;
            if (fileUrl.startsWith('/')) {
               fileUrl = "https://manager.hubcommunity.io" + fileUrl;
            }

            setUploadedUrl(fileUrl);
         }
      } catch (uploadFail) {
         console.warn("Upload falhou ou foi bloqueado pelo CORS mobile:", uploadFail);
         setUploadError(uploadFail.message || "Erro desconhecido ao fazer upload.");
         setUploadProgress(100);
      }

      // 4. Agora que a Nuvem foi garantida e a rede finalizou, resetamos a tela e abrimos a porta pro iOS estourar o Download Local dele sem medo de suspender nada!
      setIsExporting(false);
      
      setTimeout(() => {
         const link = document.createElement("a");
         link.download = `SW-Anapolis-${role}-${format.replace(':','x')}.png`;
         link.href = dataUrl;
         link.click();
      }, 50);

    } catch (err) {
      console.error("Erro geral na geração da imagem:", err);
      alert("Ocorreu um erro ao exportar. Tente novamente.");
      setIsExporting(false);
      setUploadProgress(0);
    }
  }, [role, format]);


  const roles = ["Participante", "Líder", "Mentor", "Voluntário"];

  return (
    <main className="min-h-screen bg-[#f4f4f0] overflow-x-hidden text-black font-sans">
      <StartupWeekendSEO title="Gerador de Artes | Startup Weekend Anápolis" />

      <section className="py-12 md:py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 text-black">
            Gerador de<br/><span className="text-techstars-green drop-shadow-[2px_2px_0px_#000]">Artes</span>
          </h1>
          <p className="text-xl font-medium max-w-2xl">
            Crie sua foto de perfil pro evento. Escolha sua função, faça upload da sua foto preferida, baixe e compartilhe marcando no Instagram!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Coluna 1: Controles */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Bloco 1: Upload de Foto */}
            <div className="brutal-card p-6 md:p-8 space-y-4">
               <h3 className="text-2xl font-black uppercase">1. Sua Foto</h3>
               {originalPhotoUrl && isCropping ? (
                 <div className="space-y-4">
                   <p className="text-sm font-bold text-gray-500">
                     Ajuste o corte da sua foto na moldura abaixo (use o zoom para aproximar e arraste com o mouse/dedo).
                   </p>
                   <ImageCropper 
                     imageSrc={originalPhotoUrl} 
                     format={format} 
                     onCropDone={(url) => {
                        setPhotoUrl(url);
                        setIsCropping(false);
                     }}
                     onCancel={removePhoto}
                   />
                 </div>
               ) : photoUrl ? (
                  <div className="space-y-4">
                    <p className="text-sm font-bold text-green-600">
                      Foto posicionada com sucesso! Veja o resultado ao lado.
                    </p>
                    <button 
                      onClick={() => setIsCropping(true)}
                      className="brutal-btn-white w-full py-3 mb-2"
                    >
                      Ajustar Corte Novamente
                    </button>
                    <button 
                      onClick={removePhoto}
                      className="brutal-btn-white w-full py-3 text-red-500"
                    >
                      Remover / Trocar Foto
                    </button>
                  </div>
               ) : (
                 <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 brutal-border border-dashed border-techstars-green bg-techstars-green/10 cursor-pointer hover:bg-techstars-green/20 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-4 text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p className="mb-2 text-sm font-bold max-w-xs text-center"><span className="font-bold underline">Clique para enviar</span></p>
                            <p className="text-xs text-black/60 font-bold uppercase">PNG, JPG</p>
                        </div>
                        <input id="dropzone-file" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                 </div> 
               )}
            </div>

            {/* Bloco 2: Formato */}
            <div className="brutal-card p-6 md:p-8 space-y-4">
              <h3 className="text-2xl font-black uppercase">2. Formato</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setFormat('9:16')}
                  className={`py-3 px-4 brutal-border text-lg font-black uppercase transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5
                    ${format === '9:16' ? 'bg-yellow-400 text-black' : 'bg-white text-black'}
                  `}
                >
                  Stories (9:16)
                </button>
                <button 
                  onClick={() => setFormat('1:1')}
                  className={`py-3 px-4 brutal-border text-lg font-black uppercase transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5
                    ${format === '1:1' ? 'bg-yellow-400 text-black' : 'bg-white text-black'}
                  `}
                >
                  Feed (1:1)
                </button>
              </div>
            </div>

            {/* Bloco 3: Função */}
            <div className="brutal-card p-6 md:p-8 space-y-4">
              <h3 className="text-2xl font-black uppercase">3. Seu Papel</h3>
              <div className="grid grid-cols-2 gap-4">
                {roles.map(r => (
                  <button 
                    key={r}
                    onClick={() => setRole(r)}
                    className={`py-3 px-4 brutal-border text-base md:text-lg font-black uppercase transition-all shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none hover:-translate-y-0.5 hover:-translate-x-0.5
                      ${role === r ? 'bg-techstars-green text-black' : 'bg-white text-black'}
                    `}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Bloco 4: Nome */}
            <div className="brutal-card p-6 md:p-8 space-y-4">
              <h3 className="text-2xl font-black uppercase">4. Seu Nome</h3>
              <input 
                type="text" 
                placeholder="Ex: Pedro Goiania" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full brutal-border p-4 text-lg font-black uppercase placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-techstars-green bg-white"
                maxLength={25}
              />
            </div>
          </div>

          {/* Coluna 2: Preview e Download */}
          <div className="lg:col-span-7 flex flex-col items-center justify-start space-y-8">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-2xl font-black uppercase tracking-tight">Pré-visualização</h2>
              <button 
                onClick={exportImage}
                disabled={isExporting}
                className={`brutal-btn relative overflow-hidden py-3 px-8 text-black opacity-100 transition-colors ${isExporting ? 'bg-white disabled:opacity-100' : ''}`}
              >
                 {isExporting && (
                   <div 
                     className="absolute top-0 left-0 h-full bg-yellow-400 border-r-4 border-black transition-all ease-out duration-300 pointer-events-none"
                     style={{ width: `${uploadProgress}%` }}
                   />
                 )}
                 <span className="relative z-10 font-black">
                    {isExporting ? `SALVANDO NA NUVEM ${uploadProgress}%` : 'BAIXAR ARTE'}
                 </span>
              </button>
            </div>

            {/* Error Message for Debugging Upload Fails */}
            {uploadError && (
               <div className="w-full bg-red-500 text-white border-4 border-black p-4 brutal-shadow-sm font-bold text-sm md:text-base text-center mt-2 flex flex-col gap-2 uppercase tracking-tight">
                 🚫 Erro ao subir pra nuvem: {uploadError}
               </div>
            )}

            {uploadedUrl && (
              <div className="w-full bg-techstars-green text-black border-4 border-black p-4 brutal-shadow-sm font-bold text-sm md:text-base text-center mt-2 flex flex-col gap-2">
                ✅ Upload concluído na nuvem!
                <a href={uploadedUrl} className="brutal-btn-white py-2 px-4 shadow-[4px_4px_0_#000] inline-block uppercase text-xs">
                  ABRIR LINK PÚBLICO
                </a>
              </div>
            )}

            {/* Preview Area container to keep it constrained but centered */}
            <div className="w-full h-auto flex justify-center bg-gray-200 border-2 border-dashed border-gray-400 p-4 md:p-8 rounded-lg overflow-hidden relative">
               {/* Fixed width constraints to simulate the original size of export */}
               <div className={`transition-all duration-300 ease-in-out ${format === '9:16' ? 'w-[300px] md:w-[360px]' : 'w-full max-w-[640px]'}`}>
                 <ArtTemplate 
                    ref={templateRef} 
                    photoUrl={photoUrl} 
                    role={role} 
                    format={format} 
                    name={name}
                 />
               </div>
            </div>
            
            <p className="text-center font-medium text-black max-w-sm">
               Ao baixar a arte, use no seu Instagram e marque <br/>
               <span className="font-black bg-techstars-green px-1">@startupweekendanapolis</span>
            </p>
          </div>
        </div>
      </section>
      
      <StartupWeekendFooter />
    </main>
  );
}
