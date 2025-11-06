"use server";

import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabaseServer";

function extractField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

type AuthFormState = { error: string };

export async function signUpAction(
  _prevState: AuthFormState,
  formData: FormData
) {
  const email = extractField(formData, "email").toLowerCase();
  const password = extractField(formData, "password");
  const name = extractField(formData, "name") || null;

  if (!email || !password) {
    return {
      error: "メールアドレスとパスワードを入力してください。",
    } satisfies AuthFormState;
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`,
    },
  });

  if (error) {
    return { error: error.message } satisfies AuthFormState;
  }

  redirect("/");
}

export async function signInAction(
  _prevState: AuthFormState,
  formData: FormData
) {
  const email = extractField(formData, "email").toLowerCase();
  const password = extractField(formData, "password");

  if (!email || !password) {
    return {
      error: "メールアドレスとパスワードを入力してください。",
    } satisfies AuthFormState;
  }

  const supabase = await getSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message } satisfies AuthFormState;
  }

  redirect("/");
}
