"use client";

import { useMemo } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseBrowser } from "@/lib/supabaseBrowser";

export function useSupabaseClient(): SupabaseClient {
  return useMemo(() => getSupabaseBrowser(), []);
}
