"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import VMasker from "vanilla-masker";
import { useAuth } from "@/contexts/AuthContext";

export default function SignUpModal({ isOpen, onClose, onSwitchToLogin }) {
  const router = useRouter();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationSent, setConfirmationSent] = useState(false);
  const [sentToEmail, setSentToEmail] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(VMasker.toPattern(value, "(99) 99999-9999"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !username.trim() || !email.trim() || !password) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);
    const result = await signUp({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password,
      phone: phone.replace(/\D/g, "") || undefined,
    });
    setIsLoading(false);

    if (result.success) {
      if (result.requiresConfirmation) {
        setSentToEmail(email.trim());
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPhone("");
        setConfirmationSent(true);
        return;
      }
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");
      onClose();
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  const handleClose = () => {
    setConfirmationSent(false);
    setSentToEmail("");
    setError("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0_#000] p-8 md:p-10 max-h-[90vh] overflow-y-auto"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-techstars-green rounded-b-xl border-b-4 border-x-4 border-black" />

            {confirmationSent ? (
              <div className="text-center">
                <div className="mb-6 mx-auto w-20 h-20 bg-techstars-green border-4 border-black shadow-[4px_4px_0_#000] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" className="w-10 h-10">
                    <path d="M4 6l8 7 8-7M4 6v12h16V6" strokeLinecap="square" />
                  </svg>
                </div>

                <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-3">
                  EMAIL ENVIADO!
                </h2>

                <p className="text-gray-700 font-bold mb-2">
                  Enviamos um link de confirmação para:
                </p>
                <p className="text-black font-black text-lg mb-6 break-all">
                  {sentToEmail}
                </p>
                <p className="text-gray-600 font-bold text-sm mb-8">
                  Verifique sua caixa de entrada (e a pasta de spam) e clique no link para ativar sua conta.
                </p>

                <button
                  onClick={handleClose}
                  className="brutal-btn w-full px-8 py-4 text-lg"
                >
                  ENTENDI →
                </button>
              </div>
            ) : (
              <>
            <h2 className="text-3xl font-black text-black uppercase tracking-tighter text-center mb-2 mt-2">
              CRIAR CONTA
            </h2>
            <p className="text-center text-gray-600 font-bold text-sm mb-8">
              Área exclusiva para inscritos no evento
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-black font-black uppercase text-sm mb-2">
                  NOME COMPLETO *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-black font-black uppercase text-sm mb-2">
                  NOME DE USUÁRIO *
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="meu_usuario"
                  className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-black font-black uppercase text-sm mb-2">
                  EMAIL *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-black font-black uppercase text-sm mb-2">
                  SENHA *
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-black font-black uppercase text-sm mb-2">
                  WHATSAPP
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-100 border-4 border-red-600 text-red-800 px-4 py-3 font-bold text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="brutal-btn w-full px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "CRIANDO..." : "CRIAR CONTA →"}
              </button>
            </form>

            <p className="text-center text-black font-bold text-sm mt-6">
              Já tem conta?{" "}
              <button
                onClick={onSwitchToLogin}
                className="underline underline-offset-4 decoration-techstars-green decoration-4 hover:text-techstars-green transition-colors"
              >
                Entre
              </button>
            </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
