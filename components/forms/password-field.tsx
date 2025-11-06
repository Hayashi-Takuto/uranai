"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export function PasswordField({ label = "パスワード" }: { label?: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-[0.2em] text-iris-200/60">
        {label}
      </label>
      <div className="relative">
        <Input
          name="password"
          type={visible ? "text" : "password"}
          required
          minLength={6}
          placeholder="••••••••"
          autoComplete="current-password"
          className="pr-12"
        />
        <button
          type="button"
          onClick={() => setVisible((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-iris-200/70 transition hover:text-iris-50"
          aria-label={visible ? "パスワードを隠す" : "パスワードを表示"}
        >
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
