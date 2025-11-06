import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { FortuneDashboard } from "@/components/fortune/fortune-dashboard";
import { FORTUNE_TELLERS } from "@/lib/fortune-tellers";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const defaultName =
    (user?.user_metadata?.display_name as string | undefined) ??
    user?.email?.split("@")?.[0];

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.4em] text-gold-400">
          Welcome back
        </p>
        <h1 className="text-4xl font-semibold text-iris-50">
          {defaultName ? `${defaultName} 様の鑑定ルーム` : "鑑定ルーム"}
        </h1>
        <p className="max-w-2xl text-sm text-iris-200/70">
          本日はどのようなことを占いますか？選ばれた占い師が、あなたの物語を丁寧に読み解きます。
        </p>
      </section>
      <FortuneDashboard tellers={FORTUNE_TELLERS} defaultName={defaultName} />
    </div>
  );
}
