"use client";

import { useState } from "react";
import VMasker from "vanilla-masker";
import hubCommunity from "@/network/hub-community";

export default function VoluntarioForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleCpfChange = (value) => {
    setCpf(VMasker.toPattern(value, "999.999.999-99"));
  };

  const handleWhatsappChange = (value) => {
    setWhatsapp(VMasker.toPattern(value, "(99) 99999-9999"));
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      setError("Precisamos de um e-mail válido.");
      return false;
    }

    if (!linkedin || !linkedin.trim()) {
      setError("Precisamos do seu LinkedIn.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    setError("");

    try {
      await hubCommunity.swForm.create({
        name: name.trim(),
        cpf: cpf.replace(/\D/g, ""),
        date_of_birth: dateOfBirth,
        whatsapp: whatsapp.replace(/\D/g, ""),
        email: email.trim(),
        college: linkedin.trim(),
        college_course: "VOLUNTÁRIO",
      });

      setSubmitted(true);
    } catch (err) {
      const status = err.response?.status;
      const strapiError = err.response?.data?.error;

      if (
        strapiError?.message?.includes("unique") ||
        strapiError?.message?.includes("already")
      ) {
        setError("Calma lá! Esse CPF já possuí uma inscrição.");
      } else if (err.code === "ECONNABORTED" || err.message?.includes("timeout")) {
        setError("A conexão demorou demais. Verifica sua internet e tenta de novo.");
      } else if (err.message === "Network Error") {
        setError("Sem conexão com o servidor. Verifica sua internet e tenta de novo.");
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
          Recebemos sua inscrição! Nossa equipe vai entrar em contato no WhatsApp com os próximos passos da operação. Bora fazer esse evento acontecer.
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
        Seja parte da equipe que faz o Startup Weekend Anápolis acontecer. Preencha seus dados e a gente te chama.
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

        <div>
          <label className="block text-black font-black uppercase text-sm mb-2">
            E-MAIL *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
          />
        </div>

        <div>
          <label className="block text-black font-black uppercase text-sm mb-2">
            LINKEDIN *
          </label>
          <input
            type="text"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="linkedin.com/in/seu-perfil ou seu @"
            className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
          />
        </div>

        {error && (
          <div className="bg-red-500 border-4 border-black text-white p-4 shadow-[6px_6px_0_#000] font-black uppercase tracking-widest text-sm text-center">
            ERRO: {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full px-8 py-5 bg-techstars-green text-black font-black uppercase tracking-widest text-xl border-4 border-black flex justify-center items-center shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#000] hover:bg-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:translate-x-0 disabled:hover:shadow-[6px_6px_0_#000] mt-6"
        >
          {isLoading ? "Enviando pro QG..." : "QUERO SER VOLUNTÁRIO ➔"}
        </button>
      </div>
    </div>
  );
}
