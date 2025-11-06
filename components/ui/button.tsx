import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "link"
  | "outline";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

const baseStyles =
  "relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-purple-500/90 via-purple-400 to-purple-300 text-iris-50 shadow-lg shadow-purple-900/40 hover:from-purple-500 hover:via-purple-400 hover:to-purple-200 focus-visible:outline-purple-300",
  secondary:
    "bg-base-soft/80 text-iris-100 border border-purple-400/30 hover:border-purple-200/60 focus-visible:outline-purple-200",
  ghost:
    "bg-transparent text-iris-100 hover:bg-purple-500/10 focus-visible:outline-purple-200",
  outline:
    "border border-purple-200/40 text-iris-100 hover:bg-purple-500/10 focus-visible:outline-purple-200",
  link: "text-gold-400 underline-offset-4 hover:underline focus-visible:outline-gold-400",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <span className="absolute left-5 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-gold-400/30 border-t-gold-400" aria-hidden />
        )}
        <span className={cn({ "opacity-70": loading })}>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
