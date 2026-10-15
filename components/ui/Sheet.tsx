"use client";

import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/format";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])';

/** Locks scroll, traps focus and restores it on close. Shared by drawers and modals. */
export function useDialogBehavior(open: boolean, onClose: () => void, panel: React.RefObject<HTMLElement | null>) {
  const closeRef = useRef(onClose);
  useEffect(() => {
    closeRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    const id = window.setTimeout(() => {
      const first = panel.current?.querySelector<HTMLElement>("[data-autofocus]") ?? panel.current?.querySelector<HTMLElement>(FOCUSABLE);
      first?.focus();
    }, 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      }
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(id);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      previous?.focus?.();
    };
  }, [open, panel]);
}

export function Sheet({
  open,
  onClose,
  side = "right",
  title,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  title: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  useDialogBehavior(open, onClose, panel);
  const offset = side === "right" ? "100%" : "-100%";

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60]">
          <m.div
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <m.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label={typeof title === "string" ? title : undefined}
            initial={{ x: offset }}
            animate={{ x: 0 }}
            exit={{ x: offset }}
            transition={{ type: "spring", damping: 34, stiffness: 320 }}
            className={cn(
              "absolute inset-y-0 flex w-full max-w-md flex-col bg-paper shadow-2xl",
              side === "right" ? "right-0" : "left-0",
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="font-display text-xl font-bold">{title}</div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink/5"
                aria-label="Bezárás"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {footer && <div className="border-t border-line bg-white px-5 py-4">{footer}</div>}
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
