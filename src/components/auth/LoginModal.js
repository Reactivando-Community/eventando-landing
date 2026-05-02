"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginModal({ isOpen, onClose, onSwitchToSignUp }) {
  const { signIn, forwardPassword } = useAuth();
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim() || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    const result = await signIn(identifier.trim(), password);
    setIsLoading(false);

    if (result.success) {
      setIdentifier("");
      setPassword("");
      onClose();
      router.push("/dashboard");
    } else {
      setError(result.error);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setResetSuccess("");

    if (!resetEmail.trim()) {
      setError("Preencha o email.");
      return;
    }

    setIsLoading(true);
    const result = await forwardPassword(resetEmail.trim());
    setIsLoading(false);

    if (result.success) {
      setResetSuccess("Email de recuperação enviado com sucesso!");
      setTimeout(() => {
        setIsForgotPassword(false);
        setResetSuccess("");
        setResetEmail("");
      }, 3000);
    } else {
      setError(result.error);
    }
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
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-white border-4 border-black shadow-[8px_8px_0_#000] p-8 md:p-10"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-2 bg-techstars-green rounded-b-xl border-b-4 border-x-4 border-black" />

            <h2 className="text-3xl font-black text-black uppercase tracking-tighter text-center mb-2 mt-2">
              {isForgotPassword ? "RECUPERAR SENHA" : "ENTRAR"}
            </h2>
            <p className="text-center text-gray-600 font-bold text-sm mb-8">
              {isForgotPassword
                ? "Digite seu email para receber o link de recuperação"
                : "Área exclusiva para inscritos no evento"}
            </p>

            {isForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-5">
                <div>
                  <label className="block text-black font-black uppercase text-sm mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                    disabled={isLoading}
                  />
                </div>

                {error && (
                  <div className="bg-red-100 border-4 border-red-600 text-red-800 px-4 py-3 font-bold text-sm">
                    {error}
                  </div>
                )}
                {resetSuccess && (
                  <div className="bg-green-100 border-4 border-techstars-green text-green-900 px-4 py-3 font-bold text-sm">
                    {resetSuccess}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="brutal-btn w-full px-8 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "ENVIANDO..." : "ENVIAR EMAIL →"}
                </button>

                <p className="text-center text-black font-bold text-sm mt-6">
                  Lembrou a senha?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setError("");
                      setResetSuccess("");
                    }}
                    className="underline underline-offset-4 decoration-techstars-green decoration-4 hover:text-techstars-green transition-colors"
                  >
                    Voltar para o login
                  </button>
                </p>
              </form>
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-black font-black uppercase text-sm mb-2">
                      EMAIL OU USUÁRIO
                    </label>
                    <input
                      type="text"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
                      disabled={isLoading}
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-black font-black uppercase text-sm">
                        SENHA
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setError("");
                        }}
                        className="text-xs font-bold text-gray-500 hover:text-black underline"
                      >
                        Esqueceu a senha?
                      </button>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
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
                    {isLoading ? "ENTRANDO..." : "ENTRAR →"}
                  </button>
                </form>

                <p className="text-center text-black font-bold text-sm mt-6">
                  Não tem conta?{" "}
                  <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className="underline underline-offset-4 decoration-techstars-green decoration-4 hover:text-techstars-green transition-colors"
                  >
                    Cadastre-se
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
