"use client";

import { useFormState } from "react-dom";
import { signInAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/forms/password-field";

const initialState = { error: "" };

export function LoginForm() {
  const [state, formAction] = useFormState(signInAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-iris-200/60">
          メールアドレス
        </label>
        <Input name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
      </div>
      <PasswordField />
      {state?.error && (
        <p className="text-sm text-red-300/80">{state.error}</p>
      )}
      <Button type="submit" className="w-full">
        サインイン
      </Button>
    </form>
  );
}
