"use client";

import { createContext, useContext, useMemo } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

const SupabaseContext = createContext<SupabaseClient | null>(null);

type Props = {
  children: React.ReactNode;
};

export function SupabaseProvider({ children }: Props) {
  const client = useMemo(() => createBrowserSupabaseClient(), []);

  return (
    <SupabaseContext.Provider value={client}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const client = useContext(SupabaseContext);

  if (!client) {
    throw new Error("SupabaseProvider 범위 안에서만 Supabase를 사용할 수 있습니다.");
  }

  return client;
}
