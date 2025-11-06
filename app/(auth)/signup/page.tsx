import Link from "next/link";
import { Suspense } from "react";
import { SignupForm } from "@/components/forms/signup-form";

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="text-sm text-iris-200/70">読み込み中...</div>}>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-iris-50">新規登録</h1>
          <p className="text-sm text-iris-200/70">
            メールアドレスとパスワードを入力してアカウントを作成しましょう。
          </p>
        </div>
        <SignupForm />
        <p className="text-center text-xs text-iris-200/70">
          すでにアカウントをお持ちですか？
          <Link href="/login" className="ml-1 text-gold-400 underline-offset-4 hover:underline">
            サインイン
          </Link>
          へ。
        </p>
      </div>
    </Suspense>
  );
}
