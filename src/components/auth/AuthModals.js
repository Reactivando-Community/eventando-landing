"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function AuthModalsInner() {
  const [activeModal, setActiveModal] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("login") === "true") {
      setActiveModal("login");
    } else if (searchParams.get("signup") === "true") {
      setActiveModal("signup");
    }
  }, [searchParams]);

  const close = useCallback(() => {
    setActiveModal(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("login");
    url.searchParams.delete("signup");
    router.replace(url.pathname + url.search, { scroll: false });
  }, [router]);

  return (
    <>
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={close}
        onSwitchToSignUp={() => setActiveModal("signup")}
      />
      <SignUpModal
        isOpen={activeModal === "signup"}
        onClose={close}
        onSwitchToLogin={() => setActiveModal("login")}
      />
    </>
  );
}

export default function AuthModals() {
  return (
    <Suspense fallback={null}>
      <AuthModalsInner />
    </Suspense>
  );
}
