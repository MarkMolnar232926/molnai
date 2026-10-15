"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { useChallenge, useShop } from "@/lib/store";
import { CartDrawer } from "./CartDrawer";
import { CommandPalette } from "./CommandPalette";
import { CookieBanner } from "./CookieBanner";
import { Toast } from "./Toast";
import { QuickView } from "@/components/shop/QuickView";

// Animation features load after hydration; overlays only animate on user interaction.
const loadFeatures = () => import("./motion-features").then((m) => m.default);

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useShop.persist.rehydrate();
    void useChallenge.persist.rehydrate();
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
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
