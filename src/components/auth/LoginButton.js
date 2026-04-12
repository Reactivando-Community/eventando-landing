"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginButton() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Link
      href={isAuthenticated ? "/dashboard" : "/?login=true"}
      className="inline-flex items-center px-6 py-3 bg-white text-black text-base sm:text-lg md:text-xl font-black uppercase brutal-shadow-md brutal-border hover:shadow-[6px_6px_0px_#000] transition-all transform -rotate-1"
    >
      {isAuthenticated ? "👤 MEU TIME" : "👤 ENTRAR"}
    </Link>
  );
}
