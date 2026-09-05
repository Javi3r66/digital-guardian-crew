import { Link } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { LiabilityDisclaimer } from "@/components/LegalNotices";
import type { ReactNode } from "react";

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
      <Link
        to="/"
        className="text-xs text-muted-foreground hover:text-primary"
      >
        ← Volver al inicio
      </Link>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <ShieldAlert className="size-5" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
      </div>
      <div className="prose-legal mt-8 space-y-4 text-sm leading-relaxed text-foreground/90">
        {children}
      </div>
      <div className="mt-10">
        <LiabilityDisclaimer />
      </div>
    </article>
  );
}
