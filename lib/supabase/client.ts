"use client";

import { useMemo } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";

export function useSupabaseClient(): SupabaseClient {
  return useMemo(() => createClientComponentClient(), []);
}
