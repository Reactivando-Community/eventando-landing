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
      setError("Informe seu nome completo.");
      return false;
    }

    const cpfDigits = cpf.replace(/\D/g, "");
    if (cpfDigits.length !== 11) {
      setError("Informe um CPF válido.");
      return false;
    }

    if (!dateOfBirth) {
      setError("Informe sua data de nascimento.");
      return false;
    }

    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (whatsappDigits.length < 10 || whatsappDigits.length > 11) {
      setError("Informe um número de WhatsApp válido.");
      return false;
    }

    if (!videoFile) {
      setError("Envie um vídeo de apresentação.");
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
        setError("Este CPF já possui uma inscrição. Cada pessoa pode se inscrever apenas uma vez.");
      } else {
        setError("Ocorreu um erro ao enviar sua inscrição. Tente novamente ou entre em contato pelo WhatsApp.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center"
      >
        <div className="w-20 h-20 bg-techstars-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-techstars-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Inscrição enviada!
        </h3>
        <p className="text-techstars-slate text-lg max-w-md mx-auto">
          Recebemos sua solicitação de apadrinhamento. Entraremos em contato pelo WhatsApp informado para as próximas etapas.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
        Formulário de Inscrição
      </h3>
      <p className="text-techstars-slate mb-8">
        Preencha seus dados e envie um vídeo curto contando por que você quer participar do Startup Weekend.
      </p>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            Nome completo *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome completo"
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors placeholder:text-zinc-500"
          />
        </div>

        {/* CPF */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            CPF *
          </label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => handleCpfChange(e.target.value)}
            placeholder="000.000.000-00"
            maxLength={14}
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors placeholder:text-zinc-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            Data de nascimento *
          </label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors [color-scheme:dark]"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            WhatsApp *
          </label>
          <input
            type="text"
            value={whatsapp}
            onChange={(e) => handleWhatsappChange(e.target.value)}
            placeholder="(00) 00000-0000"
            maxLength={15}
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors placeholder:text-zinc-500"
          />
        </div>

        {/* College */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            Instituição de ensino
          </label>
          <input
            type="text"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            placeholder="Ex: UniEVANGÉLICA, UEG, etc."
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors placeholder:text-zinc-500"
          />
        </div>

        {/* College Course */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            Curso
          </label>
          <input
            type="text"
            value={collegeCourse}
            onChange={(e) => setCollegeCourse(e.target.value)}
            placeholder="Ex: Engenharia de Software, Administração, etc."
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors placeholder:text-zinc-500"
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-white font-bold text-sm mb-2">
            Vídeo de apresentação *
          </label>
          <p className="text-zinc-400 text-sm mb-3">
            Grave um vídeo curto (até 2 minutos) contando quem você é, por que quer participar e como o evento pode impactar sua vida. Máximo {MAX_VIDEO_SIZE_MB}MB.
          </p>
          <input
            type="file"
            accept="video/*"
            onChange={handleVideoChange}
            className="w-full bg-zinc-900 border border-zinc-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-techstars-green transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-techstars-green file:text-black hover:file:bg-[#45d171] file:cursor-pointer file:transition-colors"
          />
          {videoFile && (
            <p className="text-techstars-green text-sm mt-2">
              {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(1)}MB)
            </p>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Upload progress */}
        {isLoading && (
          <div>
            <div className="flex justify-between text-sm text-techstars-slate mb-2">
              <span>Enviando...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-2">
              <div
                className="bg-techstars-green h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full px-8 py-4 bg-techstars-green hover:bg-[#45d171] text-black font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-techstars-green/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? "Enviando inscrição..." : "Enviar inscrição"}
        </button>
      </div>
    </div>
  );
}
