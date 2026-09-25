import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Clock, Bot } from "lucide-react";
import { EMERGENCY_RESOURCES } from "@/lib/agents";
import { DeviceToolkit } from "@/components/DeviceToolkit";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contactar con Red Violeta Ciberprevención" },
      {
        name: "description",
        content:
          "Escríbenos y te responderemos en cuanto podamos. Consulta también los teléfonos oficiales de emergencia y los agentes de IA disponibles 24/7.",
      },
      { property: "og:title", content: "Contactar con Red Violeta Ciberprevención" },
      {
        property: "og:description",
        content: "Agentes de inteligencia artificial disponibles 24/7. Escríbenos cuando lo necesites.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
      <h1 className="text-3xl font-bold sm:text-4xl tracking-tight text-foreground">Contactar</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Escríbenos por correo y te responderemos en cuanto podamos. Si necesitas orientación ahora
        mismo, los agentes de inteligencia artificial están disponibles a cualquier hora.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a href="mailto:info@redvioletaciberprevencion.es" className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary active:border-primary active:bg-accent/60">
          <Mail className="size-5 text-primary" />
          <p className="mt-3 text-sm font-semibold text-foreground">Correo electrónico</p>
          <p className="mt-1 text-xs text-muted-foreground">info@redvioletaciberprevencion.es</p>
        </a>
        <Link to="/agentes" className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary active:border-primary active:bg-accent/60">
          <Bot className="size-5 text-primary" />
          <p className="mt-3 text-sm font-semibold text-foreground">Agentes 24/7</p>
          <p className="mt-1 text-xs text-muted-foreground">Ciberseguridad, psicología, trabajo social y orientación legal</p>
        </Link>
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="size-3.5" /> Agentes de IA disponibles 24/7 · Correo revisado con regularidad
      </p>

      <div className="mt-10">
        <DeviceToolkit />
      </div>

      <div className="mt-10 rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
        <h2 className="text-sm font-semibold text-foreground">Si hay riesgo inmediato, no esperes</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {EMERGENCY_RESOURCES.map((r) => (
            <span key={r.value} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs text-foreground">
              {r.label} <strong>{r.value}</strong>
            </span>
          ))}
        </div>
      </div>

      <p className="mt-8 text-[11px] leading-relaxed text-muted-foreground">
        Tratamos tus datos conforme al Reglamento (UE) 2016/679 y a la LO 3/2018 (LOPDGDD). No incluyas datos de salud, imágenes íntimas ni datos de terceros en el primer correo: te indicaremos por otro canal seguro cómo aportarlos si fuera necesario.
      </p>
    </div>
  );
}
