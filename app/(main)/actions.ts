"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";

export async function signOutAction() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  redirect("/login");
}

export async function refreshReadings() {
  revalidatePath("/readings");
}
