import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full rounded-3xl border border-purple-300/25 bg-base-soft/60 px-5 py-4 text-sm text-iris-100 shadow-inner shadow-black/40 transition focus:border-purple-100/70 focus:outline-none focus:ring-2 focus:ring-purple-300/35",
          "placeholder:text-iris-200/55",
          "resize-none leading-relaxed",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
