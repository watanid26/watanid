import type { ReactNode } from "react";
import { Container } from "@/components/Container";

export function Section({
  id,
  title,
  eyebrow,
  children,
  className = "",
}: {
  id?: string;
  title?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`bg-white py-24 text-black md:py-32 ${className}`.trim()}>
      <Container>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        ) : null}
        {title ? <h2 className="mt-4 ds-section-title">{title}</h2> : null}
        <div className={title || eyebrow ? "mt-10" : ""}>{children}</div>
      </Container>
    </section>
  );
}
