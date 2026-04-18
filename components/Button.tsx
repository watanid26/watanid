import Link from "next/link";
import type { ReactNode } from "react";

type Base = {
  children: ReactNode;
  className?: string;
};

/** Primary on dark hero: border white/40, text white → hover white bg + brand text */
const primaryDark =
  "inline-flex items-center justify-center border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 hover:scale-[1.02] hover:bg-white hover:text-[#6B705C] active:scale-[0.99]";

/** Primary on light surfaces: brand fill */
const primaryLight =
  "inline-flex items-center justify-center border border-primary bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:bg-white hover:text-primary";

const secondaryStyles =
  "inline-flex items-center justify-center text-sm font-medium text-black/70 transition-all duration-300 ease-out hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20";

/** Outlined neutral — admin & secondary actions on light UI */
const ghostStyles =
  "inline-flex items-center justify-center rounded-md border border-black/10 bg-transparent px-6 py-3 text-sm font-medium text-black/80 transition-all duration-300 ease-out hover:border-black/15 hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black/20";

export function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
  surface = "dark",
}: Base & {
  href: string;
  variant?: "primary" | "secondary";
  surface?: "dark" | "light";
}) {
  const primaryClass = surface === "dark" ? primaryDark : primaryLight;
  const styles =
    variant === "primary" ? primaryClass : secondaryStyles;

  if (href.startsWith("http")) {
    return (
      <a
        href={href}
        className={`${styles} ${className}`.trim()}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    );
  }

  if (href === "#") {
    return (
      <span
        className={`${styles} cursor-not-allowed opacity-50 ${className}`.trim()}
        aria-disabled
      >
        {children}
      </span>
    );
  }

  return (
    <Link href={href} className={`${styles} ${className}`.trim()}>
      {children}
    </Link>
  );
}

export function Button({
  type = "button",
  children,
  className = "",
  variant = "primary",
  surface = "light",
  ...rest
}: Base &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "ghost";
    surface?: "dark" | "light";
  }) {
  const primaryClass = surface === "dark" ? primaryDark : primaryLight;
  const styles =
    variant === "primary"
      ? primaryClass
      : variant === "ghost"
        ? ghostStyles
        : secondaryStyles;

  return (
    <button
      type={type}
      className={`${styles} disabled:cursor-not-allowed disabled:opacity-50 ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
