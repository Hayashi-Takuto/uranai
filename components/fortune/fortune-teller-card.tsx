"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { FortuneTellerCardProps } from "./types";

export function FortuneTellerCard({
  persona,
  active,
  onSelect,
}: FortuneTellerCardProps) {
  return (
    <motion.button
      whileHover={{ scale: active ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(persona.id)}
      className={cn(
        "group flex w-full flex-col gap-4 rounded-3xl border border-purple-200/20 bg-base-soft/70 p-6 text-left transition",
        "hover:border-gold-400/60 hover:shadow-2xl hover:shadow-purple-900/30",
        active &&
          "border-gold-400/80 bg-base-soft/90 shadow-2xl shadow-purple-900/50 ring-2 ring-gold-400/60"
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-iris-200/70">
            {persona.title}
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-iris-50 drop-shadow-md">
            {persona.name}
          </h3>
        </div>
        <div className="gold-glow flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/60 text-xs font-semibold text-gold-400">
          {persona.age}
        </div>
      </div>
      <p className="text-sm text-iris-200/75">{persona.style}</p>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-iris-200/60">
          Specialty
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {persona.specialties.map((item) => (
            <span
              key={item}
              className="rounded-full border border-purple-200/25 bg-base-soft/80 px-3 py-1 text-xs text-iris-100"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs text-iris-200/55 line-clamp-3">{persona.bio}</p>
    </motion.button>
  );
}
