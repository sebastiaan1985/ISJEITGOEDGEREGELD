import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0078D4]";

const sizes: Record<"md" | "lg", string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[#0078D4] text-white shadow-[0_4px_14px_rgba(0,120,212,0.25)] hover:bg-[#005A9E] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,120,212,0.35)] active:translate-y-0",
  secondary:
    "bg-white text-[#0078D4] border border-[#0078D4]/30 hover:border-[#0078D4] hover:bg-[#0078D4]/5",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  white:
    "bg-white text-[#0B1F3A] hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]",
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = "primary", size = "md", className = "", children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
});
