import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { isPending, type Pending } from "@/lib/content/types";

/* ---------------------------------------------------------------------------
   The document shell. Section separation is done with hairline rules and
   measure, never with alternating tinted bands.
   ------------------------------------------------------------------------ */

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`mx-auto w-full px-[var(--gutter)] ${className}`}
      style={{ maxWidth: "var(--shell)" }}
    >
      {children}
    </div>
  );
}

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`[&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-line-strong hover:[&_a]:decoration-accent [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5 ${className}`}
      style={{ maxWidth: "var(--measure)" }}
    >
      {children}
    </div>
  );
}

/** Section with margin index numbering — the receipt system's spine. */
export function Section({
  index,
  title,
  lede,
  children,
  id,
}: {
  index: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-line py-14 md:py-20">
      <Shell>
        <div className="grid gap-8 md:grid-cols-[8rem_1fr] md:gap-10">
          <div className="idx md:pt-2">{index}</div>
          <div>
            <h2 className="reveal">{title}</h2>
            {lede ? (
              <p className="mt-4 text-muted" style={{ maxWidth: "var(--measure)" }}>
                {lede}
              </p>
            ) : null}
            {children ? <div className="mt-8">{children}</div> : null}
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Actions. The pill CTA against hard-cornered everything-else is deliberate
   contrast — the system underneath (one stroke weight, one accent rule) holds.
   ------------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-[0.95rem] font-medium transition-colors duration-200";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "rounded-full bg-accent text-accent-ink hover:bg-accent-hover",
  secondary: "rounded-[var(--radius)] border border-line-strong text-ink hover:bg-bg-soft",
};

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant }) {
  return <Link className={`${buttonBase} ${buttonVariants[variant]} ${className}`} {...props} />;
}

export function buttonClass(variant: ButtonVariant = "primary") {
  return `${buttonBase} ${buttonVariants[variant]}`;
}

/* ---------------------------------------------------------------------------
   Numerals. Every figure on this site is mono and tabular.
   ------------------------------------------------------------------------ */

export function Num({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`num ${className}`}>{children}</span>;
}

/**
 * A value the organisation has not supplied yet. Renders as a conspicuous,
 * labelled gap — the whole point is that a missing CAC number is visible to the
 * team rather than quietly designed around.
 */
export function PendingValue<T>({
  value,
  render,
}: {
  value: Pending<T>;
  render: (v: T) => ReactNode;
}) {
  if (isPending(value)) {
    return (
      <span
        className="inline-flex items-center gap-1.5 border border-dashed border-line-strong px-1.5 py-0.5 text-[0.8rem] text-muted"
        style={{ borderRadius: "var(--radius)" }}
      >
        <span aria-hidden="true">◇</span>
        <span>Not yet supplied — {value.note}</span>
      </span>
    );
  }
  return <>{render(value)}</>;
}

/* ---------------------------------------------------------------------------
   Four states. Every data surface renders all four; the empty one is designed,
   because at launch every data surface on this site is empty.
   ------------------------------------------------------------------------ */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div
      className="border border-dashed border-line-strong px-6 py-12 text-center"
      style={{ borderRadius: "var(--radius)" }}
    >
      <p className="font-medium">{title}</p>
      <p className="mx-auto mt-2 max-w-prose text-sm text-muted">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
