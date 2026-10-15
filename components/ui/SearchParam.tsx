"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function Listener({ name, onValue }: { name: string; onValue: (value: string | null) => void }) {
  const value = useSearchParams().get(name);
  useEffect(() => {
    onValue(value);
  }, [value, onValue]);
  return null;
}

/**
 * Reads a query parameter without opting the surrounding page out of static rendering:
 * only this empty node suspends, the content around it is prerendered.
 */
export function SearchParam(props: { name: string; onValue: (value: string | null) => void }) {
  return (
    <Suspense fallback={null}>
      <Listener {...props} />
    </Suspense>
  );
}
