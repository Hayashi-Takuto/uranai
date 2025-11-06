import Link from "next/link";
import { Suspense } from "react";
import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-sm text-iris-200/70">読み込み中...</div>}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-iris-50">サインイン</h1>
          <p className="text-sm text-iris-200/70">
            登録済みのメールアドレスとパスワードを入力してください。
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-xs text-iris-200/70">
          アカウントをお持ちでない場合は
          <Link href="/signup" className="ml-1 text-gold-400 underline-offset-4 hover:underline">
            新規登録
          </Link>
          へ。
        </p>
      </div>
    </Suspense>
  );
}
