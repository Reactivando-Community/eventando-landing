"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import VMasker from "vanilla-masker";
import hubCommunity from "@/network/hub-community";

const MAX_VIDEO_SIZE_MB = 100;
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024;

export default function ApadrinhamentoForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [college, setCollege] = useState("");
  const [collegeCourse, setCollegeCourse] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleCpfChange = (value) => {
    setCpf(VMasker.toPattern(value, "999.999.999-99"));
  };

  const handleWhatsappChange = (value) => {
    setWhatsapp(VMasker.toPattern(value, "(99) 99999-9999"));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      setError(`O vídeo deve ter no máximo ${MAX_VIDEO_SIZE_MB}MB.`);
      e.target.value = "";
      return;
    }

    setError("");
    setVideoFile(file);
  };

  const validate = () => {
    if (!name || name.trim().length < 3) {
      setError("Faltou seu nome completo.");
      return false;
    }

    const cpfDigits = cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) {
      setError("Poxa, esse CPF não parece válido.");
      return false;
    }

    if (!dateOfBirth) {
      setError("Faltou sua data de nascimento.");
      return false;
    }

    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10 || whatsappDigits.length > 11) {
      setError("Um WhatsApp válido, por favor.");
      return false;
    }

    if (!videoFile) {
      setError("Sem vídeo não dá pra avaliar sua aplicação!");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setUploadProgress(0);
    setError("");

    try {
      // Step 1: Upload the video file
      const uploadResponse = await hubCommunity.swForm.upload(
        videoFile,
        (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setUploadProgress(percent);
        }
      );

      const uploadedFile = uploadResponse.data[0];

      // Step 2: Create the sw-form entry with the uploaded file ID
      await hubCommunity.swForm.create({
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ""),
        date_of_birth: dateOfBirth,
        whatsapp: whatsapp.replace(/\D/g, ""),
        college: college.trim() || null,
        college_course: collegeCourse.trim() || null,
        video: uploadedFile.id,
      });

      setSubmitted(true);
    } catch (err) {
      const strapiError = err.response?.data?.error;
      if (
        strapiError?.message?.includes("unique") ||
        strapiError?.message?.includes("already")
      ) {
        setError("Calma lá! Esse CPF já possuí uma inscrição.");
      } else {
        setError("Pane no sistema! Tente de novo ou chame a gente no WhatsApp.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-yellow-400 border-4 border-black shadow-[12px_12px_0_#fff] p-8 md:p-12 text-center transform md:rotate-1">
        <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_#fff] border-4 border-black">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-4">
          INSCRIÇÃO ENVIADA!
        </h3>
        <p className="text-black font-bold text-lg md:text-xl max-w-md mx-auto">
          Recebemos sua aplicação com sucesso. Nossos recrutadores vão analisar seu pitch e contaremos com você no WhatsApp em breve. Fique colado no seu celular!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_#9333ea]">
      <h3 className="text-3xl md:text-4xl font-black text-black uppercase mb-4 tracking-tighter border-b-4 border-black pb-4 inline-block w-full">
        DADOS DA INSCRIÇÃO
      </h3>
      <p className="text-gray-800 font-bold mb-8 text-sm md:text-base border-l-4 border-black pl-4">
        Preencha com exatidão. Mostre por que você merece estar no centro da arena de inovação de Anápolis.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-black font-black uppercase text-sm mb-2">
            NOME COMPLETO *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite como está na sua identidade"
            className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black font-black uppercase text-sm mb-2">
              CPF *
            </label>
            <input
              type="text"
              value={cpf}
              onChange={(e) => handleCpfChange(e.target.value)}
              placeholder="000.000.000-00"
              maxLength={14}
              className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
            />
          </div>

          <div>
            <label className="block text-black font-black uppercase text-sm mb-2">
              DATA DE NASCIMENTO *
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all uppercase"
            />
          </div>
        </div>

        <div>
          <label className="block text-black font-black uppercase text-sm mb-2">
            WHATSAPP *
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => handleWhatsappChange(e.target.value)}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-black font-black uppercase text-sm mb-2">
              INSTITUIÇÃO DE ENSINO <span className="text-gray-500 font-bold text-xs">(Opcional)</span>
            </label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Aonde você estuda?"
              className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
            />
          </div>

          <div>
            <label className="block text-black font-black uppercase text-sm mb-2">
              CURSO <span className="text-gray-500 font-bold text-xs">(Opcional)</span>
            </label>
            <input
              type="text"
              value={collegeCourse}
              onChange={(e) => setCollegeCourse(e.target.value)}
              placeholder="O que você estuda?"
              className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-black font-black uppercase text-sm mb-2">
            VÍDEO PITCH DE APRESENTAÇÃO *
          </label>
          <p className="text-gray-600 text-xs font-bold mb-3 border-l-2 border-black pl-2">
            Crie um vídeo rápido (até 2 minutos) se apresentando. Queremos ouvir de você o motivo de merecer essa chance. Capricha. (Máx {MAX_VIDEO_SIZE_MB}MB)
          </p>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full bg-[#f4f4f0] border-4 border-black text-black p-2 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all file:mr-4 file:py-2 file:px-4 file:border-4 file:border-black file:text-sm file:font-black file:uppercase file:bg-yellow-400 file:text-black hover:file:bg-black hover:file:text-white file:cursor-pointer file:transition-colors file:shadow-[2px_2px_0_#000]"
          />
          {videoFile && (
             <p className="text-black font-black text-sm mt-3 bg-green-400 border-4 border-black p-2 inline-block shadow-[4px_4px_0_#000]">
               [OK] {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)}MB)
             </p>
          )}
        </div>

        {error && (
          <div className="bg-red-500 border-4 border-black text-white p-4 shadow-[6px_6px_0_#000] font-black uppercase tracking-widest text-sm text-center">
            ERRO: {error}
          </div>
        )}

        {isLoading && (
          <div className="border-4 border-black p-4 bg-black text-white">
            <div className="flex justify-between text-sm font-black uppercase mb-2 tracking-widest">
              <span>🚀 CARREGANDO APLICAÇÃO...</span>
              <span className="text-techstars-green">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-6 border-2 border-zinc-500">
              <div
                className="bg-techstars-green h-full transition-all duration-300 relative overflow-hidden"
                style={{ width: `${uploadProgress}%` }}
              >
                 <div className="absolute inset-0 bg-black opacity-20 transform -skew-x-12 stripe-pattern"></div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full px-8 py-5 bg-techstars-green text-black font-black uppercase tracking-widest text-xl border-4 border-black flex justify-center items-center shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#000] hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[6px_6px_0_#000] mt-6"
        >
          {isLoading ? "Enviando pro QG..." : "ENVIAR MINHA INSCRIÇÃO ➔"}
        </button>
      </div>
    </div>
  );
}
