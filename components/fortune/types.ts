import type { FORTUNE_TELLERS } from "@/lib/fortune-tellers";

export type FortuneTeller = (typeof FORTUNE_TELLERS)[number];

export type FortuneTellerCardProps = {
  persona: FortuneTeller;
  active: boolean;
  onSelect: (id: string) => void;
};
