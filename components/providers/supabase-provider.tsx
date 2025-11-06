"use client";

import { createContext, useContext, useMemo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

type SupabaseContextValue = SupabaseClient;

const SupabaseContext = createContext<SupabaseContextValue | null>(null);

export function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createClientComponentClient(), []);

  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const supabase = useContext(SupabaseContext);
  if (!supabase) {
    throw new Error("SupabaseProvider がラップされていません。");
  }

  return supabase;
}
