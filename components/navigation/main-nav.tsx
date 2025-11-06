"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MainNavProps = {
  onSignOut?: () => Promise<void>;
  userEmail?: string | null;
};

const links = [
  { href: "/", label: "鑑定" },
  { href: "/readings", label: "履歴" },
];

export function MainNav({ onSignOut, userEmail }: MainNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <header className="flex items-center justify-between rounded-3xl border border-purple-200/20 bg-base-soft/70 px-6 py-4 shadow-lg shadow-black/40">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-[0.4em] text-gold-400">
            ASTRA
          </span>
          <span className="text-sm uppercase tracking-[0.2em] text-iris-200/80">
            Oracle
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1 text-sm transition",
                  active
                    ? "bg-gold-400/20 text-gold-400"
                    : "text-iris-200/70 hover:text-iris-50"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {onSignOut ? (
          <>
            {userEmail && (
              <span className="text-xs text-iris-200/70">{userEmail}</span>
            )}
            <Button
              variant="secondary"
              loading={pending}
              onClick={() => startTransition(() => onSignOut())}
            >
              サインアウト
            </Button>
          </>
        ) : (
          <Button
            variant="secondary"
            onClick={() => router.push("/login")}
          >
            サインイン
          </Button>
        )}
      </div>
    </header>
  );
}
