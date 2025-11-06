"use client";

import { useFormState } from "react-dom";
import { signUpAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/forms/password-field";

const initialState = { error: "" };

export function SignupForm() {
  const [state, formAction] = useFormState(signUpAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-iris-200/60">
          お名前（任意）
        </label>
        <Input name="name" placeholder="例：山田 花子" autoComplete="name" />
      </div>
      <div className="space-y-2">
        <label className="text-xs uppercase tracking-[0.2em] text-iris-200/60">
          メールアドレス
        </label>
        <Input name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
      </div>
      <PasswordField label="パスワード" />
      {state?.error && (
        <p className="text-sm text-red-300/80">{state.error}</p>
      )}
      <Button type="submit" className="w-full">
        登録する
      </Button>
      <p className="text-xs text-iris-200/60">
        登録後、必要に応じて確認メールをご確認ください。
      </p>
    </form>
  );
}
