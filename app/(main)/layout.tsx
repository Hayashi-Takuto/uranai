import { getSupabaseServer } from "@/lib/supabaseServer";
import { MainNav } from "@/components/navigation/main-nav";
import { signOutAction } from "./actions";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await getSupabaseServer();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase
      .from("users")
      .upsert(
        {
          id: session.user.id,
          display_name: (session.user.user_metadata?.display_name as string | undefined) ?? null,
          avatar_url: (session.user.user_metadata?.avatar_url as string | undefined) ?? null,
        },
        { onConflict: "id" }
      );
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-8 px-6 py-10">
      <MainNav
        onSignOut={session ? signOutAction : undefined}
        userEmail={session?.user.email}
      />
      <main className="main-container flex-1 rounded-3xl border border-purple-200/10 p-10 shadow-xl shadow-black/40">
        {children}
      </main>
    </div>
  );
}
