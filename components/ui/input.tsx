import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "h-11 w-full rounded-2xl border border-purple-300/25 bg-base-soft/60 px-4 text-sm text-iris-100 shadow-inner shadow-black/40 transition focus:border-purple-100/70 focus:outline-none focus:ring-2 focus:ring-purple-300/35",
          "placeholder:text-iris-200/55",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
