import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FortuneTeller } from "./types";

type ReadingResultProps = {
  persona: FortuneTeller;
  question: string;
  result: string;
  createdAt?: string;
};

export function ReadingResult({ persona, question, result, createdAt }: ReadingResultProps) {
  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center justify-between gap-2 text-xl text-gold-400">
          <span>{persona.name} からの鑑定結果</span>
          {createdAt && (
            <span className="text-sm font-normal text-iris-200/60">
              {createdAt}
            </span>
          )}
        </CardTitle>
        <p className="text-sm text-iris-200/75">相談内容：{question}</p>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap leading-relaxed text-iris-50">
          {result}
        </div>
      </CardContent>
    </Card>
  );
}
