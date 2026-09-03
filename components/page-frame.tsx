import type { ReactNode } from "react";

export function PageFrame({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return (
    <main className="page-main">
      <section className="page-hero section-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </section>
      {children}
    </main>
  );
}
