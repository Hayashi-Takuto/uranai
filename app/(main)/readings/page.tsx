import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { ReadingResult } from "@/components/fortune/reading-result";
import { FORTUNE_TELLERS } from "@/lib/fortune-tellers";

type ReadingRow = {
  id: string;
  teller_id: string | null;
  question: string;
  result: string;
  created_at: string;
};

export const dynamic = "force-dynamic";

export default async function ReadingsPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from<ReadingRow>("readings")
    .select("id, teller_id, question, result, created_at")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch readings", error.message);
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <p className="text-sm uppercase tracking-[0.4em] text-gold-400">
          Reading Archive
        </p>
        <h1 className="text-3xl font-semibold text-iris-50">鑑定履歴</h1>
        <p className="text-sm text-iris-200/70">
          過去の鑑定結果を振り返り、気づきを深めてください。
        </p>
      </header>

      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((reading) => {
            const persona =
              FORTUNE_TELLERS.find((t) => t.id === reading.teller_id) ??
              FORTUNE_TELLERS[0];
            const createdAt = new Date(reading.created_at).toLocaleString(
              "ja-JP",
              { hour12: false }
            );

            return (
              <ReadingResult
                key={reading.id}
                persona={persona}
                question={reading.question}
                result={reading.result}
                createdAt={createdAt}
              />
            );
          })
        ) : (
          <div className="rounded-3xl border border-purple-200/10 bg-base-soft/60 p-10 text-center text-sm text-iris-200/70">
            まだ鑑定履歴はありません。トップページから鑑定を依頼してみましょう。
          </div>
        )}
      </div>
    </div>
  );
}
