"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FortuneTellerCard } from "@/components/fortune/fortune-teller-card";
import { LoadingAurora } from "@/components/fortune/loading-aurora";
import { ReadingResult } from "@/components/fortune/reading-result";
import type { FortuneTeller } from "@/components/fortune/types";
import { useSupabase } from "@/components/providers/supabase-provider";

type ReadingState = {
  teller: FortuneTeller;
  question: string;
  result: string;
  createdAt: string;
};

type FortuneDashboardProps = {
  tellers: FortuneTeller[];
  defaultName?: string | null;
};

export function FortuneDashboard({ tellers, defaultName }: FortuneDashboardProps) {
  const router = useRouter();
  const supabase = useSupabase();
  const [selectedTeller, setSelectedTeller] = useState(
    () => tellers[0]?.id ?? ""
  );
  const [question, setQuestion] = useState("");
  const [clientName, setClientName] = useState(defaultName ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reading, setReading] = useState<ReadingState | null>(null);

  const persona = useMemo(
    () => tellers.find((t) => t.id === selectedTeller) ?? tellers[0],
    [selectedTeller, tellers]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!persona) return;
    if (!question.trim()) {
      setError("相談内容を入力してください。");
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/readings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: question,
          tellerId: persona.id,
          clientName: clientName || null,
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "鑑定に失敗しました。時間をおいて再度お試しください。");
      }

      const payload = await response.json();
      const createdAt = new Date(payload.created_at ?? Date.now()).toLocaleString(
        "ja-JP",
        { hour12: false }
      );

      setReading({
        teller: persona,
        question,
        result: payload.result,
        createdAt,
      });
      setQuestion("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "予期せぬエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="space-y-6">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-iris-200/60">
            Choose Your Guide
          </p>
          <h2 className="text-3xl font-semibold text-iris-50">占い師を選択</h2>
          <p className="text-sm text-iris-200/70">
            あなたの相談内容に合わせて鑑定する占い師をお選びください。
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          {tellers.map((teller) => (
            <FortuneTellerCard
              key={teller.id}
              persona={teller}
              active={teller.id === persona?.id}
              onSelect={setSelectedTeller}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-2">
          <h2 className="text-3xl font-semibold text-gold-400">ご相談内容</h2>
          <p className="text-sm text-iris-200/70">
            具体的に記入すると、占い師がより深く読み解くことができます。
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-iris-200/60">
              お名前（任意）
            </label>
            <Input
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              placeholder="例：優花"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.2em] text-iris-200/60">
              相談内容
            </label>
            <Textarea
              rows={6}
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="例：転職を考えていますが、今がタイミングとして良いか占ってください。"
            />
            <p className="text-xs text-iris-200/50">
              ヒント：恋愛、仕事、人間関係、心のモヤモヤなど。
            </p>
          </div>
          {error && <p className="text-sm text-red-300/80">{error}</p>}
          <Button type="submit" className="w-full" loading={loading}>
            鑑定を依頼する
          </Button>
        </form>

        {loading && <LoadingAurora />}

        {reading && !loading && (
          <div className="space-y-4">
            <ReadingResult
              persona={reading.teller}
              question={reading.question}
              result={reading.result}
              createdAt={reading.createdAt}
            />
            <Button
              type="button"
              variant="ghost"
              className="w-full justify-center"
              onClick={() => router.push("/readings")}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              過去の鑑定履歴を確認する
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
