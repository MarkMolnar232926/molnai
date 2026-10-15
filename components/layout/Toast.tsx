"use client";

import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { useUI } from "@/lib/store";

export function Toast() {
  const toast = useUI((s) => s.toast);
  const setCartOpen = useUI((s) => s.setCartOpen);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => useUI.setState({ toast: null }), 3200);
    return () => window.clearTimeout(t);
  }, [toast]);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 top-20 z-[80] flex justify-center px-4">
      <AnimatePresence>
        {toast && (
          <m.div
            key={toast.id}
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full bg-ink py-2 pl-4 pr-2 text-sm text-white shadow-2xl on-dark"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0 text-r-green" aria-hidden="true" />
            <span className="line-clamp-1">{toast.text}</span>
            <button
              type="button"
              onClick={() => {
                useUI.setState({ toast: null });
                setCartOpen(true);
              }}
              className="min-h-9 shrink-0 rounded-full bg-white/10 px-3 font-semibold hover:bg-white/20"
            >
              Kosár
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
