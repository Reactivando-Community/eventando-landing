"use client";

import { useState, useEffect } from "react";

const ACCESS_PASSWORD = process.env.NEXT_PUBLIC_INSCRITOS_PASSWORD || "sw2026";

export default function InscritosLayout({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = sessionStorage.getItem("inscritos_auth");
    if (saved === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("inscritos_auth", "true");
      setError("");
    } else {
      setError("Senha incorreta. Tente novamente.");
      setPassword("");
    }
  };

  if (checking) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black"></div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] px-4">
        <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0_#9333ea] max-w-md w-full">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-black shadow-[4px_4px_0_#9333ea]">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter text-center mb-2">
            ÁREA RESTRITA
          </h2>
          <p className="text-gray-600 font-bold text-sm text-center mb-8 border-l-4 border-black pl-3">
            Digite a senha para acessar a lista de inscritos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-black font-black uppercase text-sm mb-2">
                SENHA DE ACESSO
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoFocus
                className="w-full bg-[#f4f4f0] border-4 border-black text-black px-4 py-3 font-bold placeholder:text-gray-400 focus:outline-none focus:bg-white focus:shadow-[4px_4px_0_#000] focus:-translate-y-1 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-500 border-4 border-black text-white p-3 shadow-[4px_4px_0_#000] font-black uppercase tracking-widest text-xs text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-6 py-4 bg-techstars-green text-black font-black uppercase tracking-widest text-lg border-4 border-black shadow-[6px_6px_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[10px_10px_0_#000] hover:bg-yellow-400 transition-all"
            >
              ENTRAR ➔
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
