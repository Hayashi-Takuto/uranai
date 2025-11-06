import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const metadata: Metadata = {
  title: "Astra Oracle | サインイン",
};

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <span className="text-sm uppercase tracking-[0.5em] text-gold-400">
              Astra
            </span>
            <span className="text-2xl font-semibold tracking-widest text-iris-100">
              Oracle
            </span>
          </Link>
          <p className="text-xs text-iris-200/70">
            本物の占い師による鑑定へようこそ
          </p>
        </div>
        <div className="glass-panel rounded-3xl border border-purple-200/20 p-8 shadow-lg shadow-black/40">
          {children}
        </div>
      </div>
    </div>
  );
}
