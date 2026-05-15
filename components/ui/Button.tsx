import { forwardRef } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "white";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "md" | "lg";
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#13AEEB]";

const sizes: Record<"md" | "lg", string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "btn-shine bg-[#13AEEB] text-white shadow-[0_4px_14px_rgba(19,174,235,0.3),0_1px_2px_rgba(19,174,235,0.2)] hover:bg-[#0E8FBF] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(19,174,235,0.45),0_2px_6px_rgba(19,174,235,0.25)] active:translate-y-0",
  secondary:
    "bg-white text-[#13AEEB] border border-[#13AEEB]/30 hover:border-[#13AEEB] hover:bg-[#13AEEB]/5 hover:shadow-[0_4px_16px_rgba(19,174,235,0.12)]",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  white:
    "btn-shine bg-white text-[#0B1F3A] shadow-[0_4px_14px_rgba(255,255,255,0.12)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,255,255,0.2)]",
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
