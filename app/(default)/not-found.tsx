import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found section-shell">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page may have moved or the address may be incomplete.</p>
      <Link className="button button-primary" href="/"><ArrowLeft aria-hidden="true" />Return home</Link>
    </main>
  );
}
