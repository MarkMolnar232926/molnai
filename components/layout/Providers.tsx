"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { useShop } from "@/lib/store";
import { CartDrawer } from "./CartDrawer";
import { CommandPalette } from "./CommandPalette";
import { CookieBanner } from "./CookieBanner";
import { Toast } from "./Toast";
import { QuickView } from "@/components/shop/QuickView";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useShop.persist.rehydrate();
  }, []);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <CartDrawer />
        <CommandPalette />
        <QuickView />
        <Toast />
        <CookieBanner />
      </MotionConfig>
    </LazyMotion>
  );
}
