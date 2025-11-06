import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { openai } from "@/lib/openai";
import { FORTUNE_TELLERS, getFortunePrompt } from "@/lib/fortune-tellers";

export async function POST(req: Request) {
  try {
    const { topic, tellerId, clientName } = await req.json();

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "相談内容が正しく送信されていません。" },
        { status: 400 }
      );
    }

    const persona = FORTUNE_TELLERS.find((t) => t.id === tellerId);
    if (!persona) {
      return NextResponse.json(
        { error: "占い師の指定が無効です。" },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "認証が必要です。" }, { status: 401 });
    }

    const prompt = getFortunePrompt({
      tellerId: persona.id,
      question: topic,
      clientName,
    });

    const completion = await openai.responses.create({
      model: "gpt-4o-mini",
      input: prompt,
      temperature: 0.8,
    });

    const result = completion.output_text?.trim();

    if (!result) {
      throw new Error("占い結果の生成に失敗しました。" );
    }

    const { data, error } = await supabase
      .from("readings")
      .insert({
        user_id: user.id,
        teller_id: persona.id,
        question: topic,
        result,
      })
      .select("id, created_at")
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      result,
      reading_id: data.id,
      created_at: data.created_at,
    });
  } catch (error) {
    console.error("/api/readings error", error);
    const message =
      error instanceof Error ? error.message : "予期せぬエラーが発生しました。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
