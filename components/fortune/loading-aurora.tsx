"use client";

import { motion } from "framer-motion";

interface LoadingAuroraProps {
  message?: string;
}

export function LoadingAurora({ message = "鑑定を行っています..." }: LoadingAuroraProps) {
  return (
    <div className="relative flex w-full flex-col items-center gap-6 rounded-3xl border border-purple-200/10 bg-base-soft/80 px-10 py-12 text-center">
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <motion.div
          className="absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-purple-500/40 blur-3xl"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-32 left-1/3 h-56 w-56 rounded-full bg-gold-400/30 blur-3xl"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
        />
      </div>
      <div className="relative z-10 space-y-6">
        <motion.div
          className="mx-auto flex h-16 w-16 items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
        >
          <div className="h-16 w-16 rounded-full border-2 border-dashed border-gold-400/70" />
        </motion.div>
        <div className="relative z-10 space-y-2">
          <p className="text-lg font-semibold text-gold-400">星々が語りかけています</p>
          <p className="text-sm text-iris-100/80">{message}</p>
        </div>
      </div>
    </div>
  );
}
